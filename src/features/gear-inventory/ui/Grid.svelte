<script lang="ts">
	import type { GearRow } from '$lib/shared/lib';
	import { Virtualizer } from '$lib/shared/ui/virtua-custom/svelte';
	import { chunk } from '$lib/shared/utils';
	import type { Snippet } from 'svelte';
	import GridRow from './GridRow.svelte';
	let {
		items,
		children: itemChildren,
		maxColumns,
		startMargin = 0,
		scrollRef
	}: {
		items: GearRow[];
		children: Snippet<[item: GearRow, index: number]>;
		maxColumns?: number;
		startMargin?: number;
		scrollRef: HTMLElement | null;
	} = $props();

	const ITEM_WIDTH = 128;
	const MIN_COLUMN_COUNT = 2;
	const GAP = 16;

	let width = $state<number | null>(null);
	const columnCount = $derived(getColumnCount(width, maxColumns));
	const rows = $derived(chunk(items, columnCount));
	const maxWidth = $derived(getMaxWidth(columnCount));

	$effect(() => {
		const observer = new ResizeObserver((entries) => {
			const entry = entries.find((e) => e.target === scrollRef);
			if (entry) {
				width = entry.contentBoxSize[0].inlineSize;
			}
		});
		if (scrollRef) {
			observer.observe(scrollRef);
		}
	});

	function getColumnCount(width: number | null, maxColumns?: number) {
		const baseCount = getBaseColumnCount(width);
		if (maxColumns) return Math.min(maxColumns, baseCount);
		return baseCount;
	}

	function getBaseColumnCount(width: number | null) {
		if (!width) return MIN_COLUMN_COUNT;
		const count = Math.floor((width - GAP) / (ITEM_WIDTH + GAP));
		return Math.max(MIN_COLUMN_COUNT, count);
	}

	function getMaxWidth(columnCount: number) {
		return columnCount * ITEM_WIDTH + (columnCount + 1) * GAP;
	}
</script>

<Virtualizer
	data={rows}
	getKey={(row) => `${row[0].seq}-${row[row.length - 1].seq}`}
	{startMargin}
	overscan={1}
	scrollRef={scrollRef ?? undefined}
>
	{#snippet children(row, index)}
		<GridRow
			items={row}
			columns={columnCount}
			children={itemChildren}
			rowIndex={index}
			{maxWidth}
			class="mx-auto mb-4 gap-4 px-4"
		/>
	{/snippet}
</Virtualizer>
