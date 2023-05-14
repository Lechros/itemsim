import { expect, test } from 'vitest';
import { Gear, GearPropType, GearType } from '@malib/gear';
import { getSpellTraceTypes } from './spelltrace';

test.each([
	[
		GearType.earrings,
		110,
		0,
		[
			GearPropType.incSTR,
			GearPropType.incINT,
			GearPropType.incDEX,
			GearPropType.incLUK,
			GearPropType.incMHP,
			GearPropType.incAllStat
		]
	],
	[GearType.shoes, 200, 1, [GearPropType.incSTR, GearPropType.incMHP, GearPropType.incAllStat]],
	[GearType.staff, 200, 2, [GearPropType.incINT]],
	[
		GearType.wand,
		8,
		0,
		[
			GearPropType.incSTR,
			GearPropType.incDEX,
			GearPropType.incLUK,
			GearPropType.incMHP,
			GearPropType.incINT
		]
	],
	[GearType.coat, 10, 4, [GearPropType.incDEX, GearPropType.incAllStat]],
	[
		GearType.pants,
		150,
		16,
		[GearPropType.incSTR, GearPropType.incDEX, GearPropType.incLUK, GearPropType.incAllStat]
	],
	[GearType.bow, 140, 4, [GearPropType.incDEX]]
])(
	'getSpellTraceTypes(type: %i, reqLevel: %i, reqJob: %i) -> %o',
	(type, reqLevel, reqJob, expected) => {
		const gear = new Gear();
		gear.req.level = reqLevel;
		gear.req.job = reqJob;
		gear.type = type;
		expect(getSpellTraceTypes(gear)).toEqual(expected);
	}
);
