<script lang="ts">
	export let src: string;
	export let alt: string;
	export let origin: [number, number];
	export let draggable = false;

	$: _origin = origin ?? [0, 32];
</script>

<div {...$$restProps}>
	<img
		class:loading={origin === undefined}
		{src}
		{alt}
		draggable={draggable ? 'true' : 'false'}
		style="margin-left: {-_origin[0]}px; margin-top: {32 - _origin[1]}px;"
	/>
</div>

<style>
	div {
		width: 32px;
		height: 32px;
		display: grid;
	}

	img {
		image-rendering: pixelated;
	}

	img.loading {
		display: none;
	}
</style>
