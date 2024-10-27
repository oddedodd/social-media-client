import globals from "globals";
import cypressPlugin from "eslint-plugin-cypress";
import jestPlugin from "eslint-plugin-jest";

export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
      },
    },
    rules: {},
    plugins: {},
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
  },
  {
    files: ["**/*.cy.js"],
    plugins: {
      cypress: cypressPlugin,
    },
    languageOptions: {
      globals: { ...cypressPlugin.configs.recommended.env },
    },
    rules: {
      "cypress/no-unnecessary-waiting": "off",
      "no-unused-vars": "off",
    },
    settings: {},
  },
  {
    files: ["**/*.test.js", "**/*.spec.js"],
    plugins: {
      jest: jestPlugin,
    },
    languageOptions: {
      globals: { ...jestPlugin.configs.recommended.env },
    },
    rules: {
      ...jestPlugin.configs.recommended.rules,
    },
    settings: {},
  },
];
