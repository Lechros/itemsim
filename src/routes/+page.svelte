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
		addBonusStat,
		addStarforce,
		applyGoldHammer,
		applySpellTrace,
		BonusStatType,
		GearPropType,
		Potential,
		PotentialGrade
	} from '@malib/gear';

	const name = '아케인셰이드 클로';
	const id = Number(Object.entries(gearJson).find((value) => value[1].name === name)?.[0]);
	const gear = createGearFromId(id)!;

	gear.props.set(GearPropType.tradeBlock, 1);
	gear.props.delete(GearPropType.equipTradeBlock);

	addBonusStat(gear, BonusStatType.STR, 5);
	addBonusStat(gear, BonusStatType.INT, 5);
	addBonusStat(gear, BonusStatType.PAD, 6);
	addBonusStat(gear, BonusStatType.bdR, 6);
	gear.karma = 10;

	applyGoldHammer(gear);
	for (let i = 0; i < 9; i++) applySpellTrace(gear, GearPropType.incSTR, 15);
	for (let i = 0; i < 12; i++) addStarforce(gear);

	const potLevel = Potential.getPotentialLevel(gear.req.level);
	gear.grade = PotentialGrade.unique;
	gear.potentials.push(createPotentialFromCode(30601, potLevel)!);
	gear.potentials.push(createPotentialFromCode(30051, potLevel)!);
	gear.potentials.push(createPotentialFromCode(30086, potLevel)!);

	gear.additionalGrade = PotentialGrade.epic;
	gear.additionalPotentials.push(createPotentialFromCode(22057, potLevel)!);
	gear.additionalPotentials.push(createPotentialFromCode(22058, potLevel)!);
	gear.additionalPotentials.push(createPotentialFromCode(12047, potLevel)!);

	gear.soulWeapon.enchant();
	gear.soulWeapon.setSoul(createSoulFromId(2591055)!);
	gear.soulWeapon.setCharge(1000);
</script>

<h1>Gear Tooltip</h1>

<GearTooltip {gear} />
