<script lang="ts" generics="T">
	import { Separator } from '$lib/shared/shadcn/components/ui/separator';
	import { cn } from '$lib/shared/shadcn/utils';
	import { splitHalf } from '$lib/shared/utils';
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

	const [leftItems, rightItems] = $derived(splitHalf(items));

	const columnClass = $derived(cn('flex flex-col px-4', classes?.column));
</script>

<div
	class={cn(
		'-mx-4 grid auto-rows-min',
		items.length > size && 'sm:grid-cols-[1fr_1px_1fr]',
		className
	)}
>
	<div class={columnClass}>
		{#each leftItems as item}
			{@render itemRenderer(item)}
		{/each}
	</div>
	{#if items.length > size}
		<Separator orientation="vertical" class="hidden sm:block" />
	{/if}
	<div class={columnClass}>
		{#each rightItems as item}
			{@render itemRenderer(item)}
		{/each}
	</div>
</div>
