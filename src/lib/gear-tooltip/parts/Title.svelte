<script lang="ts">
	import type { Gear } from '@malib/gear';
	import { getGearNameColor } from '../graphics';

	export let gear: Gear;

	$: color = getGearNameColor(gear);
</script>

{#if gear.soulSlot.enchanted && gear.soulSlot.soul?.name}
	<div class="soul title">
		{gear.soulSlot.soul.name.replace(/ 소울$/, ' ')}
	</div>
{/if}

<div class="title" style="color: var({color})">
	{gear.name + (gear.upgradeCount > 0 ? ` (+${gear.upgradeCount})` : '')}
</div>

<style>
	.title {
		line-height: 19px;
		font-size: 14px;
		font-family: 돋움;
		font-weight: bold;
		white-space: pre;
	}

	.soul.title {
		color: var(--gear-green);
	}
</style>
