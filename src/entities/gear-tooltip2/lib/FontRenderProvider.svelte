<script lang="ts">
	import { setContext, type Snippet } from 'svelte';
	import { onMount } from 'svelte';
	import { FontRender } from './FontRender.svelte';

	const { children }: { children?: Snippet } = $props();

	const state: { fontRender: FontRender | undefined } = $state({
		fontRender: undefined
	});

	setContext('FontRenderProvider', state);

	onMount(() => {
		const fontRender = new FontRender(fetch('/fonts/font.bin').then((res) => res.arrayBuffer()));
		state.fontRender = fontRender;
	});
</script>

{@render children?.()}
