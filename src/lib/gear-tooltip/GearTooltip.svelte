<script lang="ts">
	import type { Gear } from '@malib/gear';
	import Attribute from './parts/Attribute.svelte';
	import DiffExtra from './parts/DiffExtra.svelte';
	import GearGrade from './parts/GearGrade.svelte';
	import GearType from './parts/GearType.svelte';
	import Icon from './parts/Icon.svelte';
	import Incline from './parts/Incline.svelte';
	import JobReq from './parts/JobReq.svelte';
	import Options from './parts/Options.svelte';
	import Req from './parts/Req.svelte';
	import Star from './parts/Star.svelte';
	import Superior from './parts/Superior.svelte';
	import Title from './parts/Title.svelte';

	export let gear: Gear;

	export let iconSrc = 'https://maplestory.io/api/KMS/367/item/{}/icon';
</script>

{#if gear}
	<div class="gear-tooltip">
		<div class="frame-top" />
		<div class="frame-line main">
			<Star {gear} />
			<div class="titles">
				<Title {gear} />
			</div>
			<GearGrade {gear} />
			<Attribute {gear} />
			<hr class="dotline" style="margin-top: 10px" />
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
			<div class="job-wrapper">
				<JobReq {gear} job={0x1f} />
			</div>
			<hr class="dotline" style="margin-top: 9px" />
			<div class="item-detail">
				<Superior {gear} />
				<GearType {gear} />
				<Options {gear} />
			</div>
		</div>
		<div class="frame-bottom" />
		<div class="frame-cover" />
	</div>
{/if}

<style>
	@import 'colors.css';

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

	.titles {
		display: flex;
		flex-direction: column;
		margin-top: -2px;
		align-items: center;
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
	.job-wrapper {
		margin-top: 3px;
	}

	.item-detail {
		width: 100%;
		box-sizing: border-box;
		margin-top: 4px;
		padding-left: 13px;
		padding-right: 13px;
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
		margin: 0;
		border: none;
	}
</style>
