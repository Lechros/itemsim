import { getContext } from 'svelte';
import type { FontRender } from './FontRender.svelte.js';

export type FontRenderState = {
	itemDetailFontRender: FontRender | undefined;
};

export function useFontRenderContext(): FontRenderState {
	const { itemDetailFontRender } = getContext<FontRenderState>('FontRenderProvider');
	return { itemDetailFontRender };
}
