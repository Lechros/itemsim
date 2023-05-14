<script lang="ts">
	import { PotentialGrade } from '@malib/gear';
	import { AspectRatio, Tag } from 'carbon-components-svelte';
	import type { GearSlot } from './stores/gear-store';

	export let _slot: GearSlot | undefined;

	export let img: HTMLImageElement | undefined = undefined;

	$: gear = _slot?.gear;

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
	{#if _slot && gear}
		<div class="slot">
			<img
				draggable="false"
				src="https://maplestory.io/api/KMS/367/item/{gear.icon.id}/icon"
				alt={gear.name}
				class="slot__icon"
				style="
					margin-left: {1 - gear.icon.origin[0]}px;
					margin-top: {33 - gear.icon.origin[1]}px;"
				bind:this={img}
			/>
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
		</div>
	{/if}
</AspectRatio>

<style>
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
		top: calc(var(--cds-spacing-03) * -1);
		left: calc(var(--cds-spacing-03) * -1);
	}

	.slot__star-content {
		display: flex;
		align-items: center;
		line-height: normal;
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
		right: calc(var(--cds-spacing-02) * -1);
		bottom: calc(var(--cds-spacing-02) * -1);
		display: flex;
		flex-direction: column;
		gap: var(--cds-spacing-01);
	}

	@media (max-width: 24rem) {
		.slot__enchant {
			top: calc(var(--cds-spacing-04) * -1);
			left: calc(var(--cds-spacing-04) * -1);
		}

		.slot__grades {
			right: calc(var(--cds-spacing-03) * -1);
			bottom: calc(var(--cds-spacing-03) * -1);
			gap: 0;
		}
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
</style>
