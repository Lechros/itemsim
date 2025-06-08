import type { GearOption } from '@malib/gear';

export function getSingleGearOptionStrings(
	type: keyof GearOption,
	value: number,
	plus: boolean
): [string, string] {
	return getSingleGearOptionStringsInternal(type, value, plus);
}

type OptionType =
	| keyof GearOption
	| 'str_dex_int_luk'
	| 'strRate_dexRate_intRate_lukRate'
	| 'maxHp_maxMp'
	| 'maxHpRate_maxMpRate'
	| 'attackPower_magicPower'
	| 'attackPowerRate_magicPowerRate';

function getSingleGearOptionStringsInternal(
	type: OptionType,
	value: number,
	plus: boolean
): [string, string] {
	const valueStr = value >= 0 && plus ? `+${value}` : `${value}`;
	switch (type) {
		case 'str':
			return ['STR', valueStr];
		case 'dex':
			return ['DEX', valueStr];
		case 'int':
			return ['INT', valueStr];
		case 'luk':
			return ['LUK', valueStr];
		case 'strRate':
			return ['STR', `${valueStr}%`];
		case 'dexRate':
			return ['DEX', `${valueStr}%`];
		case 'intRate':
			return ['INT', `${valueStr}%`];
		case 'lukRate':
			return ['LUK', `${valueStr}%`];
		case 'maxHp':
			return ['최대 HP', valueStr];
		case 'maxMp':
			return ['최대 MP', valueStr];
		case 'maxHpRate':
			return ['최대 HP', `${valueStr}%`];
		case 'maxMpRate':
			return ['최대 MP', `${valueStr}%`];
		case 'maxDemonForce':
			return ['최대 DF', valueStr];
		case 'attackPower':
			return ['공격력', valueStr];
		case 'magicPower':
			return ['마력', valueStr];
		case 'attackPowerRate':
			return ['공격력', `${valueStr}%`];
		case 'magicPowerRate':
			return ['마력', `${valueStr}%`];
		case 'armor':
			return ['방어력', valueStr];
		case 'armorRate':
			return ['방어력', `${valueStr}%`];
		case 'speed':
			return ['이동속도', valueStr];
		case 'jump':
			return ['점프력', valueStr];
		case 'bossDamage':
			return ['보스 몬스터 데미지', `${valueStr}%`];
		case 'normalDamage':
			return ['일반 몬스터 데미지', `${valueStr}%`];
		case 'ignoreMonsterArmor':
			return ['몬스터 방어율 무시', `${valueStr}%`];
		case 'allStat':
			return ['올스탯', `${valueStr}%`];
		case 'damage':
			return ['데미지', `${valueStr}%`];
		case 'reqLevelDecrease':
			return ['착용 레벨 감소', `${valueStr}`];
		case 'criticalRate':
			return ['크리티컬 확률', `${valueStr}%`];
		case 'criticalDamage':
			return ['크리티컬 데미지', `${valueStr}%`];
		case 'cooltimeReduce':
			return ['재사용 대기시간 감소', `${valueStr}초`];
		case 'strLv':
			return ['캐릭터 기준 9레벨 당 STR', `${valueStr}`];
		case 'dexLv':
			return ['캐릭터 기준 9레벨 당 DEX', `${valueStr}`];
		case 'intLv':
			return ['캐릭터 기준 9레벨 당 INT', `${valueStr}`];
		case 'lukLv':
			return ['캐릭터 기준 9레벨 당 LUK', `${valueStr}`];
		// Custom
		case 'str_dex_int_luk':
			return ['올스탯', `${valueStr}`];
		case 'strRate_dexRate_intRate_lukRate':
			return ['올스탯', `${valueStr}%`];
		case 'maxHp_maxMp':
			return ['최대 HP / 최대 MP', `${valueStr}`];
		case 'maxHpRate_maxMpRate':
			return ['최대 HP / 최대 MP', `${valueStr}%`];
		case 'attackPower_magicPower':
			return ['공격력 / 마력', `${valueStr}`];
		case 'attackPowerRate_magicPowerRate':
			return ['공격력 / 마력', `${valueStr}%`];
	}
}

export function getGearOptionStrings(option: Partial<GearOption>, plus: boolean = true) {
	const strings: [string, string][] = [];
	for (const prop of props) {
		if (option[prop]) {
			const summary = getSingleGearOptionStrings(prop, option[prop], plus);
			strings.push(summary);
		}
	}
	return strings;
}

export function getGearOptionGroupedStrings(option: Partial<GearOption>, plus: boolean = true) {
	const strings: [string, string][] = [];

	for (const group of groups) {
		const keys = group[0];
		const groupProp = group[1];
		if (groupProp && everyValueEquals(option, keys)) {
			const summary = getSingleGearOptionStringsInternal(groupProp, option[keys[0]]!, plus);
			strings.push(summary);
		} else {
			for (const key of keys) {
				if (option[key]) {
					const summary = getSingleGearOptionStrings(key, option[key]!, plus);
					strings.push(summary);
				}
			}
		}
	}
	return strings;
}

function everyValueEquals(option: Partial<GearOption>, keys: readonly (keyof GearOption)[]) {
	const firstValue = option[keys[0]];
	if (!firstValue) {
		return false;
	}
	for (let i = 1; i < keys.length; i++) {
		if (option[keys[i]] !== firstValue) {
			return false;
		}
	}
	return true;
}

const props = [
	'str',
	'dex',
	'int',
	'luk',
	'strRate',
	'dexRate',
	'intRate',
	'lukRate',
	'maxHp',
	'maxMp',
	'maxHpRate',
	'maxMpRate',
	'maxDemonForce',
	'attackPower',
	'magicPower',
	'attackPowerRate',
	'magicPowerRate',
	'armor',
	'armorRate',
	'speed',
	'jump',
	'bossDamage',
	'normalDamage',
	'ignoreMonsterArmor',
	'allStat',
	'damage',
	'reqLevelDecrease',
	'criticalRate',
	'criticalDamage',
	'cooltimeReduce',
	'strLv',
	'dexLv',
	'intLv',
	'lukLv'
] as const;

const groups = [
	[['str', 'dex', 'int', 'luk'], 'str_dex_int_luk'],
	[['strRate', 'dexRate', 'intRate', 'lukRate'], 'strRate_dexRate_intRate_lukRate'],
	[['maxHp', 'maxMp'], 'maxHp_maxMp'],
	[['maxHpRate', 'maxMpRate'], 'maxHpRate_maxMpRate'],
	[['maxDemonForce']],
	[['attackPower', 'magicPower'], 'attackPower_magicPower'],
	[['attackPowerRate', 'magicPowerRate'], 'attackPowerRate_magicPowerRate'],
	[
		[
			'armor',
			'armorRate',
			'speed',
			'jump',
			'bossDamage',
			'normalDamage',
			'ignoreMonsterArmor',
			'allStat',
			'damage',
			'reqLevelDecrease',
			'criticalRate',
			'criticalDamage',
			'cooltimeReduce',
			'strLv',
			'dexLv',
			'intLv',
			'lukLv'
		]
	]
] as const;
