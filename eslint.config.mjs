import globals from "globals";
// eslint.config.mjs

import cypressPlugin from "eslint-plugin-cypress"; // Import Cypress plugin
import jestPlugin from "eslint-plugin-jest"; // Import Jest plugin

export default [
  {
    files: ["**/*.js"], // Apply rules to all JavaScript files
    languageOptions: {
      ecmaVersion: "latest", // Set the ECMAScript version to the latest
      sourceType: "module", // Use ECMAScript modules
      globals: {
        browser: true, // Enable browser global variables
        es2021: true, // Enable ES2021 global variables
        node: true, // Enable Node.js global variables
      },
    },
    rules: {
      // Place any global ESLint rules here
    },
    plugins: [],
    linterOptions: {
      reportUnusedDisableDirectives: true, // Extra option to report unused eslint-disable directives
    },
  },
  {
    // Cypress-specific configuration
    files: ["**/*.cy.js"],
    plugins: {
      cypress: cypressPlugin,
    },
    languageOptions: {
      globals: cypressPlugin.configs.recommended.env,
    },
    rules: {
      "cypress/no-unnecessary-waiting": "off", // Disable unnecessary waiting rule
      "no-unused-vars": "off", // Disable unused variables rule
    },
    settings: {
      // Place any Cypress-specific settings if needed
    },
  },
  {
    // Jest-specific configuration
    files: ["**/*.test.js", "**/*.spec.js"], // Apply to test files
    plugins: {
      jest: jestPlugin,
    },
    languageOptions: {
      globals: jestPlugin.configs.recommended.env, // Enable Jest environment variables
    },
    rules: {
      // Jest recommended rules
      ...jestPlugin.configs.recommended.rules,
    },
    settings: {
      // Place any Jest-specific settings if needed
    },
  },
];
