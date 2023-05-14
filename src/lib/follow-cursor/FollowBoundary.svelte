<script lang="ts">
	import { afterUpdate } from 'svelte';
	import { boundary, cursor, viewport } from './cursor-store';

	let boundaryDiv: HTMLDivElement;

	let viewportWidth = 0;
	let viewportHeight = 0;

	afterUpdate(() => {
		$viewport.width = viewportWidth;
		$viewport.height = viewportHeight;

		const boundaryRect = boundaryDiv.getBoundingClientRect();
		$boundary.top = boundaryRect.top;
		$boundary.left = boundaryRect.left;
	});

	function handleMousemove(event: MouseEvent) {
		$cursor = { x: event.clientX, y: event.clientY };
	}
</script>

<svelte:window bind:innerWidth={viewportWidth} bind:innerHeight={viewportHeight} />

<div
	bind:clientWidth={$boundary.width}
	bind:clientHeight={$boundary.height}
	bind:this={boundaryDiv}
	on:mousemove={handleMousemove}
>
	<slot />
</div>
