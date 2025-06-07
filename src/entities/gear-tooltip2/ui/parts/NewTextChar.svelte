<script lang="ts">
	import type { FontRender } from '$lib/entities/gear-tooltip2';
	import { getContext } from 'svelte';

	let {
		charCode,
		color
	}: {
		charCode: number;
		color: string;
	} = $props();

	const { fontRender } = getContext<{ fontRender: FontRender | undefined }>('FontRenderProvider');

	let canvas: HTMLCanvasElement;
	let _width = $state(0);
	let _height = $state(0);

	$effect(() => {
		if (fontRender && !fontRender.isLoading) {
			const fontChar = fontRender.getCharacter(charCode);
			if (!fontChar) return;
			const { width, height, bits } = fontChar;

			_width = width;
			_height = height;

			canvas.width = width;
			canvas.height = height;
			const ctx = canvas.getContext('2d')!;
			ctx.fillStyle = color;

			for (let y = 0; y < height; y++) {
				for (let x = 0; x < width; x++) {
					if (bits[y * width + x]) {
						ctx.fillRect(x, y, 1, 1);
					}
				}
			}
		}
	});
</script>

<canvas bind:this={canvas}></canvas>

<style>
	* {
		image-rendering: pixelated;
		padding-top: 1px;
	}
</style>
