import tseslint from 'typescript-eslint';
import eslintPluginSvelte from 'eslint-plugin-svelte';
import svelteParser from 'svelte-eslint-parser';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';

export default tseslint.config(
  // 1. Ignore build artifacts
  {
    ignores: ['dist/', '.node_modules/', 'eslint.config.js'],
  },

  // 2. TypeScript + base JS rules
  ...tseslint.configs.recommended,

  // 4. Dedicated configuration block for Svelte files
  {
    files: ['**/*.svelte'],
    languageOptions: {
      parser: svelteParser,
      // Pass the TypeScript parser inside Svelte parsing options
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: ['.svelte'],
      },
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      svelte: eslintPluginSvelte,
    },
    // Enforce default svelte recommendations
    rules: {
      ...eslintPluginSvelte.configs.recommended.rules,
    },
  },

  // 5. Turn off conflicting formatting rules (MUST BE LAST)
  eslintConfigPrettier
);
