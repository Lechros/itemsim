<script lang="ts">
	import type { GearRow } from '$lib/shared/lib';
	import { VirtualList } from '$lib/shared/ui/virtual-list';
	import { chunk } from '$lib/shared/utils';
	import { Loader2 } from 'lucide-svelte';
	import type { Snippet } from 'svelte';
	import GridRow from './GridRow.svelte';

	let {
		items,
		renderItem: renderItemProp,
		columns,
		maxColumns,
		renderFixedHeader: renderFixedHeaderProp,
		loading = false,
		class: className
	}: {
		items: GearRow[];
		renderItem: Snippet<[item: GearRow, index: number]>;
		columns?: number;
		maxColumns?: number;
		renderFixedHeader?: Snippet;
		loading?: boolean;
		class?: string;
	} = $props();

	const ITEM_WIDTH = 128;
	const MIN_COLUMN_COUNT = 2;
	const GAP = 16;

	let viewportRef: HTMLElement | null = $state(null);
	let scrollTop = $state(0);
	let isListening = $state(false);
	let width = $state<number | null>(null);
	const columnCount = $derived(getColumnCount(width, columns, maxColumns));
	const rows = $derived(chunk(items, columnCount));

	$effect(() => {
		if (viewportRef) {
			if (!isListening) {
				viewportRef.addEventListener('scroll', (event) => {
					scrollTop = (event.target as HTMLElement).scrollTop;
				});
				isListening = true;
			}
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
	containerClass={className}
	contentClass="mx-2 min-[450px]:mx-4 w-[calc(100%-16px)] min-[450px]:w-[calc(100%-32px)]"
	itemsClass="flex flex-col items-center"
	bind:viewportRef
	bind:itemsWidth={width}
>
	{#snippet renderFixedHeader()}
		{@render renderFixedHeaderProp?.()}
		<div class="relative h-4">
			{#if scrollTop > 0}
				<div
					class="from-background absolute top-4 z-10 h-4 w-full bg-gradient-to-b to-transparent"
				></div>
			{/if}
		</div>
	{/snippet}
	{#snippet renderItem(row, index)}
		<GridRow
			items={row}
			columns={columnCount}
			rowIndex={index}
			maxWidth={getMaxWidth(columnCount)}
			class="w-full gap-2 self-center pb-2 min-[450px]:gap-4 min-[450px]:pb-4"
		>
			{#snippet renderItemRow(item, index)}
				{@render renderItemProp(item, index)}
			{/snippet}
		</GridRow>
	{/snippet}
</VirtualList>
