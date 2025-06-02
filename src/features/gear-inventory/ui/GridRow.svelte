<script lang="ts">
	import type { GearRow } from '$lib/shared/lib';
	import { cn } from '$lib/shared/shadcn/utils';
	import type { Snippet } from 'svelte';

	let {
		items,
		columns,
		renderItemRow,
		rowIndex,
		class: className,
		maxWidth
	}: {
		items: GearRow[];
		columns: number;
		renderItemRow: Snippet<[item: GearRow, index: number]>;
		rowIndex: number;
		class?: string;
		maxWidth?: number;
	} = $props();
</script>

<div
	class={cn('grid-row-class grid', className)}
	style:grid-template-columns={`repeat(${columns}, 1fr)`}
	style:max-width={maxWidth ? `${maxWidth}px` : undefined}
>
	{#each items as item, index}
		{@render renderItemRow(item, rowIndex * columns + index)}
	{/each}
	{#if items.length < columns}
		{#each Array(columns - items.length) as _}
			<div></div>
		{/each}
	{/if}
</div>
