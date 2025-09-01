import { Gear, GearCuttable } from '@malib/gear';

export const cuttableTypes = [
	{
		label: '사용 불가',
		value: GearCuttable.None
	},
	{
		label: '카르마의 가위',
		value: GearCuttable.Silver
	},
	{
		label: '플래티넘 카르마의 가위',
		value: GearCuttable.Platinum
	}
];

export const totalCuttableCounts = [
	{
		label: '없음',
		value: undefined
	},
	{
		label: '5회',
		value: 5
	},
	{
		label: '10회',
		value: 10
	},
	{
		label: '20회',
		value: 20
	}
];

export function setTotalCuttableCount(gear: Gear, count: number | undefined) {
	gear.data.attributes.cuttableCount = count;
	gear.data.attributes.totalCuttableCount = count;
}

export function setCuttableCount(gear: Gear, count: number | undefined) {
	if (gear.attributes.totalCuttableCount === undefined) {
		return;
	}

	count = count ?? 0;
	count = Math.max(0, count);
	count = Math.min(count, gear.attributes.totalCuttableCount);
	gear.data.attributes.cuttableCount = count;
}

export function validateCuttableCount(gear: Gear, count: number | undefined) {
	if (count === undefined || gear.attributes.totalCuttableCount === undefined) {
		return;
	}
	if (count < 0 || count > gear.attributes.totalCuttableCount) {
		return `가위 사용 잔여 횟수는 0 이상, 최대 횟수(${gear.attributes.totalCuttableCount}) 이하로 설정할 수 있어요.`;
	}
}
