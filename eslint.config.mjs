import globals from "globals";
import cypressPlugin from "eslint-plugin-cypress"; // Import Cypress plugin
import jestPlugin from "eslint-plugin-jest"; // Import Jest plugin

export default [
  {
    files: ["**/*.js"], // Apply rules to all JavaScript files
    languageOptions: {
      ecmaVersion: "latest", // Set the ECMAScript version to the latest
      sourceType: "module", // Use ECMAScript modules
      globals: {
        ...globals.browser, // Enable browser global variables
        ...globals.es2021, // Enable ES2021 global variables
        ...globals.node, // Enable Node.js global variables
      },
    },
    rules: {
      // Place any global ESLint rules here
    },
    plugins: {}, // General plugins (leave empty or add others if needed)
    linterOptions: {
      reportUnusedDisableDirectives: true, // Extra option to report unused eslint-disable directives
    },
  },
  {
    // Cypress-specific configuration
    files: ["**/*.cy.js"],
    plugins: {
      cypress: cypressPlugin, // Define Cypress plugin as an object
    },
    languageOptions: {
      globals: { ...cypressPlugin.configs.recommended.env }, // Enable Cypress environment variables
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
      jest: jestPlugin, // Define Jest plugin as an object
    },
    languageOptions: {
      globals: { ...jestPlugin.configs.recommended.env }, // Enable Jest environment variables
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
