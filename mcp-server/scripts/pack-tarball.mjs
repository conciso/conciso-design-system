#!/usr/bin/env node
// Packt @conciso/design-system-mcp und gibt NUR den Tarball-Pfad auf stdout aus — für
// Workflow-Schritte, die den Pfad als Output weiterreichen (siehe .github/workflows/publish.yml,
// Schritt „MCP-Server tarballen“, dessen Ausgabe später `npm publish "<tarball>"` braucht).
// storybook-angular.yml braucht den Pfad selbst nicht weiter: dort packt sich
// scripts/smoke-test.mjs bei fehlendem Argument selbst, über dieselbe packTarball()-Funktion.
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { packTarball } from '../test-support/tarball.mjs';

const REPO_ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');

console.log(packTarball(REPO_ROOT));
