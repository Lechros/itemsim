<script lang="ts">
	import { toCanvas } from 'html-to-image';
	import html2canvas from 'html2canvas';

	export let tooltip: HTMLDivElement;
	export let rendered = false;
	export let canvas: HTMLCanvasElement | undefined;

	let rendering = false;

	let wrapper: HTMLDivElement;

	export async function build() {
		if (!tooltip) return;
		if (rendering) return;

		rendered = false;
		rendering = true;
		try {
			tooltip.classList.add('gt--hidden-text');
			const cv1 = await toCanvas(tooltip, { cacheBust: true, skipFonts: true });
			tooltip.classList.remove('gt--hidden-text');

			tooltip.classList.add('gt--hidden-except-text');
			const cv2 = await html2canvas(tooltip, { canvas: cv1, backgroundColor: 'transparent' });
			tooltip.classList.remove('gt-hidden-except-text');

			if (canvas) {
				canvas.remove();
			}
			canvas = cv2;
			wrapper.appendChild(canvas);
			rendered = true;
		} catch (e) {
			console.error(e);
		} finally {
			tooltip.classList.remove('gt--hidden-text');
			tooltip.classList.remove('gt--hidden-except-text');
			rendering = false;
		}
	}
</script>

<div bind:this={wrapper}>
	<canvas bind:this={canvas} />
</div>
