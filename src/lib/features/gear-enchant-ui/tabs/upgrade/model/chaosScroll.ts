import { indexChoice } from '$lib/utils';
import type { Gear, GearUpgradeOption, Scroll } from '@malib/gear';

export function createChaosScroll(option: Partial<GearUpgradeOption>) {
	return {
		name: '혼돈의 주문서',
		icon: '5530143',
		option
	};
}

export function createEmptyOptionRandomizedChaosScroll(scroll: Scroll, gear: Gear) {
	const option = { ...scroll.option };
	for (const stat of chaosOptionTypes) {
		if (option[stat.value] === undefined || option[stat.value] === null) {
			if (gear.baseOption[stat.value] || gear.addOption[stat.value]) {
				option[stat.value] = chaosOptionValues[indexChoice(chaosOptionWeights)] * stat.weight;
			}
		}
	}
	return createChaosScroll(option);
}

const chaosOptionValues = [0, 1, 2, 3, 4, 6];
const chaosOptionWeights = [0.1838, 0.3301, 0.2387, 0.1387, 0.0494, 0.0593];

export const chaosOptionTypes = [
	{
		label: 'STR',
		value: 'str',
		weight: 1
	},
	{
		label: 'DEX',
		value: 'dex',
		weight: 1
	},
	{
		label: 'INT',
		value: 'int',
		weight: 1
	},
	{
		label: 'LUK',
		value: 'luk',
		weight: 1
	},
	{
		label: '최대 HP',
		value: 'maxHp',
		weight: 10
	},
	{
		label: '최대 MP',
		value: 'maxMp',
		weight: 10
	},
	{
		label: '공격력',
		value: 'attackPower',
		weight: 1
	},
	{
		label: '마력',
		value: 'magicPower',
		weight: 1
	},
	{
		label: '방어력',
		value: 'armor',
		weight: 1
	},
	{
		label: '이동속도',
		value: 'speed',
		weight: 1
	},
	{
		label: '점프력',
		value: 'jump',
		weight: 1
	}
] as const;
