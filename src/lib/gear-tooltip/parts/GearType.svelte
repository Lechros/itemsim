<script lang="ts">
	import { Gear, GearType } from '@malib/gear';
	import { getAttackSpeedString, getGearTypeString } from '../strings';

	export let type: GearType;
	export let attackSpeed: number = 0;
</script>

{#if Gear.isWeapon(type)}
	<div class="text">
		무기분류 : {getGearTypeString(type)}
		{#if Gear.isLeftWeapon(type) || type === GearType.katara}
			(한손무기)
		{:else}
			(두손무기)
		{/if}
	</div>
	<div class="text">
		공격속도 : {getAttackSpeedString(attackSpeed)}
	</div>
{:else}
	<div class="text">
		장비분류 : {getGearTypeString(type)}
	</div>
{/if}

<style>
	.text {
		line-height: 15px;
		font-size: 11px;
		letter-spacing: normal;
		font-family: 돋움;
		color: var(--gear-white);
	}
</style>
