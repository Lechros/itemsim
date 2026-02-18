<script lang="ts">
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';

	let {
		children,
		href,
		onmouseenter,
		onmouseleave,
		onclick
	}: {
		children: Snippet;
		href?: string;
		onmouseenter?: (event: MouseEvent) => void;
		onmouseleave?: (event: MouseEvent) => void;
		onclick?: (event: MouseEvent) => void;
	} = $props();

	function handleClick(event: MouseEvent) {
		if (onclick) {
			event.preventDefault(); // href 이동 방지
			onclick(event);
		}
	}
</script>

<Button
	variant="ghost"
	size="icon"
	class="bg-background relative aspect-square size-full rounded-none border-r"
	draggable="false"
	{href}
	onclick={handleClick}
	{onmouseenter}
	{onmouseleave}
>
	{@render children()}
</Button>
