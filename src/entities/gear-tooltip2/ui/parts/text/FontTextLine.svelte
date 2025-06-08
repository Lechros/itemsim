<script lang="ts">
	import type { FontRender } from '$lib/entities/gear-tooltip2';
	import { getContext } from 'svelte';

	let {
		value: value,
		colorCode
	}: {
		value: string;
		colorCode: string;
	} = $props();

	const { fontRender } = getContext<{ fontRender: FontRender | undefined }>('FontRenderProvider');

	let canvas: HTMLCanvasElement | null = $state(null);

	$effect(() => {
		if (fontRender && !fontRender.isLoading && canvas) {
			const fontChars = value
				.split('')
				.map((char) => fontRender.getCharacter(char.charCodeAt(0)))
				.filter((char) => char !== undefined);
			canvas!.width = fontChars.reduce((acc, char) => acc + char.width, 0);
			canvas!.height = Math.max(...fontChars.map((char) => char.height));

			const ctx = canvas!.getContext('2d')!;
			ctx.fillStyle = colorCode;

			let startX = 0;

			for (const fontChar of fontChars) {
				const { width, height, bits } = fontChar;
				for (let y = 0; y < height; y++) {
					for (let x = 0; x < width; x++) {
						if (bits[y * width + x]) {
							ctx.fillRect(startX + x, y, 1, 1);
						}
					}
				}
				startX += width;
			}
		}
	});
</script>

<canvas bind:this={canvas}>{value}</canvas>

<style>
	canvas {
		image-rendering: pixelated;
		padding-top: 1px;
	}
</style>
