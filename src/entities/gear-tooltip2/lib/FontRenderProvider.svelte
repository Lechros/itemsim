<script lang="ts">
	import { onMount, setContext, type Snippet } from 'svelte';
	import { FontRender } from './FontRender.svelte';
	import type { FontRenderState } from './FontRenderContext';

	const { children }: { children?: Snippet } = $props();

	const state: FontRenderState = $state({
		itemDetailFontRender: undefined
	});

	setContext('FontRenderProvider', state);

	onMount(() => {
		state.itemDetailFontRender = new FontRender(
			fetch('/fonts/detail.bin').then((res) => res.arrayBuffer())
		);
	});
</script>

{@render children?.()}
