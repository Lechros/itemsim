<script lang="ts">
	import GearTooltip from '../lib/gear-tooltip/GearTooltip.svelte';

	import { createGearFromId, createSoulFromId } from '@malib/create-gear';
	import {
	BonusStatLogic,
		BonusStatType,
		EnhancementLogic,
		GearPropType,
		Potential,
		PotentialGrade,
		SoulLogic,
		UpgradeLogic
	} from '@malib/gear';

	const gear = createGearFromId(1452266)!;
	const enchant = new EnhancementLogic();
	const soul = new SoulLogic();
	const upgrade = new UpgradeLogic();
	const bonus = new BonusStatLogic();

	bonus.addBonusStat(gear, BonusStatType.STR, 4);
	bonus.addBonusStat(gear, BonusStatType.PAD, 6);
	bonus.addBonusStat(gear, BonusStatType.PDD, 5);
	bonus.addBonusStat(gear, BonusStatType.bdR, 5);
	for (let i = 0; i < 8; i++) upgrade.applySpellTrace(gear, GearPropType.incDEX, 15);
	for (let i = 0; i < 17; i++) enchant.addStarforce(gear);

	gear.soulSlot.enchanted = true;
	soul.setSoul(gear, createSoulFromId(2591708)!);

	gear.grade = PotentialGrade.legendary;
	gear.potentials.push(new Potential());

	gear.props.set(GearPropType.tradeBlock, 1);
	// gear.props.set(GearPropType.blockGoldHammer, 1);
	gear.props.set(GearPropType.onlyEquip, 1);

	// gear.option(GearPropType.reduceReq).bonus = 15;
</script>

<h1>Gear Tooltip</h1>

<GearTooltip {gear} />
