<script lang="ts">
	import GearTooltip from '../lib/gear-tooltip/GearTooltip.svelte';

	import { createGearFromId, createSoulFromId } from '@malib/create-gear';
	import {
		EnhancementLogic,
		GearPropType,
		Potential,
		PotentialGrade,
		SoulLogic,
		UpgradeLogic
	} from '@malib/gear';

	const gear = createGearFromId(1004424)!;
	const enchant = new EnhancementLogic();
	const soul = new SoulLogic();
	const upgrade = new UpgradeLogic();
	for (let i = 0; i < 17; i++) enchant.addStarforce(gear);

	gear.soulSlot.enchanted = true;
	soul.setSoul(gear, createSoulFromId(2591708)!);

	upgrade.applySpellTrace(gear, GearPropType.incDEX, 30);

	gear.grade = PotentialGrade.legendary;
	gear.potentials.push(new Potential());

	gear.props.set(GearPropType.tradeBlock, 1);
	gear.props.set(GearPropType.blockGoldHammer, 1);
	gear.props.set(GearPropType.onlyEquip, 1);

	gear.option(GearPropType.reduceReq).bonus = 15;
</script>

<h1>Gear Tooltip</h1>

<GearTooltip {gear} />
