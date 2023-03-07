<script lang="ts">
	import GearTooltip from '../lib/gear-tooltip/GearTooltip.svelte';

	import { createGearFromId, createSoulFromId } from '@malib/create-gear';
	import { EnhancementLogic, SoulLogic } from '@malib/gear';

	const gear = createGearFromId(1004424)!;
	const enchant = new EnhancementLogic();
	const soul = new SoulLogic();
	for (let i = 0; i < 17; i++) enchant.addStarforce(gear);

	gear.soulSlot.enchanted = true;
	soul.setSoul(gear, createSoulFromId(2591708)!);
</script>

<h1>Gear Tooltip</h1>

<GearTooltip gear={gear}/>
