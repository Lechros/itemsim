import type { Gear, GearUpgradeOption, Scroll } from '@malib/gear';
import { indexChoice } from '$lib/shared/utils';

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
				option[stat.value] = chaosOptionValues[indexChoice(chaosOptionWeights)];
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
		value: 'str'
	},
	{
		label: 'DEX',
		value: 'dex'
	},
	{
		label: 'INT',
		value: 'int'
	},
	{
		label: 'LUK',
		value: 'luk'
	},
	{
		label: '최대 HP',
		value: 'maxHp'
	},
	{
		label: '최대 MP',
		value: 'maxMp'
	},
	{
		label: '공격력',
		value: 'attackPower'
	},
	{
		label: '마력',
		value: 'magicPower'
	},
	{
		label: '방어력',
		value: 'armor'
	},
	{
		label: '이동속도',
		value: 'speed'
	},
	{
		label: '점프력',
		value: 'jump'
	}
] as const;
