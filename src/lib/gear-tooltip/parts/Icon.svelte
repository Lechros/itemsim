<script lang="ts">
	import { PotentialGrade, type Gear } from '@malib/gear';

	export let src: string;
	export let origin: [number, number];
	export let alt: string;
	export let grade: PotentialGrade;

	$: color = getBorderColor(grade);
	$: originX = 6 + (1 - origin[0]) * 2;
	$: originY = 5 + (33 - origin[1]) * 2;

	function getBorderColor(grade: PotentialGrade) {
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
		<div class="shade" />
		<img class="icon" {src} {alt} style="margin-left: {originX}px; margin-top: {originY}px" />
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

	.shade {
		background-image: url(../images/itemIcon/shade.png);
		width: 49px;
		height: 15px;
		position: absolute;
		top: 59px;
		left: 15px;
		opacity: 0.5;
	}
</style>
