<script lang="ts">
	import type { Snippet } from 'svelte';
	import { itemClasses } from './item';

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

<a {href} class={itemClasses} {onmouseenter} {onmouseleave} onclick={handleClick}>
	{@render children()}
</a>
