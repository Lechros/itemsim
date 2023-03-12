<script lang="ts">
	import { Gear, GearPropType, GearType } from '@malib/gear';
	import { getAttackSpeedString, getGearTypeString } from '../strings';

	export let gear: Gear;
</script>

{#if Gear.isWeapon(gear.type)}
	<div class="text">
        무기분류 : {getGearTypeString(gear.type)}
        {#if Gear.isLeftWeapon(gear.type) || gear.type === GearType.katara}
            (한손무기)
        {:else}
            (두손무기)
        {/if}
	</div>
    <div class="text">
        공격속도 : {getAttackSpeedString(gear.getPropValue(GearPropType.attackSpeed))}
    </div>
{:else}
	<div class="text">
        장비분류 : {getGearTypeString(gear.type)}
	</div>
{/if}

<style>
	.text {
		height: 15px;
		font-size: 11px;
		font-family: 돋움;
		color: var(--gear-white);
	}
</style>
