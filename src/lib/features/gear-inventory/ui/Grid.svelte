<script lang="ts">
	import type { GearRow } from '$lib/shared/lib';
	import { Virtualizer } from '$lib/shared/ui/virtua-custom/svelte';
	import { chunk } from '$lib/utils';
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
	const PADDING = 16;

	let width = $state<number | null>(null);
	const { columnCount, maxWidth } = $derived(getGridProps(width, maxColumns));
	const rows = $derived(chunk(items, columnCount));

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

	function getGridProps(
		width: number | null,
		maxColumns?: number
	): {
		columnCount: number;
		maxWidth: number | undefined;
	} {
		if (!width || width < 380) {
			return { columnCount: 2, maxWidth: undefined };
		} else if (width < 450) {
			return { columnCount: 3, maxWidth: undefined };
		} else {
			const columnCount = getColumnCount(width, maxColumns);
			const maxWidth = getMaxWidth(columnCount);
			return { columnCount, maxWidth };
		}
	}

	function getColumnCount(width: number, maxColumns?: number) {
		const workableWidth = width - PADDING * 2;
		const count = Math.floor((workableWidth + GAP) / (ITEM_WIDTH + GAP));
		if (maxColumns) return Math.min(maxColumns, count);
		return count;
	}

	function getMaxWidth(columnCount: number) {
		return columnCount * ITEM_WIDTH + (columnCount - 1) * GAP + PADDING * 2;
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
