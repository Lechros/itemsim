<script lang="ts">
	import GearTooltip from '../lib/gear-tooltip/GearTooltip.svelte';

	import {
		createGearFromId,
		createPotentialFromCode,
		createSoulFromId,
		gearJson,
		MagnificentSoulOptionType
	} from '@malib/create-gear';
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

	const enchant = new EnhancementLogic();
	const soul = new SoulLogic();
	const upgrade = new UpgradeLogic();
	const bonus = new BonusStatLogic();

	const name = '아케인셰이드 아처케이프';
	const id = Number(Object.entries(gearJson).find((value) => value[1].name === name)?.[0]);
	const gear = createGearFromId(id)!;

	gear.props.set(GearPropType.tradeBlock, 1);
	gear.amazing = true;

	bonus.addBonusStat(gear, BonusStatType.STR, 4);
	bonus.addBonusStat(gear, BonusStatType.PAD, 6);
	bonus.addBonusStat(gear, BonusStatType.PDD, 5);
	bonus.addBonusStat(gear, BonusStatType.bdR, 5);
	upgrade.applyGoldHammer(gear);
	for (let i = 0; i < 8; i++) upgrade.applySpellTrace(gear, GearPropType.incDEX, 30);
	for (let i = 0; i < 17; i++) enchant.addStarforce(gear);

	gear.grade = PotentialGrade.legendary;
	gear.potentials.push(
		createPotentialFromCode(40602, Potential.getPotentialLevel(gear.req.level))!
	);
	gear.potentials.push(
		createPotentialFromCode(30051, Potential.getPotentialLevel(gear.req.level))!
	);
	gear.potentials.push(
		createPotentialFromCode(30291, Potential.getPotentialLevel(gear.req.level))!
	);

	gear.additionalGrade = PotentialGrade.unique;
	gear.additionalPotentials.push(
		createPotentialFromCode(30051, Potential.getPotentialLevel(gear.req.level))!
	);
	gear.additionalPotentials.push(
		createPotentialFromCode(30291, Potential.getPotentialLevel(gear.req.level))!
	);
	gear.additionalPotentials.push(
		createPotentialFromCode(40602, Potential.getPotentialLevel(gear.req.level))!
	);

	soul.enchant(gear);
	soul.setSoul(gear, createSoulFromId(2591590, MagnificentSoulOptionType.bdR)!);
	soul.setCharge(gear, 0);
</script>

<h1>Gear Tooltip</h1>

<GearTooltip {gear} />
