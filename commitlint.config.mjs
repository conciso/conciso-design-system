// commitlint-Konfiguration (ADR-0009 Regel 5): Standard-Conventional-Commits, aber
// `subject-case` aus — deutsche Betreffe beginnen üblicherweise mit einem großgeschriebenen
// Nomen („Fokusring nachziehen“), das ist keine Regelverletzung. Der Typ „refine“ aus der
// bisherigen History ist bewusst NICHT im Standard-`type-enum` enthalten (siehe
// @commitlint/config-conventional) — neue veröffentlichungsrelevante Commits müssen einen
// echten Conventional-Commit-Typ tragen, nicht relevante Commits werden ohnehin nicht
// geprüft (scripts/release/check-relevant-commits.mjs).
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'subject-case': [0, 'always'],
  },
};
