// Bündelt die vier CSS-Dateien in der verbindlichen Reihenfolge zu dist/conciso-ds.css.
// Dependency-frei. Reihenfolge ist Teil der API — nicht ändern.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const ORDER = ['css/tokens.css', 'css/dark-mode.css', 'css/base.css', 'css/components.css'];

const banner = `/*! Conciso Design System — gebündelt. Quelle: ${ORDER.join(' → ')}. Generiert, nicht manuell editieren. */\n`;
const bundle = banner + ORDER.map((f) => `/* === ${f} === */\n` + readFileSync(join(ROOT, f), 'utf8').trim() + '\n').join('\n');

mkdirSync(join(ROOT, 'dist'), { recursive: true });
writeFileSync(join(ROOT, 'dist/conciso-ds.css'), bundle);

console.log(`dist/conciso-ds.css: ${ORDER.length} Dateien, ${(bundle.length / 1024).toFixed(1)} KB`);
