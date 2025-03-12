<script lang="ts">
	import { getGearTypeString } from '$lib/entities/gear-tooltip/model/strings';
	import { GearType, isLeftWeapon, isWeapon } from '@malib/gear';

	let {
		gearType,
		attackSpeed
	}: {
		gearType: GearType;
		attackSpeed?: number;
	} = $props();

	function getAttackSpeedString(attackSpeed: number) {
		switch (attackSpeed) {
			case 2:
			case 3:
				return '매우빠름';
			case 4:
			case 5:
				return '빠름';
			case 6:
				return '보통';
			case 7:
			case 8:
				return '느림';
			case 9:
				return '매우느림';
			default:
				return attackSpeed.toString();
		}
	}
</script>

{#if isWeapon(gearType)}
	{@const handType =
		isLeftWeapon(gearType) || gearType === GearType.katara ? '한손무기' : '두손무기'}
	<div class="gt--detail gt--white">
		무기분류 : {getGearTypeString(gearType)} ({handType})
	</div>
	{#if attackSpeed}
		<div class="gt--detail gt--white">
			공격속도 : {getAttackSpeedString(attackSpeed)} ({10 - attackSpeed}단계)
		</div>
	{/if}
{:else}
	<div class="gt--detail gt--white">
		장비분류 : {getGearTypeString(gearType)}
	</div>
{/if}
