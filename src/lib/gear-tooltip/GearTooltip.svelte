<script lang="ts">
	import type { Gear } from '@malib/gear';
	import Attribute from './parts/Attribute.svelte';
	import DiffExtra from './parts/DiffExtra.svelte';
	import GearGrade from './parts/GearGrade.svelte';
	import Icon from './parts/Icon.svelte';
	import Incline from './parts/Incline.svelte';
	import JobReq from './parts/JobReq.svelte';
	import Req from './parts/Req.svelte';
	import Star from './parts/Star.svelte';
	import Title from './parts/Title.svelte';

	export let gear: Gear;

	export let iconSrc = 'https://maplestory.io/api/KMS/367/item/{}/icon';
</script>

{#if gear}
	<div class="gear-tooltip">
		<div class="frame-top" />
		<div class="frame-line main">
			<Star {gear} />
			<Title {gear} />
			<GearGrade {gear} />
			<Attribute {gear} />
			<hr class="dotline" />
			<div class="icon-area">
				<div class="icon-wrapper">
					<Icon
						{gear}
						iconSrc={iconSrc.replace('{}', gear.icon.toString())}
						iconOrigin={gear.origin}
					/>
				</div>
				<Incline incline={1124091} />
				<Req {gear} />
			</div>
			<div class="diff-wrapper">
				<DiffExtra />
			</div>
			<JobReq {gear} job={0x1f} />
		</div>
		<div class="frame-bottom" />
		<div class="frame-cover" />
	</div>
{/if}

<style>
	@import "colors.css";

	.gear-tooltip {
		width: 261px;
		position: relative;
		image-rendering: pixelated;
	}

	.main {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.frame-top {
		background-image: url(images/frame/top.png);
		width: 261px;
		height: 13px;
	}
	.frame-line {
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
	.dotline {
		background-image: url(images/frame/dotline.png);
		width: 261px;
		height: 2px;
		margin: 9px 0 0 0;
		border: none;
	}

	.icon-area {
		box-sizing: border-box;
		display: grid;
		margin-top: 7px;
		width: 100%;
		padding-left: 12px;
		padding-right: 8px;
		grid-template-columns: 82px 159px;
		grid-template-rows: 44px 36px;
		row-gap: 2px;
	}
	.icon-wrapper {
		grid-column: 1;
		grid-row-start: 1;
		grid-row-end: 3;
		margin-top: 1px;
	}

	.diff-wrapper {
		align-self: flex-start;
		margin-top: 3px;
		margin-left: 12px;
	}
</style>
