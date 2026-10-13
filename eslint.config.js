import { includeIgnoreFile } from '@eslint/compat';
import tsParser from '@typescript-eslint/parser';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'eslint/config';
import svelteConfig from './svelte.config.js';
const gitignorePath = fileURLToPath(new URL('./.gitignore', import.meta.url));

export default defineConfig(includeIgnoreFile(gitignorePath), {
	files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],
	extends: [svelte.configs.recommended, svelte.configs['flat/prettier']],
	languageOptions: {
		globals: {
			...globals.browser,
			...globals.node
		},
		parserOptions: {
			projectService: true,
			extraFileExtensions: ['.svelte'],
			parser: tsParser,
			svelteConfig
		}
	},
	rules: {
		'svelte/no-navigation-without-resolve': 'off'
	}
});
