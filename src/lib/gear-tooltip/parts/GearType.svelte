<script lang="ts">
	import { Gear, GearType } from '@malib/gear';
	import { getAttackSpeedString, getGearTypeString } from '../strings';

	export let type: GearType;
	export let attackSpeed: number = 0;
</script>

{#if Gear.isWeapon(type)}
	<div class="gt--text">
		무기분류 : {getGearTypeString(type)}
		{#if Gear.isLeftWeapon(type) || type === GearType.katara}
			(한손무기)
		{:else}
			(두손무기)
		{/if}
	</div>
	<div class="gt--text">
		공격속도 : {getAttackSpeedString(attackSpeed)}
	</div>
{:else}
	<div class="gt--text">
		장비분류 : {getGearTypeString(type)}
	</div>
{/if}
