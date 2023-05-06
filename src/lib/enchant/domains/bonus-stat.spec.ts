import { expect, test } from 'vitest';
import { canBonus, getBonusGrades, getBonusTypes } from './bonus-stat';
import { BonusStatType, Gear, GearPropType, GearType } from '@malib/gear';

test.each([
	[GearType.cap, 0, true],
	[GearType.coat, 0, true],
	[GearType.pants, 0, true],
	[GearType.glove, 0, true],
	[GearType.shoes, 0, true],
	[GearType.cape, 0, true],
	[GearType.shoulder, 0, false],
	[GearType.shoulder, 1152155, true],
	[GearType.faceAccessory, 0, true],
	[GearType.eyeAccessory, 0, true],
	[GearType.earrings, 0, true],
	[GearType.pendant, 0, true],
	[GearType.belt, 0, true],
	[GearType.ring, 0, false],
	[GearType.machineHeart, 0, false],
	[GearType.pocket, 0, true],
	[GearType.badge, 0, false],
	[GearType.medal, 0, false],
	[GearType.tuner, 0, true],
	[GearType.ritualFan, 0, true],
	[GearType.magicBook1, 0, false],
	[GearType.shield, 0, false],
	[GearType.emblem, 0, false]
])('canBonus(gearType: %i, itemID: %i) -> %s', (type, id, expected) => {
	const gear = new Gear();
	gear.type = type;
	gear.itemID = id;
	expect(canBonus(gear)).toBe(expected);
});

test.each([
	[
		GearType.cap,
		10,
		[
			BonusStatType.STR,
			BonusStatType.DEX,
			BonusStatType.INT,
			BonusStatType.LUK,
			BonusStatType.STR_DEX,
			BonusStatType.STR_INT,
			BonusStatType.STR_LUK,
			BonusStatType.DEX_INT,
			BonusStatType.DEX_LUK,
			BonusStatType.INT_LUK,
			BonusStatType.MHP,
			BonusStatType.MMP,
			// BonusStatType.PAD,
			// BonusStatType.MAD,
			BonusStatType.PDD,
			BonusStatType.speed,
			BonusStatType.jump,
			// BonusStatType.allStatR,
			BonusStatType.reduceReq
		]
	],
	[
		GearType.glove,
		60,
		[
			BonusStatType.STR,
			BonusStatType.DEX,
			BonusStatType.INT,
			BonusStatType.LUK,
			BonusStatType.STR_DEX,
			BonusStatType.STR_INT,
			BonusStatType.STR_LUK,
			BonusStatType.DEX_INT,
			BonusStatType.DEX_LUK,
			BonusStatType.INT_LUK,
			BonusStatType.MHP,
			BonusStatType.MMP,
			BonusStatType.PAD,
			BonusStatType.MAD,
			BonusStatType.PDD,
			BonusStatType.speed,
			BonusStatType.jump,
			// BonusStatType.allStatR,
			BonusStatType.reduceReq
		]
	],
	[
		GearType.cape,
		70,
		[
			BonusStatType.STR,
			BonusStatType.DEX,
			BonusStatType.INT,
			BonusStatType.LUK,
			BonusStatType.STR_DEX,
			BonusStatType.STR_INT,
			BonusStatType.STR_LUK,
			BonusStatType.DEX_INT,
			BonusStatType.DEX_LUK,
			BonusStatType.INT_LUK,
			BonusStatType.MHP,
			BonusStatType.MMP,
			BonusStatType.PAD,
			BonusStatType.MAD,
			BonusStatType.PDD,
			BonusStatType.speed,
			BonusStatType.jump,
			BonusStatType.allStatR,
			BonusStatType.reduceReq
		]
	],
	[
		GearType.thSword,
		50,
		[
			BonusStatType.STR,
			BonusStatType.DEX,
			BonusStatType.INT,
			BonusStatType.LUK,
			BonusStatType.STR_DEX,
			BonusStatType.STR_INT,
			BonusStatType.STR_LUK,
			BonusStatType.DEX_INT,
			BonusStatType.DEX_LUK,
			BonusStatType.INT_LUK,
			BonusStatType.MHP,
			BonusStatType.MMP,
			BonusStatType.PAD,
			BonusStatType.MAD,
			BonusStatType.PDD,
			BonusStatType.damR,
			BonusStatType.reduceReq
		]
	],
	[
		GearType.tuner,
		120,
		[
			BonusStatType.STR,
			BonusStatType.DEX,
			BonusStatType.INT,
			BonusStatType.LUK,
			BonusStatType.STR_DEX,
			BonusStatType.STR_INT,
			BonusStatType.STR_LUK,
			BonusStatType.DEX_INT,
			BonusStatType.DEX_LUK,
			BonusStatType.INT_LUK,
			BonusStatType.MHP,
			BonusStatType.MMP,
			BonusStatType.PAD,
			BonusStatType.MAD,
			BonusStatType.PDD,
			BonusStatType.bdR,
			BonusStatType.damR,
			BonusStatType.allStatR,
			BonusStatType.reduceReq
		]
	]
])('getBonusTypes(gearType: %i, reqLevel: %i) -> %s', (type, reqLevel, expected) => {
	const gear = new Gear();
	gear.type = type;
	gear.req.level = reqLevel;
	expect(getBonusTypes(gear)).toEqual(expected);
});

test('getBonusGrades(bossReward: true)', () => {
	const gear = new Gear();
	gear.props.set(GearPropType.bossReward, 1);
	expect(getBonusGrades(gear)).toEqual([3, 4, 5, 6, 7]);
});

test('getBonusGrades(bossReward: false)', () => {
	const gear = new Gear();
	gear.props.set(GearPropType.bossReward, 0);
	expect(getBonusGrades(gear)).toEqual([1, 2, 3, 4, 5, 6, 7]);
});
