import {
	type Gear,
	type ExceptionalParts,
	applyExceptionalEnchant,
	resetExceptionalEnchant,
	GearPropType
} from '@malib/gear';

export function canExceptional(gear: Gear) {
	return gear.exceptionalTotalUpgradeCount > 0;
}

export function canExceptionalEnchant(gear: Gear) {
	return gear.exceptionalUpgradeCountLeft > 0;
}

export function doExceptionalEnchant(gear: Gear, part: ExceptionalParts) {
	applyExceptionalEnchant(gear, part);
	return gear;
}

export function resetExceptional(gear: Gear) {
	resetExceptionalEnchant(gear);
	return gear;
}

export function getExceptionalParts(gear: Gear) {
	switch (gear.itemID) {
		case 1132308:
			return [exceptionalParts['악몽의 조각']];
		case 1012632:
			return [exceptionalParts['그라비티 모듈']];
	}
	return [];
}

const exceptionalParts = {
	'악몽의 조각': {
		name: '악몽의 조각',
		icon: 2644200,
		size: [32, 29],
		origin: [-1, 30],
		option: new Map([
			[GearPropType.incSTR, 20],
			[GearPropType.incDEX, 20],
			[GearPropType.incINT, 20],
			[GearPropType.incLUK, 20],
			[GearPropType.incPAD, 15],
			[GearPropType.incMAD, 15],
			[GearPropType.incMHP, 1000],
			[GearPropType.incMMP, 1000]
		])
	},
	'그라비티 모듈': {
		name: '그라비티 모듈',
		icon: 2644201,
		size: [33, 34],
		origin: [0, 33],
		option: new Map([
			[GearPropType.incSTR, 15],
			[GearPropType.incDEX, 15],
			[GearPropType.incINT, 15],
			[GearPropType.incLUK, 15],
			[GearPropType.incPAD, 10],
			[GearPropType.incMAD, 10],
			[GearPropType.incMHP, 750],
			[GearPropType.incMMP, 750]
		])
	}
};
