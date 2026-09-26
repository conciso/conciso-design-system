// Minimaler Lint für mcp-server (Review-Fix Ticket 15, CONTRIBUTING § „Lint“): reines
// ESM/Node, kein Angular, kein TypeScript — anders als angular-lib/storybook-angular
// (angular-eslint + typescript-eslint über `ng lint`) reicht hier @eslint/js „recommended“
// plus die Node-Globals aus dem `globals`-Paket. Root-`npm run lint` ruft dieses Workspace-
// Skript über `lint:mcp-server` mit auf (siehe package.json).
import js from '@eslint/js';
import globals from 'globals';

export default [
  {
    // snapshot/ ist gitignored und entsteht erst beim Pack (kein Quellcode); test-support/ und
    // eval/ sind zwar Quellcode, aber node_modules bleibt trotzdem die einzige echte Ausnahme —
    // die beiden anderen sollen genauso gelintet werden wie src/bin/scripts/test.
    ignores: ['snapshot/**', 'node_modules/**'],
  },
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: 'module',
      globals: { ...globals.node },
    },
    rules: {
      // Ein deklarierter, aber ungenutzter Parameter ist bei den vielen kleinen
      // Callback-Signaturen hier (JSON-RPC-Handler, Test-Helfer) üblich und beabsichtigt;
      // ungenutzte lokale Variablen dagegen weiterhin melden (Default von recommended).
      'no-unused-vars': ['error', { args: 'none' }],
    },
  },
];
