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
		case 1022278:
			return [exceptionalParts['파멸의 징표']];
		case 1032316:
			return [exceptionalParts['충정의 투구']];
	}
	return [];
}

const exceptionalParts = {
	'악몽의 조각': {
		name: '악몽의 조각',
		icon: 2644200,
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
	},
	'파멸의 징표': {
		name: '파멸의 징표',
		icon: 2644202,
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
	},
	'충정의 투구': {
		name: '충정의 투구',
		icon: 2644203,
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
	}
};
