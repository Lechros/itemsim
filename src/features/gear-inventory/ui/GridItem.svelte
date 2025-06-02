<script lang="ts">
	import type { Snippet } from 'svelte';
	import { itemClasses } from './item';
	import { fade } from 'svelte/transition';

	let {
		children,
		href,
		onmouseenter,
		onmouseleave
	}: {
		children: Snippet;
		href?: string;
		onmouseenter?: (event: MouseEvent) => void;
		onmouseleave?: (event: MouseEvent) => void;
	} = $props();
</script>

<a {href} class={itemClasses} {onmouseenter} {onmouseleave}>
	{@render children()}
</a>
