const js = require("@eslint/js");
const globals = require("globals");
const { defineConfig } = require("eslint/config");
const eslintConfigPrettier = require("eslint-config-prettier/flat");

module.exports = defineConfig([
   {
      files: ["**/*.{js,mjs,cjs}"],
      plugins: { js },
      languageOptions: {
         globals: {
            ...globals.browser,
            ...globals.node
         }
      },
      extends: ["js/recommended"]
   },
   {
      ignores: ["dist/**", "node_modules/**", "README.md"]
   },
   eslintConfigPrettier
]);
