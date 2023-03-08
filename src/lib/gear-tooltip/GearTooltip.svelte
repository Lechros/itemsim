<script lang="ts">
	import type { Gear } from '@malib/gear';

	import Star from './parts/Star.svelte';
	import Title from './parts/Title.svelte';

	export let gear: Gear;
</script>

<div class="gear-tooltip">
	<div class="frame-top" />
	<div class="frame-line">
		<Star {gear} />
		<Title {gear} />
	</div>
	<div class="frame-bottom" />
	<div class="frame-cover" />
</div>

<style>
	.gear-tooltip {
		width: 261px;
		position: relative;
		image-rendering: pixelated;
	}

	.frame-top {
		background-image: url(images/frame/top.png);
		width: 261px;
		height: 13px;
	}
	.frame-line {
		display: flex;
		flex-direction: column;
		align-items: center;

		background-image: url(images/frame/line.png);
		width: 261px;
	}
	.frame-bottom {
		background-image: url(images/frame/bottom.png);
		width: 261px;
		height: 13px;
	}
	.frame-cover {
		background-image: url(images/frame/cover.png);
		width: 53px;
		height: 43px;
		position: absolute;
		top: 0;
		left: 0;
	}
</style>
