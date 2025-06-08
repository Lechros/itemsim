import type { GearUpgradeOption, Scroll } from '@malib/gear';
import { getRandomInt } from './utils';

export function createChaosScroll(option: Partial<GearUpgradeOption>) {
	return {
		name: '혼돈의 주문서',
		icon: '5530143',
		option
	};
}

export function createEmptyOptionRandomizedChaosScroll(scroll: Scroll, min: number, max: number) {
	const option = { ...scroll.option };
	for (const stat of chaosOptionTypes) {
		if (option[stat.value] === undefined || option[stat.value] === null) {
			option[stat.value] = getRandomInt(min, max);
		}
	}
	return createChaosScroll(option);
}

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
