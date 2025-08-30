<script lang="ts">
	import type { Snippet } from 'svelte';
	import { itemClasses } from './item';
	import { cn } from '$lib/utils';
	import { Check, Trash2 } from 'lucide-svelte';
	import { fade } from 'svelte/transition';

	let {
		children,
		selected = $bindable(false),
		onclick,
		onmouseenter,
		onmouseleave
	}: {
		children: Snippet;
		selected?: boolean;
		onclick?: (event: MouseEvent) => void;
		onmouseenter?: (event: MouseEvent) => void;
		onmouseleave?: (event: MouseEvent) => void;
	} = $props();
</script>

<button
	class={cn(
		itemClasses,
		'transition-all duration-100',
		selected && 'ring-destructive/60 bg-destructive/10 hover:bg-destructive/20 ring-2'
	)}
	draggable="false"
	{onclick}
	{onmouseenter}
	{onmouseleave}
>
	{@render children()}
	{#if selected}
		<div
			class="bg-destructive absolute top-2 right-2 flex size-6 items-center justify-center rounded-full text-white"
			transition:fade={{ duration: 100 }}
		>
			<Check class="size-4" />
		</div>
	{/if}
</button>
