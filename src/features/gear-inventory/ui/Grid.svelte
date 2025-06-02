<script lang="ts">
	import type { GearRow } from '$lib/shared/lib';
	import { VirtualList } from '$lib/shared/ui/virtual-list';
	import { chunk } from '$lib/shared/utils';
	import type { Snippet } from 'svelte';
	import GridRow from './GridRow.svelte';

	let {
		items,
		renderItem: renderSingleItem,
		columns,
		maxColumns,
		renderFixedHeader,
		class: className
	}: {
		items: GearRow[];
		renderItem: Snippet<[item: GearRow, index: number]>;
		columns?: number;
		maxColumns?: number;
		renderFixedHeader?: Snippet;
		class?: string;
	} = $props();

	const ITEM_WIDTH = 128;
	const MIN_COLUMN_COUNT = 2;
	const GAP = 16;

	let viewportRef: HTMLElement | null = $state(null);
	let width = $state<number | null>(null);
	const columnCount = $derived(getColumnCount(width, columns, maxColumns));
	const rows = $derived(chunk(items, columnCount));

	$inspect(columnCount);

	$effect(() => {
		if (viewportRef) {
			const resizeObserver = new ResizeObserver(() => {
				width = viewportRef!.clientWidth;
			});
			resizeObserver.observe(viewportRef);
			return () => resizeObserver.disconnect();
		}
	});

	function getColumnCount(width: number | null, columns?: number, maxColumns?: number) {
		const baseCount = getBaseColumnCount(width, columns);
		if (maxColumns) return Math.min(maxColumns, baseCount);
		return baseCount;
	}

	function getBaseColumnCount(width: number | null, columns?: number) {
		if (columns) return columns;
		if (!width) return MIN_COLUMN_COUNT;
		const count = Math.floor((width + GAP) / (ITEM_WIDTH + GAP));
		return Math.max(MIN_COLUMN_COUNT, count);
	}

	function getMaxWidth(columnCount: number) {
		return columnCount * ITEM_WIDTH + (columnCount - 1) * GAP;
	}
</script>

<VirtualList
	items={rows}
	itemKeyFunction={(row) => row[0].seq}
	bufferSize={2}
	defaultEstimatedItemHeight={144}
	{renderFixedHeader}
	containerClass={className}
	viewportClass="mx-2 min-[450px]:mx-4 pt-4"
	itemsClass="flex flex-col items-center"
	bind:viewportRef
>
	{#snippet renderItem(row)}
		<GridRow
			items={row}
			columns={columnCount}
			class="w-full gap-2 self-center pb-2 min-[450px]:gap-4 min-[450px]:pb-4"
			style="max-width: {getMaxWidth(columnCount)}px"
		>
			{#snippet renderItem(item, index)}
				{@render renderSingleItem(item, index)}
			{/snippet}
		</GridRow>
	{/snippet}
</VirtualList>
