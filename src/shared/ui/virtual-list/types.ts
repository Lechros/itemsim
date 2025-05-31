import type { Snippet } from 'svelte';

/**
 * Defines the scroll direction and rendering mode for the virtual list.
 *
 * @typedef {'topToBottom' | 'bottomToTop'} SvelteVirtualListMode
 */
export type SvelteVirtualListMode = 'topToBottom' | 'bottomToTop';

/**
 * Configuration properties for the SvelteVirtualList component.
 *
 * @typedef {Object} SvelteVirtualListProps
 * @property {number} [bufferSize] - Number of items to render outside the visible viewport
 *     for smooth scrolling.
 * @property {string} [containerClass] - CSS class to apply to the outer container element.
 * @property {string} [contentClass] - CSS class to apply to the content wrapper element.
 * @property {number} [defaultEstimatedItemHeight] - Initial height estimate for each item in pixels.
 *     Used for optimization before actual measurements are available.
 * @property {boolean} [debug] - When true, enables debug mode with additional logging and information.
 * @property {Function} [debugFunction] - Custom callback to handle debug information.
 *     Receives a {@link SvelteVirtualListDebugInfo} object.
 * @property {Array<T>} items - The complete array of items to be virtualized.
 * @property {string} [itemsClass] - CSS class to apply to individual item containers.
 * @property {SvelteVirtualListMode} [mode='topToBottom'] - Determines the scroll and render direction.
 * @property {Snippet<[item: T, index: number]>} renderItem - Svelte snippet function that defines
 *     how each item should be rendered. Receives the item and its index as arguments.
 * @property {string} [testId] - Base test ID for component elements to facilitate testing.
 * @property {string} [viewportClass] - CSS class to apply to the scrollable viewport element.
 */
export type SvelteVirtualListProps<T> = {
	bufferSize?: number;
	containerClass?: string;
	containerStyle?: string;
	contentClass?: string;
	defaultEstimatedItemHeight?: number;
	debug?: boolean;
	debugFunction?: (_info: SvelteVirtualListDebugInfo) => void;
	items: T[];
	itemsClass?: string;
	mode?: SvelteVirtualListMode;
	renderItem: Snippet<[item: T, index: number]>;
	itemKeyFunction?: (item: T) => unknown;
	testId?: string;
	viewportClass?: string;
};

/**
 * Debug information provided by the virtual list during rendering.
 *
 * @typedef {Object} SvelteVirtualListDebugInfo
 * @property {number} endIndex - Index of the last rendered item in the viewport.
 * @property {number} startIndex - Index of the first rendered item in the viewport.
 * @property {number} totalItems - Total number of items in the list.
 * @property {number} visibleItemsCount - Number of items currently visible in the viewport.
 * @property {number} processedItems - Number of items processed in the viewport.
 */
export type SvelteVirtualListDebugInfo = {
	endIndex: number;
	startIndex: number;
	totalItems: number;
	visibleItemsCount: number;
	processedItems: number;
	averageItemHeight: number;
};
