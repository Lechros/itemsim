<script lang="ts">
	import { PotentialGrade, type Gear } from '@malib/gear';

	export let gear: Gear;
	export let iconSrc: string;
	export let iconOrigin: [number, number];

	$: color = getBorderColor(gear);

	$: originX = 6 + (1 - iconOrigin[0]) * 2;
	$: originY = 6 + (33 - iconOrigin[1]) * 2;

	function getBorderColor(gear: Gear) {
		const grade = Math.max(gear.grade, gear.additionalGrade);
		switch (grade) {
			case PotentialGrade.rare:
				return 'rare';
			case PotentialGrade.epic:
				return 'epic';
			case PotentialGrade.unique:
				return 'unique';
			case PotentialGrade.legendary:
				return 'legendary';
		}
		return '';
	}
</script>

<div class="item-icon">
	{#if color !== ''}
		<div class="border {color}" />
	{/if}
	<div class="base">
		<img
			class="icon"
			src={iconSrc}
			alt={gear.name}
			style="margin-left: {originX}px; margin-top: {originY}px"
		/>
	</div>
	<div class="cover" />
</div>

<style>
	.item-icon {
		position: relative;
	}

	.base {
		background-image: url(../images/itemIcon/base.png);
		width: 82px;
		height: 82px;
		position: relative;
	}

	.icon {
		transform: scale(2);
		transform-origin: top left;
	}

	.border {
		width: 90px;
		height: 80px;
		position: absolute;
		top: 1px;
		left: 1px;
	}
	.border.rare {
		background-image: url(../images/itemIcon/rare.png);
	}
	.border.epic {
		background-image: url(../images/itemIcon/epic.png);
	}
	.border.unique {
		background-image: url(../images/itemIcon/unique.png);
	}
	.border.legendary {
		background-image: url(../images/itemIcon/legendary.png);
	}

	.cover {
		background-image: url(../images/itemIcon/cover.png);
		width: 74px;
		height: 74px;
		position: absolute;
		top: 4px;
		left: 4px;
	}
</style>
