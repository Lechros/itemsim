<script lang="ts">
	import type { GearRow } from '$lib/shared/lib';
	import { cn } from '$lib/shared/shadcn/utils';
	import type { Snippet } from 'svelte';

	let {
		items,
		columns,
		renderItem,
		class: className,
		style
	}: {
		items: GearRow[];
		columns: number;
		renderItem: Snippet<[item: GearRow, index: number]>;
		class?: string;
		style?: string;
	} = $props();
</script>

<div class={cn('grid', className)} style:grid-template-columns={`repeat(${columns}, 1fr)`} {style}>
	{#each items as item, index}
		{@render renderItem(item, index)}
	{/each}
	{#if items.length < columns}
		{#each Array(columns - items.length) as _}
			<div></div>
		{/each}
	{/if}
</div>
