import type { GearOption } from '@malib/gear';

type OptionType = keyof GearOption | 'str_dex_int_luk' | 'maxHp_maxMp' | 'attackPower_magicPower';

export function getOptionString(type: OptionType, value: number, plus: boolean) {
	const [label, valueStr] = getOptionStrings(type, value, plus);
	return `${label} ${valueStr}`;
}

export function getOptionStrings(type: OptionType, value: number, plus: boolean): [string, string] {
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
		case 'maxHp_maxMp':
			return ['최대 HP / 최대 MP', `${valueStr}`];
		case 'attackPower_magicPower':
			return ['공격력 / 마력', `${valueStr}`];
	}
}

export function convertGearOptionToSummaries(option: Partial<GearOption>) {
	const strings: string[] = [];
	let value: number;

	// str, dex, int, luk
	if ((value = equalValueOrZero(option, ['str', 'dex', 'int', 'luk'])) !== 0) {
		strings.push(getOptionString('str_dex_int_luk', value, true));
	} else {
		pushNonEmptyOptionStrings(strings, option, ['str', 'dex', 'int', 'luk']);
	}
	// maxHp, maxMp
	if ((value = equalValueOrZero(option, ['maxHp', 'maxMp'])) !== 0) {
		strings.push(getOptionString('maxHp_maxMp', value, true));
	} else {
		pushNonEmptyOptionStrings(strings, option, ['maxHp', 'maxMp']);
	}
	// maxHpRate, maxMpRate, maxDemonForce
	pushNonEmptyOptionStrings(strings, option, ['maxHpRate', 'maxMpRate', 'maxDemonForce']);
	// attackPower, magicPower
	if ((value = equalValueOrZero(option, ['attackPower', 'magicPower'])) !== 0) {
		strings.push(getOptionString('attackPower_magicPower', value, true));
	} else {
		pushNonEmptyOptionStrings(strings, option, ['attackPower', 'magicPower']);
	}
	// armor, speed, jump, knockback, bossDamage, ignoreMonsterArmor, damage, allStat
	pushNonEmptyOptionStrings(strings, option, [
		'armor',
		'speed',
		'jump',
		'bossDamage',
		'ignoreMonsterArmor',
		'damage',
		'allStat'
	]);

	return strings;
}

function equalValueOrZero(option: Partial<GearOption>, types: (keyof GearOption)[]) {
	const values = types.map((type) => option[type]);
	const value = values[0] ?? 0;
	if (value !== 0 && values.every((v) => v === value)) {
		return value;
	} else {
		return 0;
	}
}

function pushNonEmptyOptionStrings(
	strings: string[],
	option: Partial<GearOption>,
	types: (keyof GearOption)[]
) {
	for (const type of types) {
		const value = option[type] ?? 0;
		if (value !== 0) {
			strings.push(getOptionString(type, value, true));
		}
	}
}
