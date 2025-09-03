<script lang="ts">
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

<a
	class="bg-card focus-visible:border-ring focus-visible:ring-ring/50 hover:bg-accent relative flex aspect-square items-center justify-center gap-6 rounded-lg border py-6 shadow-sm transition-all hover:shadow-md"
	{href}
	onclick={handleClick}
	{onmouseenter}
	{onmouseleave}
>
	{@render children()}
</a>
