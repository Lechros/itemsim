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
</script>

<div class="h-8 w-8" style="scale: {scale}">
	{#if origin}
		<img {src} {alt} style="margin-left: {-origin[0]}px; margin-top: {32 - origin[1]}px" />
	{/if}
</div>

<style>
	img {
		image-rendering: pixelated;
		max-width: none;
	}
</style>
