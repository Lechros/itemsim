<script lang="ts">
	import GearIcon from '$lib/icon/GearIcon.svelte';
	import { PotentialGrade } from '@malib/gear';

	export let iconId: number;
	export let alt: string;
	export let grade: PotentialGrade;
	export let newBonus: boolean;

	$: color = getBorderColor(grade);

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
		<div class="item-icon__border {color}" />
	{/if}
	<div class="item-icon__base">
		<div class="item-icon__icon">
			<GearIcon {iconId} {alt} style="scale: 2;" />
		</div>
	</div>
	<div class="item-icon__old-dot" />
	{#if newBonus}
		<div class="item-icon__new-dot" />
	{/if}
	<div class="item-icon__cover" />
</div>

<style>
	.item-icon {
		position: relative;
	}

	.item-icon__base {
		background-image: url(../images/itemIcon/base.png);
		width: 82px;
		height: 82px;
	}

	.item-icon__icon {
		width: 80px;
		height: 80px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.item-icon__border {
		width: 90px;
		height: 80px;
		position: absolute;
		top: 1px;
		left: 1px;
	}
	.item-icon__border.rare {
		background-image: url(../images/itemIcon/rare.png);
	}
	.item-icon__border.epic {
		background-image: url(../images/itemIcon/epic.png);
	}
	.item-icon__border.unique {
		background-image: url(../images/itemIcon/unique.png);
	}
	.item-icon__border.legendary {
		background-image: url(../images/itemIcon/legendary.png);
	}

	.item-icon__old-dot {
		background-image: url(../images/itemIcon/old.png);
		width: 10px;
		height: 10px;
		position: absolute;
		top: 5px;
		left: 5px;
	}
	.item-icon__new-dot {
		background-image: url(../images/itemIcon/new.png);
		width: 6px;
		height: 6px;
		position: absolute;
		top: 7px;
		left: 7px;
	}

	.item-icon__cover {
		background-image: url(../images/itemIcon/cover.png);
		width: 74px;
		height: 74px;
		position: absolute;
		top: 4px;
		left: 4px;
	}
</style>
