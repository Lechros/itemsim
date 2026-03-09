<script lang="ts">
	import type { FontRender } from '$lib/components/gear-tooltip2/font-render/FontRender.svelte.js';

	const {
		items,
		fontRender,
		lineHeight,
		maxWidth
	}: {
		items: {
			char: string;
			color: string;
		}[];
		fontRender?: FontRender;
		lineHeight: number;
		maxWidth?: number;
	} = $props();

	let canvas = $state<HTMLCanvasElement | null>(null);

	$effect(() => {
		if (fontRender && !fontRender.isLoading && canvas) {
			const fcWithColors = items
				.map((item) => {
					if (item.char === '\n') {
						return {
							codePoint: '\n'.charCodeAt(0),
							width: 0,
							height: 0,
							bits: [],
							color: 'white'
						};
					}
					const fontChar = fontRender.getCharacter(item.char.charCodeAt(0));
					if (!fontChar) return null;
					return {
						...fontChar,
						color: item.color
					};
				})
				.filter((fc) => fc !== null);

			const { width: canvasWidth, height: canvasHeight } = getPreSize(fcWithColors, lineHeight);
			canvas.width = canvasWidth;
			canvas.height = canvasHeight;

			const ctx = canvas.getContext('2d')!;

			let x = 0;
			let y = 0;

			for (const { codePoint, width, height, bits, color } of fcWithColors) {
				if (codePoint === '\n'.charCodeAt(0)) {
					x = 0;
					y += lineHeight;
					continue;
				}

				if (maxWidth && x + width > maxWidth) {
					x = 0;
					y += lineHeight;
				}

				const yOffset = lineHeight - height; // align to baseline

				ctx.fillStyle = color;
				for (let yi = 0; yi < height; yi++) {
					for (let xi = 0; xi < width; xi++) {
						if (bits[yi * width + xi]) {
							ctx.fillRect(x + xi, y + yi + yOffset, 1, 1);
						}
					}
				}

				x += width;
			}
		}
	});

	function getPreSize(
		items: {
			codePoint: number;
			width: number;
			height: number;
		}[],
		lineHeight: number
	) {
		let totalWidth = 0;
		let totalHeight = 0;
		let x = 0;
		let y = 0;

		for (const { codePoint, width } of items) {
			if (codePoint === '\n'.charCodeAt(0)) {
				x = 0;
				y += lineHeight;
				continue;
			}
			if (maxWidth && x + width > maxWidth) {
				x = 0;
				y += lineHeight;
			}

			totalWidth = Math.max(totalWidth, x + width);
			totalHeight = Math.max(totalHeight, y + lineHeight);

			x += width;
		}

		return {
			width: totalWidth,
			height: totalHeight
		};
	}
</script>

<canvas bind:this={canvas}>{items.map((item) => item.char).join('')}</canvas>

<style>
	canvas {
		image-rendering: pixelated;
	}
</style>
