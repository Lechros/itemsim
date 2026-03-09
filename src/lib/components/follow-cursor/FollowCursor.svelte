<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		children,
		paddingTop = 0,
		paddingRight = 0,
		paddingBottom = 0,
		paddingLeft = 0
	}: {
		children?: Snippet;
		paddingTop?: number;
		paddingRight?: number;
		paddingBottom?: number;
		paddingLeft?: number;
	} = $props();

	let mouseX: number | null = $state(null);
	let mouseY: number | null = $state(null);

	let windowWidth = $state(0);
	let windowHeight = $state(0);
	let width = $state(0);
	let height = $state(0);

	const left: number | null = $derived(
		mouseX !== null && mouseY !== null
			? Math.max(paddingLeft, Math.min(mouseX, windowWidth - width - paddingRight))
			: null
	);
	const top: number | null = $derived(
		mouseX !== null && mouseY !== null
			? Math.max(paddingTop, Math.min(mouseY, windowHeight - height - paddingBottom))
			: null
	);

	function handleMouseMove(event: MouseEvent) {
		mouseX = event.clientX;
		mouseY = event.clientY;
	}
</script>

<svelte:window
	on:mousemove={handleMouseMove}
	bind:innerWidth={windowWidth}
	bind:innerHeight={windowHeight}
/>

<div
	class={['pointer-events-none fixed z-50', left !== null && top !== null ? 'block' : 'hidden']}
	style="left: {left}px; top: {top}px;"
	bind:clientWidth={width}
	bind:clientHeight={height}
>
	{@render children?.()}
</div>
