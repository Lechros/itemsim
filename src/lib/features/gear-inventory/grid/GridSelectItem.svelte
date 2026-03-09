<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';
	import { CheckIcon } from 'lucide-svelte';
	import type { Snippet } from 'svelte';

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

<Button
	variant="ghost"
	size="icon"
	class={cn(
		'relative aspect-square size-full rounded-none border-r',
		selected && 'bg-background hover:bg-background/80'
	)}
	draggable="false"
	{onclick}
	{onmouseenter}
	{onmouseleave}
>
	{@render children()}
	<!-- Overlay -->
	<div
		class={cn(
			'bg-muted absolute inset-0 transition-opacity',
			selected ? 'opacity-0' : 'opacity-20'
		)}
	></div>
	<!-- Check -->
	{#if selected}
		<div
			class="text-primary-foreground bg-primary absolute top-2.5 right-2.5 flex size-6 items-center justify-center rounded-full"
		>
			<CheckIcon />
		</div>
	{/if}
</Button>
