<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children }: { children?: Snippet } = $props();

	let mouseX: number | null = $state(null);
	let mouseY: number | null = $state(null);

	let wrapper: HTMLDivElement | null = $state(null);

	let windowWidth = $state(0);
	let windowHeight = $state(0);
	let width = $state(0);
	let height = $state(0);

	let left: number | null = $state(null);
	let top: number | null = $state(null);

	$effect(() => {
		if (wrapper) {
			width = wrapper.clientWidth;
			height = wrapper.clientHeight;
		}
	});

	$effect(() => {
		if (mouseX !== null && mouseY !== null) {
			left = Math.max(0, Math.min(mouseX, windowWidth - width));
			top = Math.max(0, Math.min(mouseY, windowHeight - height));
		}
	});

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

<div class="pointer-events-none fixed" style="left: {left}px; top: {top}px;" bind:this={wrapper}>
	{@render children?.()}
</div>
