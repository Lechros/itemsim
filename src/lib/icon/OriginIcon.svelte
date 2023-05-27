<script lang="ts">
	export let src: string;
	export let origin: [number, number];
	export let draggable = false;
	export let visible = true;
</script>

<div class="icon-wrapper" {...$$restProps}>
	<div
		class="icon"
		class:visible
		draggable={draggable ? 'true' : 'false'}
		style="margin-left: {-origin[0]}px; margin-top: {32 - origin[1]}px;
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

	.icon:not(.visible) {
		visibility: hidden;
	}
</style>
