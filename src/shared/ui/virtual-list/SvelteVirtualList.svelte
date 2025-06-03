<!--
    @component
    A high-performance virtualized list component that efficiently renders large datasets
    by only mounting DOM nodes for visible items and a small buffer. Optimized for handling
    lists of 10k+ items through chunked processing and progressive initialization.

    Props:
    - `items` - Array of items to render
    - `defaultEstimatedItemHeight` - Initial height estimate for items (default: 40px)
    - `mode` - Scroll direction: 'topToBottom' or 'bottomToTop' (default: 'topToBottom')
    - `debug` - Enable debug logging (default: false)
    - `bufferSize` - Number of items to render outside visible area (default: 20)
    - `containerClass` - Custom class for container element
    - `viewportClass` - Custom class for viewport element
    - `contentClass` - Custom class for content wrapper
    - `itemsClass` - Custom class for items wrapper
    - `debugFunction` - Custom debug logging function
    - `testId` - Base test ID for component elements

    Usage:
    ```svelte
    <SvelteVirtualList
        items={data}
        defaultEstimatedItemHeight={40}
        mode="topToBottom"
    >
        {#snippet renderItem(item, index)}
            <div class="item">{item.text}</div>
        {/snippet}
    </SvelteVirtualList>
    ```

    Features:
    - Dynamic height calculation
    - Bidirectional scrolling
    - Configurable buffer size
    - Debug mode
    - Custom styling
    - Progressive initialization for large datasets
    - Memory-optimized for 10k+ items
    - Chunked processing for smooth performance
    - Progress tracking during initialization
-->

<script lang="ts" generics="T">
	/**
	 * SvelteVirtualList Implementation Journey
	 *
	 * Evolution & Architecture:
	 * 1. Initial Implementation ✓
	 *    - Basic virtual scrolling with fixed height items
	 *    - Single direction scrolling (top-to-bottom)
	 *    - Simple viewport calculations
	 *
	 * 2. Dynamic Height Enhancement ✓
	 *    - Added dynamic height calculation system
	 *    - Implemented debounced measurements
	 *    - Created height averaging mechanism for performance
	 *
	 * 3. Bidirectional Scrolling ✓
	 *    - Added bottomToTop mode
	 *    - Solved complex initialization issues with flexbox
	 *    - Implemented careful scroll position management
	 *
	 * 4. Performance Optimizations ✓
	 *    - Added element recycling through keyed each blocks
	 *    - Implemented RAF for smooth animations
	 *    - Optimized DOM updates with transform translations
	 *
	 * 5. Stability Improvements ✓
	 *    - Added ResizeObserver for responsive updates
	 *    - Implemented proper cleanup on component destruction
	 *    - Added debug mode for development assistance
	 *
	 * 6. Large Dataset Optimizations ✓
	 *    - Implemented chunked processing for 10k+ items
	 *    - Added progressive initialization system
	 *    - Deferred height calculations for better initial load
	 *    - Optimized memory usage for large lists
	 *    - Added progress tracking for initialization
	 *
	 * 7. Size Management Improvements ✓
	 *    - Implemented height caching system for measured items
	 *    - Added smart height estimation for unmeasured items
	 *    - Optimized resize handling with debouncing
	 *    - Added height recalculation on content changes
	 *    - Implemented progressive height adjustments
	 *
	 * 8. Code Quality & Maintainability ✓
	 *    - Extracted debug utilities for better testing
	 *    - Improved type safety throughout
	 *    - Added comprehensive documentation
	 *    - Optimized debug output to reduce noise
	 *
	 * 9. Future Improvements (Planned)
	 *    - Add horizontal scrolling support
	 *    - Implement variable-sized item caching
	 *    - Add keyboard navigation support
	 *    - Support for dynamic item updates
	 *    - Add accessibility enhancements
	 *
	 * Technical Challenges Solved:
	 * - Bottom-to-top scrolling in flexbox layouts
	 * - Dynamic height calculations without layout thrashing
	 * - Smooth scrolling on various devices
	 * - Memory management for large lists
	 * - Browser compatibility issues
	 * - Performance optimization for 10k+ items
	 * - Progressive initialization for large datasets
	 * - Debug output optimization
	 * - Accurate size calculations with caching
	 * - Responsive size adjustments
	 *
	 * Current Architecture:
	 * - Four-layer DOM structure for optimal performance
	 * - State management using Svelte 5's $state
	 * - Reactive height and scroll calculations
	 * - Configurable buffer zones for smooth scrolling
	 * - Chunked processing system for large datasets
	 * - Separated debug utilities for better testing
	 * - Height caching and estimation system
	 * - Progressive size adjustment system
	 */

	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import type { SvelteVirtualListProps } from './types';
	import {
		calculateScrollPosition,
		calculateVisibleRange,
		calculateTransformY,
		updateHeightAndScroll as utilsUpdateHeightAndScroll,
		processChunked
	} from './utils/virtualList';
	import { rafSchedule } from './utils/raf';
	import { shouldShowDebugInfo, createDebugInfo } from './utils/virtualListDebug';
	import { calculateAverageHeightDebounced } from './utils/heightCalculation';

	// Manually added
	import { ScrollArea as ScrollAreaPrimitive } from 'bits-ui';
	import { Scrollbar } from '$lib/shared/shadcn/components/ui/scroll-area/index';
	import { cn } from '$lib/shared/shadcn/utils';

	/**
	 * Core configuration props with default values
	 * @type {SvelteVirtualListProps}
	 */
	let {
		items = [], // Array of items to be rendered in the virtual list
		defaultEstimatedItemHeight = 40, // Initial height estimate for items before measurement
		debug = false, // Enable debug logging
		renderItem, // Function to render each item
		renderHeader,
		renderFooter,
		renderFixedHeader,
		renderFixedFooter,
		containerClass, // Custom class for the container element
		viewportClass, // Custom class for the viewport element
		contentClass, // Custom class for the content wrapper
		itemsClass, // Custom class for the items wrapper
		containerStyle,
		viewportStyle,
		containerRef = $bindable(null), // Reference to the main container element
		viewportRef = $bindable(null), // Reference to the scrollable viewport element
		itemsWidth = $bindable(null),
		debugFunction, // Custom debug logging function
		itemKeyFunction, // Custom item key function
		mode = 'topToBottom', // Scroll direction mode
		bufferSize = 20, // Number of items to render outside visible area
		testId // Base test ID for component elements (undefined = no data-testid attributes)
	}: SvelteVirtualListProps<T> = $props();

	/**
	 * DOM References and Core State
	 */
	const itemElements = $state<HTMLElement[]>([]); // Array of rendered item element references

	/**
	 * Scroll and Height Management
	 */
	let scrollTop = $state(0); // Current scroll position
	let height = $state(0); // Container height
	let calculatedItemHeight = $state(defaultEstimatedItemHeight); // Current average item height
	let headerHeight = $state(0); // Header height
	let footerHeight = $state(0); // Footer height
	let fixedHeaderHeight = $state(0); // Fixed header height
	let fixedFooterHeight = $state(0); // Fixed footer height

	/**
	 * State Flags and Control
	 */
	let initialized = $state(false); // Tracks if initial setup is complete
	let isCalculatingHeight = $state(false); // Prevents concurrent height calculations
	let isScrolling = $state(false); // Tracks active scrolling state
	let lastMeasuredIndex = $state(-1); // Index of last measured item

	/**
	 * Timers and Observers
	 */
	let heightUpdateTimeout: ReturnType<typeof setTimeout> | null = null; // Debounce timer for height updates
	let resizeObserver: ResizeObserver | null = null; // Watches for container size changes

	/**
	 * Performance Optimization State
	 */
	let heightCache = $state<Record<number, number>>({}); // Cache of measured item heights
	const chunkSize = $state(50); // Number of items to process in each chunk
	let processedItems = $state(0); // Number of items processed during initialization

	let prevVisibleRange = $state<{ start: number; end: number } | null>(null);
	let prevHeight = $state<number>(0);

	// Trigger height calculation when items are rendered
	$effect(() => {
		if (browser && itemElements.length > 0 && !isCalculatingHeight) {
			heightUpdateTimeout = calculateAverageHeightDebounced(
				isCalculatingHeight,
				heightUpdateTimeout,
				visibleItems,
				itemElements,
				heightCache,
				lastMeasuredIndex,
				calculatedItemHeight,
				(result) => {
					calculatedItemHeight = result.newHeight;
					lastMeasuredIndex = result.newLastMeasuredIndex;
					heightCache = result.updatedHeightCache;
				}
			);
		}
	});

	// Add new effect to handle height changes
	$effect(() => {
		if (browser && initialized && mode === 'bottomToTop' && viewportRef) {
			const totalHeight = Math.max(0, items.length * calculatedItemHeight);
			const targetScrollTop = Math.max(0, totalHeight - height);

			// Only update if the difference is significant
			if (Math.abs(viewportRef.scrollTop - targetScrollTop) > calculatedItemHeight) {
				requestAnimationFrame(() => {
					if (viewportRef) {
						viewportRef.scrollTop = targetScrollTop;
						scrollTop = targetScrollTop;
					}
				});
			}
		}
	});

	// Update container height when element is mounted
	$effect(() => {
		if (browser && containerRef) {
			height = containerRef.getBoundingClientRect().height;
		}
	});

	// Special handling for bottom-to-top mode initialization
	$effect(() => {
		if (
			browser &&
			mode === 'bottomToTop' &&
			viewportRef &&
			height > 0 &&
			items.length &&
			!initialized
		) {
			const totalHeight = Math.max(0, items.length * calculatedItemHeight);
			const targetScrollTop = Math.max(0, totalHeight - height);

			// Add delay to ensure layout is complete
			setTimeout(() => {
				if (viewportRef) {
					// Start at the bottom for bottom-to-top mode
					viewportRef.scrollTop = targetScrollTop;
					scrollTop = targetScrollTop;

					// Double-check the scroll position after a frame
					requestAnimationFrame(() => {
						if (viewportRef && viewportRef.scrollTop !== targetScrollTop) {
							viewportRef.scrollTop = targetScrollTop;
							scrollTop = targetScrollTop;
						}
						initialized = true;
					});
				}
			}, 50);
		}
	});

	/**
	 * Calculates the range of items that should be rendered based on current scroll position.
	 *
	 * This derived calculation determines which items should be visible in the viewport,
	 * including the buffer zone. It takes into account:
	 * - Current scroll position
	 * - Viewport height
	 * - Item height estimates
	 * - Buffer size
	 * - Scroll direction mode
	 *
	 * @example
	 * ```typescript
	 * const range = visibleItems()
	 * console.log(`Rendering items from ${range.start} to ${range.end}`)
	 * ```
	 *
	 * @returns {{ start: number, end: number }} Object containing start and end indices of visible items
	 */
	const visibleItems = $derived(() => {
		if (!items.length) return { start: 0, end: 0 };
		const viewportHeight = height || 0;

		return calculateVisibleRange(
			scrollTop,
			viewportHeight,
			calculatedItemHeight,
			items.length,
			bufferSize,
			mode
		);
	});

	/**
	 * Handles scroll events in the viewport using requestAnimationFrame for performance.
	 *
	 * This function debounces scroll events and updates the scrollTop state only when
	 * necessary to prevent excessive re-renders. It uses RAF scheduling to ensure
	 * smooth scrolling performance.
	 *
	 * Implementation details:
	 * - Uses isScrolling flag to prevent multiple RAF calls
	 * - Updates scrollTop state only when scrolling has settled
	 * - Browser-only functionality
	 *
	 * @example
	 * ```svelte
	 * <div onscroll={handleScroll}>
	 *   <!-- scrollable content -->
	 * </div>
	 * ```
	 *
	 * @returns {void}
	 */
	const handleScroll = () => {
		if (!browser || !viewportRef) return;

		if (!isScrolling) {
			isScrolling = true;
			rafSchedule(() => {
				scrollTop = viewportRef!.scrollTop;
				isScrolling = false;
			});
		}
	};

	/**
	 * Updates the height and scroll position of the virtual list.
	 *
	 * This function handles two scenarios:
	 * 1. Initial setup (critical for bottomToTop mode in flexbox layouts)
	 * 2. Subsequent resize events
	 *
	 * For bottomToTop mode, we need to ensure:
	 * - The flexbox layout is fully calculated
	 * - The height measurements are accurate
	 * - The scroll position starts at the bottom
	 *
	 * @param immediate - Whether to skip the delay (used for resize events)
	 */
	const updateHeightAndScroll = (immediate = false) => {
		if (!initialized && mode === 'bottomToTop') {
			setTimeout(() => {
				if (containerRef) {
					const initialHeight = containerRef.getBoundingClientRect().height;
					height = initialHeight;

					setTimeout(() => {
						if (containerRef && viewportRef) {
							const finalHeight = containerRef.getBoundingClientRect().height;
							height = finalHeight;

							const targetScrollTop = calculateScrollPosition(
								items.length,
								calculatedItemHeight,
								finalHeight
							);

							void containerRef.offsetHeight;

							viewportRef.scrollTop = targetScrollTop;
							scrollTop = targetScrollTop;

							requestAnimationFrame(() => {
								if (viewportRef) {
									const currentScroll = viewportRef.scrollTop;
									if (currentScroll !== scrollTop) {
										viewportRef.scrollTop = targetScrollTop;
										scrollTop = targetScrollTop;
									}
									initialized = true;
								}
							});
						}
					}, 100);
				}
			}, 100);
			return;
		}

		utilsUpdateHeightAndScroll(
			{
				initialized,
				mode,
				containerElement: containerRef,
				viewportElement: viewportRef,
				calculatedItemHeight,
				height,
				scrollTop
			},
			{
				setHeight: (h) => (height = h),
				setScrollTop: (st) => (scrollTop = st),
				setInitialized: (i) => (initialized = i)
			},
			immediate
		);
	};

	/**
	 * Initializes large datasets in chunks to prevent UI blocking.
	 *
	 * This function processes items in smaller chunks using setTimeout to yield
	 * to the main thread, allowing other UI operations to remain responsive.
	 * Progress is tracked and reported through the processedItems state.
	 *
	 * For datasets larger than 1000 items, this method is automatically used
	 * instead of immediate initialization. The chunk size is controlled by the
	 * component's chunkSize state (default: 50).
	 *
	 * @async
	 * @example
	 * ```typescript
	 * // Component initialization
	 * $effect(() => {
	 *     if (BROWSER && items.length > 1000) {
	 *         initializeChunked()
	 *     } else {
	 *         initialized = true
	 *     }
	 * })
	 * ```
	 *
	 * @throws {Error} If processChunked fails to complete initialization
	 * @returns {Promise<void>} Resolves when all chunks have been processed
	 */
	const initializeChunked = async () => {
		if (!items.length) return;

		await processChunked(
			items as T[],
			chunkSize,
			(processed) => (processedItems = processed),
			() => (initialized = true)
		);
	};

	// Modify the mount effect to use chunked initialization
	$effect(() => {
		if (browser && items.length > 1000) {
			initializeChunked();
		} else {
			initialized = true;
		}
	});

	// Setup and cleanup
	onMount(() => {
		if (browser) {
			// Initial setup of heights and scroll position
			updateHeightAndScroll();

			// Watch for container size changes
			resizeObserver = new ResizeObserver(() => {
				updateHeightAndScroll(true);
			});

			if (containerRef) {
				resizeObserver.observe(containerRef);
			}

			// Cleanup on component destruction
			return () => {
				if (resizeObserver) {
					resizeObserver.disconnect();
				}
			};
		}
	});

	// Add the effect in the script section
	$effect(() => {
		if (debug) {
			prevVisibleRange = visibleItems();
			prevHeight = calculatedItemHeight;
		}
	});
</script>

<!--
  The template uses a four-layer structure:
  1. Container - Overall boundary
  2. Viewport - Scrollable area
  3. Content - Full height container
  4. Items - Translated list of visible items
-->
<ScrollAreaPrimitive.Root
	id="virtual-list-container"
	{...testId ? { 'data-testid': `${testId}-container` } : {}}
	class={cn('relative h-full w-full overflow-hidden', containerClass)}
	style={containerStyle}
	bind:ref={containerRef}
	data-slot="scroll-area"
>
	{#if renderFixedHeader}
		<div bind:offsetHeight={fixedHeaderHeight} class="w-full">
			{@render renderFixedHeader()}
		</div>
	{/if}
	<!-- Viewport handles scrolling -->
	<ScrollAreaPrimitive.Viewport
		id="virtual-list-viewport"
		{...testId ? { 'data-testid': `${testId}-viewport` } : {}}
		class={cn('absolute inset-0', viewportClass)}
		style="top: {fixedHeaderHeight}px; bottom: {fixedFooterHeight}px; {viewportStyle ?? ''}"
		bind:ref={viewportRef}
		onscroll={handleScroll}
	>
		{#if renderHeader}
			<div bind:offsetHeight={headerHeight} class="w-full">
				{@render renderHeader()}
			</div>
		{/if}
		<!-- Content provides full scrollable height -->
		<div
			id="virtual-list-content"
			{...testId ? { 'data-testid': `${testId}-content` } : {}}
			class={cn('relative min-h-full w-full', contentClass)}
			style:height="{Math.max(
				height - fixedHeaderHeight - fixedFooterHeight,
				items.length * calculatedItemHeight
			)}px"
		>
			<!-- Items container is translated to show correct items -->
			<div
				id="virtual-list-items"
				{...testId ? { 'data-testid': `${testId}-items` } : {}}
				class={cn('absolute top-0 left-0 w-full', itemsClass)}
				style:transform="translateY({calculateTransformY(
					mode,
					items.length,
					visibleItems().end,
					visibleItems().start,
					calculatedItemHeight
				)}px)"
				bind:clientWidth={itemsWidth}
			>
				{#each mode === 'bottomToTop' ? items
							.slice(visibleItems().start, visibleItems().end)
							.reverse() : items.slice(visibleItems().start, visibleItems().end) as currentItem, i (itemKeyFunction?.(currentItem) ?? i)}
					<!-- Only debug when visible range or average height changes -->
					{#if debug && i === 0 && shouldShowDebugInfo(prevVisibleRange, visibleItems(), prevHeight, calculatedItemHeight)}
						{@const debugInfo = createDebugInfo(
							visibleItems(),
							items.length,
							processedItems,
							calculatedItemHeight
						)}
						{debugFunction
							? debugFunction(debugInfo)
							: console.log('Virtual List Debug:', debugInfo)}
					{/if}
					<!-- Render each visible item -->
					<div bind:this={itemElements[i]} class="flex w-full flex-col">
						{@render renderItem(
							currentItem,
							mode === 'bottomToTop'
								? items.length - (visibleItems().start + i) - 1
								: visibleItems().start + i
						)}
					</div>
				{/each}
			</div>
		</div>
		{#if renderFooter}
			<div bind:offsetHeight={footerHeight} class="w-full">
				{@render renderFooter()}
			</div>
		{/if}
	</ScrollAreaPrimitive.Viewport>
	{#if renderFixedFooter}
		<div bind:offsetHeight={fixedFooterHeight} class="w-full">
			{@render renderFixedFooter()}
		</div>
	{/if}
	<Scrollbar orientation="vertical" />
	<ScrollAreaPrimitive.Corner />
</ScrollAreaPrimitive.Root>

<style>
	/* Container establishes positioning context */
	/* .virtual-list-container {
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;
	} */

	/* Viewport handles scrolling with iOS momentum scroll */
	/* .virtual-list-viewport {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		overflow-y: scroll;
		-webkit-overflow-scrolling: touch;
	} */

	/* Content wrapper maintains full scrollable height */
	/* .virtual-list-content {
		position: relative;
		width: 100%;
		min-height: 100%;
	} */

	/* Items wrapper is translated for virtual scrolling */
	/* .virtual-list-items {
		position: absolute;
		width: 100%;
		left: 0;
		top: 0;
	} */
</style>
