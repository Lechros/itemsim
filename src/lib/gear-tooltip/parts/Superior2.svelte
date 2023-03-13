<script lang="ts">
	import { GearPropType, type Gear } from '@malib/gear';
	import { getGearPropString } from '../strings';

	export let gear: Gear;
</script>

{#if gear.getBooleanValue(GearPropType.superiorEqp)}
	<div class="text">{getGearPropString(GearPropType.superiorEqp, 1)}</div>
{/if}

<style>
	.text {
		line-height: 15px;
		font-size: 11px;
		font-family: 돋움;
		color: var(--gear-green);
	}
</style>
