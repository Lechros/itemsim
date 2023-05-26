<script lang="ts">
	export let src: string;
	export let origin: [number, number];
	export let draggable = false;

	$: _origin = origin ?? [0, 32];
</script>

<div class="icon-wrapper" {...$$restProps}>
	<div
		class="icon"
		class:loading={origin === undefined}
		draggable={draggable ? 'true' : 'false'}
		style="margin-left: {-_origin[0]}px; margin-top: {32 - _origin[1]}px;
		background-image: url({src})"
	/>
</div>

<style>
	.icon-wrapper {
		width: 32px;
		height: 32px;
		display: grid;
	}

	.icon {
		image-rendering: pixelated;
		width: 44px;
		height: 44px;
		background-repeat: no-repeat;
	}

	.icon.loading {
		display: none;
	}
</style>
