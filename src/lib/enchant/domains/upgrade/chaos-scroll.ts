import { Gear, GearPropType, applyScroll, type Scroll } from '@malib/gear';
import { pickRandomIndex } from '../../../../routes/util';

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
export type ChaosScrollTypes = ChaosScrollOption[0]['type'];

export function getDefaultChaosScrollOption() {
	return chaosScrollStatTypes.map((e) => ({ type: e[1], name: e[0], value: null }));
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

export function doApplyScrollFullSupplier(gear: Gear, scrollSupplier: () => Scroll) {
	const count = gear.upgradeCountLeft;
	for (let i = 0; i < count; i++) {
		applyScroll(gear, scrollSupplier());
	}
	return gear;
}

export function getChaosScroll(stats: ChaosScrollOption): Scroll {
	return { name: '', option: new Map(stats.map((e) => [e.type, e.value ?? 0])) };
}

export function getRandomChaosScroll(
	stats: ChaosScrollOption,
	valueSupplier: (type: ChaosScrollTypes) => number
): Scroll {
	return {
		name: '',
		option: new Map(stats.map((e) => [e.type, e.value === null ? valueSupplier(e.type) : e.value]))
	};
}

export function incredibleChaosScrollOfGoodnessSupplier(type: ChaosScrollTypes) {
	const probs = [5.93, 4.94, 13.87, 23.87, 33.01, 18.38];
	if (type === GearPropType.incMHP || type === GearPropType.incMMP) {
		return [0, 1, 2, 3, 4, 6][pickRandomIndex(probs)] * 10;
	}
	return [0, 1, 2, 3, 4, 6][pickRandomIndex(probs)];
}
