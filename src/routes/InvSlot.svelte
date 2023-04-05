<script lang="ts">
	import { PotentialGrade } from '@malib/gear';
	import { AspectRatio, ClickableTile } from 'carbon-components-svelte';

	import type { GearSlot } from './gear-store';

	export let slot: GearSlot;

	$: gear = slot.gear;

	function getIconName(grade: PotentialGrade) {
		switch (grade) {
			case PotentialGrade.normal:
				return 'normal';
			case PotentialGrade.rare:
				return 'rare';
			case PotentialGrade.epic:
				return 'epic';
			case PotentialGrade.unique:
				return 'unique';
			case PotentialGrade.legendary:
				return 'legendary';
			default:
				return '';
		}
	}
</script>

<ClickableTile on:click on:mouseenter on:mouseleave disabled={!gear} style="min-width: 0;">
	<AspectRatio ratio="1x1">
		{#if gear}
			<div class="icon-wrapper">
				<img
					src="https://maplestory.io/api/KMS/367/item/{gear.icon.id}/icon"
					alt={gear.name}
					class="gear-icon"
					style="
						margin-left: {1 - gear.icon.origin[0]}px;
						margin-top: {33 - gear.icon.origin[1]}px;"
				/>
				{#if gear.star > 0}
					<div class="star">
						<span class="icon {gear.amazing ? 'blue' : 'yellow'}" />
						{gear.star}
					</div>
				{/if}
				<div class="grade-wrapper">
					<div class="grade-icon {getIconName(gear.grade)}" />
					<div class="grade-icon {getIconName(gear.additionalGrade)}" />
				</div>
			</div>
		{/if}
	</AspectRatio>
</ClickableTile>

<style>
	.icon-wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
	}

	.gear-icon {
		image-rendering: pixelated;
		scale: 2;
	}

	.star {
		position: absolute;
		top: calc(var(--cds-spacing-03) * -1);
		left: calc(var(--cds-spacing-03) * -1);
		display: flex;
		font-size: 12px;
		gap: 2px;
		align-items: baseline;
	}

	.star > .icon {
		width: 11px;
		height: 10px;
	}
	.star > .yellow {
		background-image: url(../images/yellow.png);
	}
	.star > .blue {
		background-image: url(../images/blue.png);
	}

	.grade-wrapper {
		position: absolute;
		right: calc(var(--cds-spacing-03) * -1);
		bottom: calc(var(--cds-spacing-03) * -1);
		display: flex;
		flex-direction: column;
	}

	.grade-icon {
		width: 13px;
		height: 13px;
	}
	.grade-icon.normal {
		background-image: url(../images/normal.png);
	}
	.grade-icon.rare {
		background-image: url(../images/rare.png);
	}
	.grade-icon.epic {
		background-image: url(../images/epic.png);
	}
	.grade-icon.unique {
		background-image: url(../images/unique.png);
	}
	.grade-icon.legendary {
		background-image: url(../images/legendary.png);
	}
</style>
