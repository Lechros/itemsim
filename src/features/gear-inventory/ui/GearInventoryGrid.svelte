<script lang="ts">
	import { cn } from '$lib/shared/shadcn/utils';
	import type { Snippet } from 'svelte';

	let {
		children,
		columns,
		maxColumns
	}: {
		children: Snippet;
		columns?: number;
		maxColumns?: number;
	} = $props();

	const ITEM_WIDTH = 128;
	const MIN_COLUMN_COUNT = 2;
	const GAP = 16;

	let width = $state<number | null>(null);
	const columnCount = $derived(getColumnCount(width, columns, maxColumns));

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

<div class="flex flex-col items-center" bind:clientWidth={width}>
	<div
		class={cn('grid w-full gap-2 min-[390px]:gap-4')}
		style:grid-template-columns={columnCount ? `repeat(${columnCount}, 1fr)` : undefined}
		style:max-width="{columnCount ? getMaxWidth(columnCount) : undefined}px"
	>
		{@render children()}
	</div>
</div>
