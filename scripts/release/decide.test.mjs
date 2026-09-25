// Tests der Release-Entscheidung (decide.mjs). Die Fälle sind genau die Abbruchstellen
// eines Laufs: zwischen den beiden Publishes, zwischen Publishes und Tag, zwischen Tag
// und GitHub-Release — jeweils auch dann, wenn inzwischen neue Commits gelandet sind.
//
// MCP_BASELINE (ADR-0012) ist auf 2.1.1 fest verdrahtet — höher als jede Versionsnummer, die
// die BESTEHENDEN Tests unten verwenden (sie bilden eine eigene, in sich konsistente
// Zeitlinie ab, die nicht an das MCP-Ticket angelehnt ist). Für sie ist der MCP-Server damit
// nie relevant: In Schritt 1/3 (Tag-/Registry-Nachziehen aus einem ALTEN Commit) liefert
// mcpFehlt() deshalb überall `false` — ergänzt als `publishMcp: false, publishMcpNpm: false`.
// In Schritt 4 (`neu`, IMMER aus dem aktuellen HEAD gebaut) und im Dry-Run gilt dagegen
// unconditional `true` (siehe Kommentar in decide.mjs) — ergänzt als
// `publishMcp: true, publishMcpNpm: true`. Die MCP-spezifischen Tests weiter unten
// verwenden eine eigene, realistische Zeitlinie (`mcpAera`, ab Tag v2.1.1 = MCP_BASELINE).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { decide, versionsliste, MCP_BASELINE } from './decide.mjs';

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
    // true, unabhängig von MCP_BASELINE (siehe Kopfkommentar dieser Datei).
    publishMcp: true,
    publishMcpNpm: true,
    source: 'head',
    notes: 'engine',
  });
});

test('nur ein Paket veröffentlicht → das fehlende nachziehen, aus dem Quellstand des vorhandenen', () => {
  // GitHub Packages ist bei 2.0.1 bereits halb fertig (nur CSS fehlt); npmjs hat für 2.0.1
  // (> NPM_BASELINE) noch gar nichts, zieht also für BEIDE Pakete nach. 2.0.1 liegt unter
  // MCP_BASELINE (2.1.1) — der MCP-Server ist für diese Version nicht relevant.
  assert.deepEqual(decide({ ...sauber, cssVersions: [...sauber.cssVersions, '2.0.1'] }), {
    mode: 'nachziehen',
    version: '2.0.1',
    publishCss: false,
    publishLib: true,
    publishCssNpm: true,
    publishLibNpm: true,
    publishMcp: false,
    publishMcpNpm: false,
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
  // 2.0.1 liegt über NPM_BASELINE, zählt also für den npmjs-Nachzieh-Check mit. 2.0.1 liegt
  // unter MCP_BASELINE (2.1.1) — der MCP-Server ist hier nicht relevant.
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
      publishMcp: false,
      publishMcpNpm: false,
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
  // einen doppelten Publish). 2.1.0 liegt unter MCP_BASELINE (2.1.1) — der MCP-Server ist
  // hier nicht relevant.
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

// ── MCP-Server (ADR-0012): MCP_BASELINE, drittes Paket, zwei Registries ────────────────
// Eigene, realistische Zeitlinie (anders als `sauber`/`npmAera` oben): der letzte Tag ist
// MCP_BASELINE (2.1.1) selbst — der reale Bestand, für den es das MCP-Paket auf KEINER
// Registry gibt. CSS und Lib sind auf beiden Registries vollständig, damit die Tests
// ausschließlich den MCP-Anteil der Entscheidung prüfen.
const mcpAera = {
  ...sauber,
  latestTag: `v${MCP_BASELINE}`,
  cssVersions: [...sauber.cssVersions, '2.1.0', MCP_BASELINE],
  libVersions: [...sauber.libVersions, '2.1.0', MCP_BASELINE],
  cssVersionsNpm: ['2.1.0', MCP_BASELINE],
  libVersionsNpm: ['2.1.0', MCP_BASELINE],
};

test('alter Tag (= MCP_BASELINE) ohne MCP-Paket → kein Nachziehen, blockiert keinen Release', () => {
  // Der reale Bestand: v2.1.1 ist der letzte Tag vor ADR-0012, das MCP-Paket existiert für
  // ihn auf KEINER Registry (mcpVersions/mcpVersionsNpm bleiben implizit leer). Ohne die
  // MCP_BASELINE-Sperre würde decide() versuchen, den MCP-Server aus dem ALTEN Tag-Commit
  // nachzuziehen — der hat kein mcp-server/-Verzeichnis, jeder weitere Release bliebe
  // blockiert (dieselbe Fehlerklasse, die NPM_BASELINE für npmjs verhindert).
  assert.equal(decide(mcpAera).mode, 'nichts');
});

test('neuer Release nach MCP_BASELINE → alle sechs Publishes (CSS, Lib, MCP × 2 Registries)', () => {
  const d = decide({ ...mcpAera, engineVersion: '2.1.2' });
  assert.deepEqual(d, {
    mode: 'neu',
    version: '2.1.2',
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

test('MCP fehlt nur auf npmjs für eine Version über MCP_BASELINE → nur npmjs nachziehen', () => {
  // GitHub Packages hat den MCP-Server für 2.1.2 bereits (Tag-Commit ist annotiert und
  // vollständig bis auf npmjs) — nur der npmjs-Publish wird nachgezogen.
  const d = decide({
    ...mcpAera,
    latestTag: 'v2.1.2',
    cssVersions: [...mcpAera.cssVersions, '2.1.2'],
    libVersions: [...mcpAera.libVersions, '2.1.2'],
    cssVersionsNpm: [...mcpAera.cssVersionsNpm, '2.1.2'],
    libVersionsNpm: [...mcpAera.libVersionsNpm, '2.1.2'],
    mcpVersions: ['2.1.2'],
    mcpVersionsNpm: [],
  });
  assert.deepEqual(d, {
    mode: 'nachziehen',
    version: '2.1.2',
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

test('MCP-Bootstrap-Prerelease auf npmjs wird ignoriert (zählt nicht als vorhanden)', () => {
  // Analog zum npmjs-Bootstrap von CSS/Lib (CONTRIBUTING § 15): "0.0.0-bootstrap.0" matcht
  // VERSION nie und wird ganz vorn rausgefiltert — ohne den Filter würde mcpRelevant() an
  // ihr sogar hart abstürzen (kein X.Y.Z-Match), UND die Bootstrap-Version dürfte nicht als
  // „MCP auf npmjs vorhanden“ durchgehen.
  const d = decide({
    ...mcpAera,
    latestTag: 'v2.1.2',
    cssVersions: [...mcpAera.cssVersions, '2.1.2'],
    libVersions: [...mcpAera.libVersions, '2.1.2'],
    cssVersionsNpm: [...mcpAera.cssVersionsNpm, '2.1.2'],
    libVersionsNpm: [...mcpAera.libVersionsNpm, '2.1.2'],
    mcpVersions: ['2.1.2'],
    mcpVersionsNpm: ['0.0.0-bootstrap.0'],
  });
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
