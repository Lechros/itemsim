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

	const name = '트릭스터 레인져팬츠';
	const id = Number(Object.entries(gearJson).find((value) => value[1].name === name)?.[0]);
	const gear = createGearFromId(id)!;

	gear.props.set(GearPropType.tradeBlock, 1);
	gear.props.delete(GearPropType.equipTradeBlock);
	gear.props.delete(GearPropType.charmEXP);

	bonus.addBonusStat(gear, BonusStatType.STR_DEX, 6);
	bonus.addBonusStat(gear, BonusStatType.DEX, 6);
	bonus.addBonusStat(gear, BonusStatType.LUK, 5);
	bonus.addBonusStat(gear, BonusStatType.allStatR, 6);

	upgrade.applyGoldHammer(gear);
	for (let i = 0; i < 8; i++) upgrade.applySpellTrace(gear, GearPropType.incDEX, 30);
	for (let i = 0; i < 12; i++) enchant.addAmazingEnhancement(gear, i < 2);

	const potLevel = Potential.getPotentialLevel(gear.req.level);
	gear.grade = PotentialGrade.unique;
	gear.potentials.push(createPotentialFromCode(30042, potLevel)!);
	gear.potentials.push(createPotentialFromCode(20042, potLevel)!);
	gear.potentials.push(createPotentialFromCode(30042, potLevel)!);

	gear.additionalGrade = PotentialGrade.epic;
	gear.additionalPotentials.push(createPotentialFromCode(22042, potLevel)!);
	gear.additionalPotentials.push(createPotentialFromCode(12011, potLevel)!);
	gear.additionalPotentials.push(createPotentialFromCode(12011, potLevel)!);

	soul.enchant(gear);
	soul.setSoul(gear, createSoulFromId(2591590, MagnificentSoulOptionType.bdR)!);
	soul.setCharge(gear, 0);

	console.log(gear.origin)
</script>

<h1>Gear Tooltip</h1>

<GearTooltip {gear} />
