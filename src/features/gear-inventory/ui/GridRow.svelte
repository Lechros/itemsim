<script lang="ts">
	import type { GearRow } from '$lib/shared/lib';
	import { cn } from '$lib/shared/shadcn/utils';
	import type { Snippet } from 'svelte';
	import GridItemSkeleton from './GridItemSkeleton.svelte';

	let {
		items,
		columns,
		children,
		rowIndex,
		class: className,
		maxWidth
	}: {
		items: GearRow[];
		columns: number;
		children: Snippet<[item: GearRow, index: number]>;
		rowIndex: number;
		class?: string;
		maxWidth?: number;
	} = $props();
</script>

<div
	class={cn('grid', className)}
	style:grid-template-columns={`repeat(${columns}, 1fr)`}
	style:max-width={maxWidth ? `${maxWidth}px` : undefined}
>
	{#each items as item, index}
		{@render children(item, rowIndex * columns + index)}
	{/each}
	{#if items.length < columns}
		{#each Array(columns - items.length) as _}
			<GridItemSkeleton />
		{/each}
	{/if}
</div>
