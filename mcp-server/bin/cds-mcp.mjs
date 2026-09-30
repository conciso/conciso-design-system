#!/usr/bin/env node
// Dünner Einstiegspunkt für das `bin` cds-mcp — die eigentliche Server-Logik lebt in
// src/server.mjs, damit sie ohne Kindprozess-Spawn importierbar und testbar bleibt.
import { startServer } from '../src/server.mjs';

startServer().catch((err) => {
  console.error('[cds-mcp] Start fehlgeschlagen:', err);
  process.exitCode = 1;
});
