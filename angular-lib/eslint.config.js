// @ts-check
const eslint = require("@eslint/js");
const { defineConfig } = require("eslint/config");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");

module.exports = defineConfig([
  {
    ignores: ["dist/**", "out-tsc/**", ".angular/**"],
  },
  {
    files: ["projects/**/*.ts"],
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommended,
      tseslint.configs.stylistic,
      angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "cds",
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        [
          {
            type: "element",
            prefix: "cds",
            style: "kebab-case",
          },
          // Ausnahme vom Element-Standard: eine Wrapper-Komponente, deren CSS-Klasse
          // ein direktes Grid-/Flex-Kind sein MUSS (z. B. .ep-card unter .ep-cards),
          // bekommt einen Attributselektor, damit der Host selbst das echte Element
          // ist, ohne einen umschließenden Custom-Element-Tag dazwischenzuschieben.
          // Siehe docs/adr/0008-selektortyp-der-wrapper-komponenten.md.
          {
            type: "attribute",
            prefix: "cds",
            style: "camelCase",
          },
        ],
      ],
    },
  },
  {
    files: ["projects/**/*.html"],
    extends: [
      angular.configs.templateRecommended,
      angular.configs.templateAccessibility,
    ],
    rules: {},
  }
]);
