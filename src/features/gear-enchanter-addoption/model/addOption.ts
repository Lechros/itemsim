import { AddOptionType, Gear, getAddOptionValue, ReadonlyGear } from '@malib/gear';

export function getAvailableTypes(gear: ReadonlyGear) {
	const types: ReturnType<typeof addOptionTypes.slice> = [];
	for (const type of addOptionTypes) {
		if (!type.value) {
			types.push(type);
			continue;
		}
		try {
			getAddOptionValue(gear, type.value, 1);
			types.push(type);
		} catch {}
	}
	return types;
}

export function getAvailableGrades(gear: ReadonlyGear, type: AddOptionType) {
	const grades: ReturnType<typeof addOptionGrades.slice> = [];
	for (const grade of addOptionGrades) {
		if (gear.attributes.bossReward && grade <= 2) {
			continue;
		}
		try {
			getAddOptionValue(gear, type, grade);
			grades.push(grade);
		} catch {}
	}
	return grades;
}

export const addOptionTypes = [
	{
		label: '-',
		value: ''
	},
	{
		label: 'STR',
		value: AddOptionType.str
	},
	{
		label: 'DEX',
		value: AddOptionType.dex
	},
	{
		label: 'INT',
		value: AddOptionType.int
	},
	{
		label: 'LUK',
		value: AddOptionType.luk
	},
	{
		label: 'STR, DEX',
		value: AddOptionType.str_dex
	},
	{
		label: 'STR, INT',
		value: AddOptionType.str_int
	},
	{
		label: 'STR, LUK',
		value: AddOptionType.str_luk
	},
	{
		label: 'DEX, INT',
		value: AddOptionType.dex_int
	},
	{
		label: 'DEX, LUK',
		value: AddOptionType.dex_luk
	},
	{
		label: 'INT, LUK',
		value: AddOptionType.int_luk
	},
	{
		label: '최대 HP',
		value: AddOptionType.maxHp
	},
	{
		label: '최대 MP',
		value: AddOptionType.maxMp
	},
	{
		label: '공격력',
		value: AddOptionType.attackPower
	},
	{
		label: '마력',
		value: AddOptionType.magicPower
	},
	{
		label: '방어력',
		value: AddOptionType.armor
	},
	{
		label: '이동속도',
		value: AddOptionType.speed
	},
	{
		label: '점프력',
		value: AddOptionType.jump
	},
	{
		label: '보스 몬스터 데미지',
		value: AddOptionType.bossDamage
	},
	{
		label: '데미지',
		value: AddOptionType.damage
	},
	{
		label: '올스탯',
		value: AddOptionType.allStat
	},
	{
		label: '착용 레벨 감소',
		value: AddOptionType.reqLevelDecrease
	}
] as const;

export const addOptionGrades = [1, 2, 3, 4, 5, 6, 7] as const;
