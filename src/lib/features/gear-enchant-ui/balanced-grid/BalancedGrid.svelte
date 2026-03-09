<script lang="ts" generics="T">
	import { cn, splitHalf } from '$lib/utils';
	import type { Snippet } from 'svelte';

	let {
		items,
		size = 0,
		class: className,
		classes,
		itemRenderer
	}: {
		items: T[] | readonly T[];
		size?: number;
		class?: string;
		classes?: {
			column?: string;
		};
		itemRenderer: Snippet<[T]>;
	} = $props();
</script>

<div class={cn('auto-rows-1 grid', items.length > size && 'sm:grid-cols-2', className)}>
	{#each splitHalf(items) as columnItems, index (index)}
		<div class={cn('flex flex-col', classes?.column)}>
			{#each columnItems as item, index (index)}
				{@render itemRenderer(item)}
			{/each}
		</div>
	{/each}
</div>
