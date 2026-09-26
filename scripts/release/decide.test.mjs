// Tests der Release-Entscheidung (decide.mjs). Die Fälle sind genau die Abbruchstellen
// eines Laufs: zwischen den beiden Publishes, zwischen Publishes und Tag, zwischen Tag
// und GitHub-Release — jeweils auch dann, wenn inzwischen neue Commits gelandet sind.
//
// MCP-Server (ADR-0012): `tagHasMcp` ist ein FAKT über den Baum des getaggten Commits (siehe
// Kopfkommentar in decide.mjs), keine hartkodierte Versions-Konstante — deshalb setzen die
// BESTEHENDEN Tests unten ihn nicht explizit und bekommen den sicheren Default `false`. In
// Schritt 1/3 (Tag-/Registry-Nachziehen) verhält sich MCP dadurch unterschiedlich: Schritt 1
// ist an `tagHasMcp` gated (bleibt bei den bestehenden Tests also `publishMcp: false`), Schritt
// 3 dagegen NICHT (siehe Kopfkommentar) — dort zieht eine fehlende MCP-Version genau wie
// CSS/Lib nach (`publishMcp: true`), auch in den bestehenden Tests unten, die dafür nicht
// extra angepasst wurden, sondern es genau deshalb korrekt mitausführen. Schritt 4 (`neu`,
// immer aus HEAD) und der Dry-Run sind unconditional `true`. Die MCP-spezifischen Tests weiter
// unten prüfen `tagHasMcp` gezielt.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { decide, versionsliste } from './decide.mjs';

const sauber = {
  latestTag: 'v2.0.0',
  tagHasRelease: true,
  tagIsAnnotated: true,
  cssVersions: ['1.0.0', '2.0.0'],
  libVersions: ['1.0.0', '2.0.0'],
  engineVersion: '',
  dry: false,
};

test('nichts Neues, alles abgeschlossen → kein Release', () => {
  assert.equal(decide(sauber).mode, 'nichts');
});

test('neue Version aus der Engine → beide Pakete aus dem ausgelösten Commit', () => {
  assert.deepEqual(decide({ ...sauber, engineVersion: '2.1.0' }), {
    mode: 'neu',
    version: '2.1.0',
    publishCss: true,
    publishLib: true,
    publishCssNpm: true,
    publishLibNpm: true,
    // Schritt 4 baut immer aus HEAD (enthält seit diesem Ticket mcp-server/) — unconditional
    // true, unabhängig von `tagHasMcp` (siehe Kopfkommentar dieser Datei).
    publishMcp: true,
    publishMcpNpm: true,
    source: 'head',
    notes: 'engine',
  });
});

test('nur ein Paket veröffentlicht → das fehlende nachziehen, aus dem Quellstand des vorhandenen', () => {
  // GitHub Packages ist bei 2.0.1 bereits halb fertig (nur CSS fehlt); npmjs hat für 2.0.1
  // (> NPM_BASELINE) noch gar nichts, zieht also für BEIDE Pakete nach. Der MCP-Server wird in
  // Schritt 3 wie CSS/Lib behandelt, ohne `tagHasMcp`-Gate (siehe Kopfkommentar in decide.mjs)
  // — hier fehlt er auf beiden Registries (mcpVersions/mcpVersionsNpm implizit leer), zieht
  // also ebenfalls nach.
  assert.deepEqual(decide({ ...sauber, cssVersions: [...sauber.cssVersions, '2.0.1'] }), {
    mode: 'nachziehen',
    version: '2.0.1',
    publishCss: false,
    publishLib: true,
    publishCssNpm: true,
    publishLibNpm: true,
    publishMcp: true,
    publishMcpNpm: true,
    source: 'registry',
    notes: 'range',
  });
});

test('halbes Release hat Vorrang vor einer höheren Engine-Version (neuer feat danach)', () => {
  const d = decide({ ...sauber, libVersions: [...sauber.libVersions, '2.0.1'], engineVersion: '2.1.0' });
  assert.equal(d.mode, 'nachziehen');
  assert.equal(d.version, '2.0.1');
  assert.equal(d.publishCss, true);
  assert.equal(d.publishLib, false);
});

test('beide veröffentlicht, Tag fehlt → nur finalisieren, Quellstand aus der Registry', () => {
  // GitHub Packages ist für 2.0.1 vollständig (beide Pakete), npmjs hat davon noch nichts —
  // 2.0.1 liegt über NPM_BASELINE, zählt also für den npmjs-Nachzieh-Check mit. Der MCP-Server
  // fehlt hier auf BEIDEN Registries und zieht ungated nach (Schritt 3, siehe Kopfkommentar).
  assert.deepEqual(
    decide({
      ...sauber,
      cssVersions: [...sauber.cssVersions, '2.0.1'],
      libVersions: [...sauber.libVersions, '2.0.1'],
      engineVersion: '2.0.2',
    }),
    {
      mode: 'nachziehen',
      version: '2.0.1',
      publishCss: false,
      publishLib: false,
      publishCssNpm: true,
      publishLibNpm: true,
      publishMcp: true,
      publishMcpNpm: true,
      source: 'registry',
      notes: 'range',
    },
  );
});

test('Tag da, GitHub-Release fehlt → nachholen, auch wenn die Engine schon Neues meldet', () => {
  assert.deepEqual(decide({ ...sauber, tagHasRelease: false, engineVersion: '2.0.1' }), {
    mode: 'finalisieren',
    version: '2.0.0',
    publishCss: false,
    publishLib: false,
    publishCssNpm: false,
    publishLibNpm: false,
    publishMcp: false,
    publishMcpNpm: false,
    source: 'tag',
    notes: 'tag',
  });
});

test('Tag und Release da, aber ein Paket fehlt in der Tag-Version → nachziehen aus dem Tag', () => {
  assert.deepEqual(decide({ ...sauber, libVersions: ['1.0.0'], engineVersion: '2.0.1' }), {
    mode: 'nachziehen',
    version: '2.0.0',
    publishCss: false,
    publishLib: true,
    publishCssNpm: false,
    publishLibNpm: false,
    publishMcp: false,
    publishMcpNpm: false,
    source: 'tag',
    notes: 'keine',
  });
});

test('fehlendes Paket UND fehlendes Release → nachziehen, Notes aus dem Tag', () => {
  const d = decide({ ...sauber, tagHasRelease: false, cssVersions: ['1.0.0'] });
  assert.equal(d.mode, 'nachziehen');
  assert.equal(d.publishCss, true);
  assert.equal(d.notes, 'tag');
});

test('unfertiger letzter Tag hat Vorrang vor einem halben Stand darüber (ältere Lücke zuerst)', () => {
  // Sonst würde erst 2.0.1 nachgezogen und getaggt — danach wäre v2.0.0 nicht mehr der
  // letzte Tag und bliebe dauerhaft unfertig.
  const ohneRelease = decide({
    ...sauber,
    tagHasRelease: false,
    cssVersions: [...sauber.cssVersions, '2.0.1'],
  });
  assert.equal(ohneRelease.mode, 'finalisieren');
  assert.equal(ohneRelease.version, '2.0.0');

  const ohnePaket = decide({ ...sauber, libVersions: ['1.0.0'], cssVersions: [...sauber.cssVersions, '2.0.1'] });
  assert.equal(ohnePaket.mode, 'nachziehen');
  assert.equal(ohnePaket.version, '2.0.0');
  assert.equal(ohnePaket.source, 'tag');
});

test('Alt-Tag (leichtgewichtig, vor ADR-0010) mit fehlendem Paket → nur Hinweis, kein Blockieren', () => {
  // Aus solchen Checkouts lässt sich nicht bauen (kein stamp-version.mjs); ein Nachzieh-
  // Versuch würde jeden weiteren Release blockieren. Deshalb: sagen, aber weitermachen.
  const d = decide({ ...sauber, tagIsAnnotated: false, libVersions: ['1.0.0'], engineVersion: '2.0.1' });
  assert.equal(d.mode, 'neu');
  assert.match(d.hinweis, /2\.0\.0/);
});

test('leichtgewichtiger Alt-Tag ohne Release → Notes von GitHub als Rückfall', () => {
  const d = decide({ ...sauber, tagHasRelease: false, tagIsAnnotated: false });
  assert.equal(d.mode, 'finalisieren');
  assert.equal(d.notes, 'github');
});

test('Dry-Run spielt alle sechs Publishes durch (GitHub Packages + npmjs, inkl. MCP-Server)', () => {
  const d = decide({ ...sauber, engineVersion: '2.1.0', dry: true });
  assert.equal(d.publishCss, true);
  assert.equal(d.publishLib, true);
  assert.equal(d.publishCssNpm, true);
  assert.equal(d.publishLibNpm, true);
  assert.equal(d.publishMcp, true);
  assert.equal(d.publishMcpNpm, true);
});

// ── npmjs (ADR-0011): Nachziehen und Idempotenz ─────────────────────────────────────
// Ab hier ein getaggter Stand OBERHALB von NPM_BASELINE (2.0.0) — erst ab dort ist npmjs
// für den Vollständigkeits-Check überhaupt relevant (siehe Kopfkommentar in decide.mjs).
const npmAera = { ...sauber, latestTag: 'v2.1.0', cssVersions: [...sauber.cssVersions, '2.1.0'], libVersions: [...sauber.libVersions, '2.1.0'] };

test('npm fehlt nach GitHub-Erfolg → nur npm nachziehen', () => {
  // GitHub Packages hat 2.1.0 für beide Pakete, npmjs für keines — nur die beiden
  // npmjs-Publishes werden nachgezogen, GitHub Packages bleibt unangetastet (kein 409 durch
  // einen doppelten Publish). Dies ist Schritt 1 (Tag-basiert) — `tagHasMcp` ist hier nicht
  // gesetzt (Default `false`), der MCP-Server gilt am Tag deshalb nie als „fehlt“.
  const d = decide({ ...npmAera, cssVersionsNpm: [], libVersionsNpm: [] });
  assert.deepEqual(d, {
    mode: 'nachziehen',
    version: '2.1.0',
    publishCss: false,
    publishLib: false,
    publishCssNpm: true,
    publishLibNpm: true,
    publishMcp: false,
    publishMcpNpm: false,
    source: 'tag',
    notes: 'keine',
  });
});

test('beide Registries vollständig → nichts tun', () => {
  // 2.1.0 liegt in GitHub Packages UND auf npmjs, kein neuer Commit seit dem Tag: kein Release.
  const d = decide({ ...npmAera, cssVersionsNpm: ['2.1.0'], libVersionsNpm: ['2.1.0'] });
  assert.equal(d.mode, 'nichts');
});

test('alte Tags ohne npm → kein Nachziehen (npmjs beginnt erst nach NPM_BASELINE)', () => {
  // Der reale Bestand: @conciso/design-system(-angular) 1.0.0 und 2.0.0 liegen NUR in GitHub
  // Packages, nie auf npmjs — und sollen dort auch nie nachgeholt werden. `sauber` bildet
  // genau diesen Zustand ab (getaggt bei NPM_BASELINE = 2.0.0, cssVersionsNpm/libVersionsNpm
  // implizit leer). Ohne die NPM_BASELINE-Sperre würde das hier fälschlich 'nachziehen' für
  // npm zurückgeben, obwohl beide Pakete auf GitHub Packages längst vollständig sind.
  const d = decide(sauber);
  assert.equal(d.mode, 'nichts');
});

test('Bootstrap-Version auf npmjs, GitHub bei 2.0.0 → nichts tun', () => {
  // Der Erst-Publish (CONTRIBUTING § 15, ADR-0011) veröffentlicht "0.0.0-bootstrap.0" auf
  // npmjs, damit sich dort ein Trusted Publisher einrichten lässt. Diese Prerelease-Version
  // matcht VERSION nie (kein schlichtes X.Y.Z) und wird deshalb in decide() ganz vorn
  // rausgefiltert — sie zählt nirgendwo als „auf npmjs veröffentlicht“, insbesondere nicht
  // als npmjs-Vollständigkeit für den (weiterhin npmjs-irrelevanten) Tag 2.0.0. Ohne den
  // Filter würde npmRelevant() an ihr sogar hart abstürzen (kein X.Y.Z-Match).
  const d = decide({ ...sauber, cssVersionsNpm: ['0.0.0-bootstrap.0'], libVersionsNpm: ['0.0.0-bootstrap.0'] });
  assert.equal(d.mode, 'nichts');
});

test('halbe npm-Lücke hat Vorrang vor einer neuen Engine-Version', () => {
  const d = decide({ ...npmAera, cssVersionsNpm: [], libVersionsNpm: ['2.1.0'], engineVersion: '2.2.0' });
  assert.equal(d.mode, 'nachziehen');
  assert.equal(d.version, '2.1.0');
  assert.equal(d.publishCssNpm, true);
  assert.equal(d.publishLibNpm, false);
});

// ── MCP-Server (ADR-0012): `tagHasMcp`-Fakt statt Versions-Baseline ────────────────────
// Eigene Zeitlinie ab Tag v2.2.0: der reale Fall, der den Konstanten-Ansatz zu Fall brachte
// (siehe Kopfkommentar in decide.mjs) — `main` war bei v2.1.1, PR #47 (`feat`) löste VOR dem
// Merge dieses Tickets einen Release auf v2.2.0 aus. CSS und Lib sind auf beiden Registries
// vollständig, damit die Tests ausschließlich den MCP-Anteil der Entscheidung prüfen.
const ohneMcpAera = {
  ...sauber,
  latestTag: 'v2.2.0',
  cssVersions: [...sauber.cssVersions, '2.1.0', '2.1.1', '2.2.0'],
  libVersions: [...sauber.libVersions, '2.1.0', '2.1.1', '2.2.0'],
  cssVersionsNpm: ['2.1.0', '2.1.1', '2.2.0'],
  libVersionsNpm: ['2.1.0', '2.1.1', '2.2.0'],
};

test('Tag v2.2.0 ohne mcp-server/ (tagHasMcp: false) → kein Nachziehen am Tag, blockiert keinen Release', () => {
  // Der Bug, den die alte MCP_BASELINE-Konstante nicht sehen konnte: 2.2.0 > jede plausible
  // Baseline, aber der TAG-BAUM hat trotzdem kein mcp-server/, weil er vor dem Merge dieses
  // Tickets entstand. `tagHasMcp: false` ist der Fakt, den der Workflow für GENAU diesen Tag
  // ermittelt (per `git cat-file -e "$TAG^{commit}:mcp-server/package.json"`) — ohne ihn (oder
  // mit einer falschen Versions-Konstante) versuchte Schritt 1, MCP aus diesem Tag
  // nachzuziehen, dessen Baum ihn nicht hat, und jeder weitere Release bliebe blockiert.
  assert.equal(decide({ ...ohneMcpAera, tagHasMcp: false }).mode, 'nichts');
});

test('Tag v2.2.0 ohne mcp-server/, aber mit anstehendem Release → neuer Release läuft durch (alle sechs)', () => {
  // Fortsetzung des 2.2.0-Falls: Nach dem Merge dieses Tickets sammelt die Engine die seither
  // (auch vor dem Merge bereits gelandeten, jetzt erst relevant gewordenen) Commits ein und
  // schlägt eine neue Version vor — Schritt 4 baut immer aus HEAD, das mcp-server/ enthält,
  // und braucht deshalb kein `tagHasMcp`-Gate.
  const d = decide({ ...ohneMcpAera, tagHasMcp: false, engineVersion: '2.3.0' });
  assert.deepEqual(d, {
    mode: 'neu',
    version: '2.3.0',
    publishCss: true,
    publishLib: true,
    publishCssNpm: true,
    publishLibNpm: true,
    publishMcp: true,
    publishMcpNpm: true,
    source: 'head',
    notes: 'engine',
  });
});

// Ab hier ein Tag NACH dem Merge, dessen Baum mcp-server/ tatsächlich enthält.
const mitMcpAera = { ...ohneMcpAera, latestTag: 'v2.3.0', tagHasMcp: true, cssVersions: [...ohneMcpAera.cssVersions, '2.3.0'], libVersions: [...ohneMcpAera.libVersions, '2.3.0'], cssVersionsNpm: [...ohneMcpAera.cssVersionsNpm, '2.3.0'], libVersionsNpm: [...ohneMcpAera.libVersionsNpm, '2.3.0'] };

test('Tag mit mcp-server/ (tagHasMcp: true), MCP fehlt auf npmjs → nur npmjs nachziehen', () => {
  // GitHub Packages hat den MCP-Server für 2.3.0 bereits, npmjs noch nicht.
  const d = decide({ ...mitMcpAera, mcpVersions: ['2.3.0'], mcpVersionsNpm: [] });
  assert.deepEqual(d, {
    mode: 'nachziehen',
    version: '2.3.0',
    publishCss: false,
    publishLib: false,
    publishCssNpm: false,
    publishLibNpm: false,
    publishMcp: false,
    publishMcpNpm: true,
    source: 'tag',
    notes: 'keine',
  });
});

test('Tag mit mcp-server/ (tagHasMcp: true), MCP fehlt auf GitHub Packages → dort nachziehen', () => {
  // Umgekehrter Fall: npmjs hat den MCP-Server für 2.3.0 bereits, GitHub Packages noch nicht
  // (z. B. weil der GH-Packages-Schritt an einem transienten Fehler scheiterte).
  const d = decide({ ...mitMcpAera, mcpVersions: [], mcpVersionsNpm: ['2.3.0'] });
  assert.deepEqual(d, {
    mode: 'nachziehen',
    version: '2.3.0',
    publishCss: false,
    publishLib: false,
    publishCssNpm: false,
    publishLibNpm: false,
    publishMcp: true,
    publishMcpNpm: false,
    source: 'tag',
    notes: 'keine',
  });
});

test('`tagHasMcp` fehlt (Default false) → auch bei einem Tag MIT mcp-server/ kein Nachziehen am Tag', () => {
  // Sicherer Rückfall (siehe Kopfkommentar): ein Aufrufer, der den Fakt vergisst oder nicht
  // ermitteln kann, darf NIE versuchen, MCP aus einem Tag zu heilen — auch wenn der Tag in
  // Wirklichkeit mcp-server/ hätte. Bewusst dasselbe Fixture wie im vorigen Test (MCP fehlt
  // wirklich auf npmjs), nur ohne `tagHasMcp` übergeben.
  const { tagHasMcp: _ignoriert, ...ohneFakt } = mitMcpAera;
  const d = decide({ ...ohneFakt, mcpVersions: ['2.3.0'], mcpVersionsNpm: [] });
  assert.equal(d.mode, 'nichts');
});

test('Schritt 3 braucht `tagHasMcp` NICHT: eine Registry-Version über dem Tag heilt MCP ungated', () => {
  // Pinnt die Begründung aus dem Kopfkommentar: ein `veroeffentlicht`-Zwischenstand (Version
  // über dem Tag, noch nicht getaggt) kann nur aus einem Lauf DIESES MCP-fähigen decide.mjs
  // stammen — MCP wird dort deshalb wie CSS/Lib behandelt, UNABHÄNGIG von `tagHasMcp`. Hier
  // explizit mit `tagHasMcp: false` am (niedrigeren) Tag, um zu zeigen, dass das Schritt 3
  // nicht beeinflusst.
  const d = decide({
    ...mitMcpAera,
    tagHasMcp: false,
    cssVersions: [...mitMcpAera.cssVersions, '2.3.1'],
    libVersions: [...mitMcpAera.libVersions, '2.3.1'],
    cssVersionsNpm: [...mitMcpAera.cssVersionsNpm, '2.3.1'],
    libVersionsNpm: [...mitMcpAera.libVersionsNpm, '2.3.1'],
    mcpVersions: [],
    mcpVersionsNpm: [],
  });
  assert.deepEqual(d, {
    mode: 'nachziehen',
    version: '2.3.1',
    publishCss: false,
    publishLib: false,
    publishCssNpm: false,
    publishLibNpm: false,
    publishMcp: true,
    publishMcpNpm: true,
    source: 'registry',
    notes: 'range',
  });
});

test('MCP-Bootstrap-Prerelease auf npmjs wird ignoriert (zählt nicht als vorhanden)', () => {
  // Analog zum npmjs-Bootstrap von CSS/Lib (CONTRIBUTING § 15): "0.0.0-bootstrap.0" matcht
  // VERSION nie und wird ganz vorn rausgefiltert — die Bootstrap-Version darf nicht als „MCP
  // auf npmjs vorhanden“ durchgehen, auch nicht über `.includes()`.
  const d = decide({ ...mitMcpAera, mcpVersions: ['2.3.0'], mcpVersionsNpm: ['0.0.0-bootstrap.0'] });
  assert.equal(d.mode, 'nachziehen');
  assert.equal(d.publishMcp, false);
  assert.equal(d.publishMcpNpm, true);
});

test('vor dem allerersten Tag zählt jede veröffentlichte Version als unfertig', () => {
  const d = decide({ ...sauber, latestTag: '', cssVersions: ['0.1.0'], libVersions: [] });
  assert.equal(d.mode, 'nachziehen');
  assert.equal(d.version, '0.1.0');
});

test('Versionen werden numerisch verglichen, nicht als Text (2.0.10 > 2.0.9)', () => {
  const d = decide({
    ...sauber,
    latestTag: 'v2.0.9',
    cssVersions: ['2.0.9', '2.0.10'],
    libVersions: ['2.0.9', '2.0.10'],
    // npm ist mit dem getaggten Stand (2.0.9) bereits vollständig — sonst würde Schritt 1
    // (ältere Lücke zuerst) zuerst 2.0.9 auf npm nachziehen, statt bis zu Schritt 3 (dem
    // eigentlichen Test-Ziel: numerischer statt textueller Versionsvergleich) zu kommen.
    cssVersionsNpm: ['2.0.9'],
    libVersionsNpm: ['2.0.9'],
  });
  assert.equal(d.mode, 'nachziehen');
  assert.equal(d.version, '2.0.10');
});

test('ungültige Einträge in der Versionsliste werden ignoriert', () => {
  assert.equal(decide({ ...sauber, cssVersions: [...sauber.cssVersions, 'kaputt'] }).mode, 'nichts');
});

test('versionsliste: Array, einzelner String und leere Eingabe', () => {
  assert.deepEqual(versionsliste('["1.0.0","2.0.0"]'), ['1.0.0', '2.0.0']);
  assert.deepEqual(versionsliste('"1.0.0"'), ['1.0.0']);
  assert.deepEqual(versionsliste(''), []);
  assert.deepEqual(versionsliste('[]'), []);
});

test('versionsliste: kaputte Registry-Antwort wirft statt als leer durchzugehen', () => {
  assert.throws(() => versionsliste('["1.0.0","2.0'));
  assert.throws(() => versionsliste('{"error":{"code":"E500"}}'));
});
