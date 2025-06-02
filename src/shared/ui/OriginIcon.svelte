<script lang="ts">
	let {
		src,
		alt,
		origin,
		scale = 1
	}: {
		src: string;
		alt: string;
		origin?: [number, number];
		scale?: number;
	} = $props();

	const ml = $derived(origin ? -origin[0] : 0);
	const mt = $derived(origin ? 32 - origin[1] : 0);
	const invisible = $derived(origin === undefined);
</script>

<div class="h-8 w-8" style="scale: {scale}">
	<img
		{src}
		{alt}
		style="margin-left: {ml}px; margin-top: {mt}px"
		class={[invisible && 'invisible']}
		draggable="false"
	/>
</div>

<style>
	img {
		image-rendering: pixelated;
		max-width: none;
		pointer-events: none;
	}
</style>
