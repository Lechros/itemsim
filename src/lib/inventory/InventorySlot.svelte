<script lang="ts">
	import { PotentialGrade } from '@malib/gear';
	import { AspectRatio, Tag } from 'carbon-components-svelte';
	import type { GearInfo } from './stores/gear-store';
	import GearIcon from '$lib/icon/GearIcon.svelte';

	export let info: GearInfo | undefined;

	$: gear = info?.gear;

	function getIconName(grade: PotentialGrade) {
		switch (grade) {
			case PotentialGrade.normal:
				return 'slot__grade-icon--normal';
			case PotentialGrade.rare:
				return 'slot__grade-icon--rare';
			case PotentialGrade.epic:
				return 'slot__grade-icon--epic';
			case PotentialGrade.unique:
				return 'slot__grade-icon--unique';
			case PotentialGrade.legendary:
				return 'slot__grade-icon--legendary';
			default:
				return '';
		}
	}
</script>

<AspectRatio ratio="1x1" style="pointer-events: none;">
	{#if gear}
		<div class="slot">
			<GearIcon iconId={gear.icon.id} style="scale: 2;"/>
			<div class="slot__enchant">
				{#if gear.star > 0}
					<Tag size="sm" type="high-contrast">
						<div class="slot__star-content">
							<div class="slot__star-icon" class:slot__star-icon--amazing={gear.amazing} />
							{gear.star}
						</div>
					</Tag>
				{/if}
				{#if gear.upgradeCount > 0}
					<Tag size="sm">
						<div class="slot__upgrade-content">
							+{gear.upgradeCount}
						</div>
					</Tag>
				{/if}
			</div>
			<div class="slot__grades">
				<div class="slot__grade-icon {getIconName(gear.grade)}" />
				<div class="slot__grade-icon {getIconName(gear.additionalGrade)}" />
			</div>
			<div class="slot__exceptional">
				{#if gear.exceptionalUpgradeCount > 0}
					<div class="slot__exceptional-icon" />
				{/if}
			</div>
		</div>
	{/if}
</AspectRatio>

<style lang="scss">
	$chip-spacing: calc(var(--cds-spacing-04) * -1);
	$icon-spacing: calc(var(--cds-spacing-03) * -1);

	.slot {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
	}

	.slot__icon {
		image-rendering: pixelated;
		scale: 2;
	}

	.slot__enchant {
		position: absolute;
		top: $chip-spacing;
		left: $chip-spacing;
		display: flex;
	}

	.slot__star-content {
		display: flex;
		align-items: center;
		line-height: normal;
		word-break: keep-all;
	}

	.slot__star-icon {
		background-image: url(./images/star-starforce.png);
		width: 11px;
		height: 10px;
	}
	.slot__star-icon--amazing {
		background-image: url(./images/star-amazing.png);
	}

	.slot__upgrade-content {
		line-height: normal;
	}

	.slot__grades {
		position: absolute;
		right: $icon-spacing;
		bottom: $icon-spacing;
		display: flex;
		flex-direction: column;
		gap: var(--cds-spacing-01);
	}

	.slot__grade-icon {
		width: 13px;
		height: 13px;
	}
	.slot__grade-icon--normal {
		background-image: url(./images/grade-normal.png);
	}
	.slot__grade-icon--rare {
		background-image: url(./images/grade-rare.png);
	}
	.slot__grade-icon--epic {
		background-image: url(./images/grade-epic.png);
	}
	.slot__grade-icon--unique {
		background-image: url(./images/grade-unique.png);
	}
	.slot__grade-icon--legendary {
		background-image: url(./images/grade-legendary.png);
	}

	.slot__exceptional {
		position: absolute;
		left: $icon-spacing;
		bottom: $icon-spacing;
	}

	.slot__exceptional-icon {
		background-image: url(./images/exceptional.png);
		width: 19px;
		height: 13px;
	}
</style>
