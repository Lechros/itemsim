<script lang="ts">
	import { afterUpdate } from 'svelte';
	import { boundary, cursor, viewport } from './cursor-store';

	export let bound: 'boundary' | 'viewport' = 'boundary';

	let wrapper: HTMLDivElement | undefined;

	let wrapperWidth = 0;
	let wrapperHeight = 0;

	$: bounds = bound === 'boundary' ? $boundary : $viewport;

	afterUpdate(() => {
		if (wrapper) {
			wrapperWidth = wrapper.clientWidth;
			wrapperHeight = wrapper.clientHeight;
		}
	});

	$: left = Math.max(bounds.left, Math.min($cursor.x, bounds.left + bounds.width - wrapperWidth));
	$: top = Math.max(bounds.top, Math.min($cursor.y, bounds.top + bounds.height - wrapperHeight));
</script>

<div style="top: {top}px; left: {left}px;" bind:this={wrapper}>
	<slot />
</div>

<style>
	div {
		position: fixed;
		pointer-events: none;
	}

	@media (hover: none) {
		div {
			display: none;
		}
	}
</style>
