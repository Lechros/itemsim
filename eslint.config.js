import { includeIgnoreFile } from '@eslint/compat';
import tsParser from '@typescript-eslint/parser';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'eslint/config';
import { loadConfig } from '@sveltejs/load-config';
const loadedConfig = await loadConfig('./', { traverse: false });
if (loadedConfig && 'error' in loadedConfig) throw loadedConfig.error;
const svelteConfig = loadedConfig?.config;
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
	}
});
