import { GearPropType, type Scroll } from '@malib/gear';

export const chaosScrollStatTypes = [
	['STR', GearPropType.incSTR],
	['DEX', GearPropType.incDEX],
	['INT', GearPropType.incINT],
	['LUK', GearPropType.incLUK],
	['최대 HP', GearPropType.incMHP],
	['최대 MP', GearPropType.incMMP],
	['공격력', GearPropType.incPAD],
	['마력', GearPropType.incMAD],
	['방어력', GearPropType.incPDD],
	['이동속도', GearPropType.incSpeed],
	['점프력', GearPropType.incJump]
] as const;

export type ChaosScrollOption = ReturnType<typeof getDefaultChaosScrollOption>;

export function getDefaultChaosScrollOption() {
	return chaosScrollStatTypes.map((e) => ({ type: e[1], name: e[0], value: 0 }));
}

export function getPropTypeWeight(type: GearPropType) {
	switch (type) {
		case GearPropType.incMHP:
		case GearPropType.incMMP:
			return 10;
		default:
			return 1;
	}
}

export function getChaosScroll(stats: ChaosScrollOption): Scroll {
	return { name: '', option: new Map(stats.map((e) => [e.type, e.value])) };
}
