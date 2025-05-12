import type { GearOption } from '@malib/gear';

export function convertGearOptionToSummaries(option: Partial<GearOption>) {
	const strings: string[] = [];
	let value: number;

	// str, dex, int, luk
	if ((value = equalValueOrZero(option, ['str', 'dex', 'int', 'luk'])) !== 0) {
		strings.push(`올스탯 : +${value}`);
	} else {
		pushNonEmptyOptionStrings(strings, option, ['str', 'dex', 'int', 'luk']);
	}
	// maxHp, maxMp
	if ((value = equalValueOrZero(option, ['maxHp', 'maxMp'])) !== 0) {
		strings.push(`최대 HP / 최대 MP : +${value}`);
	} else {
		pushNonEmptyOptionStrings(strings, option, ['maxHp', 'maxMp']);
	}
	// maxHpRate, maxMpRate, maxDemonForce
	pushNonEmptyOptionStrings(strings, option, ['maxHpRate', 'maxMpRate', 'maxDemonForce']);
	// attackPower, magicPower
	if ((value = equalValueOrZero(option, ['attackPower', 'magicPower'])) !== 0) {
		strings.push(`공격력 / 마력 : +${option.attackPower}`);
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
			strings.push(getGearOptionString(type, value));
		}
	}
}

export function getGearOptionString(type: keyof GearOption, value: number) {
	if (value !== 0) {
		switch (type) {
			case 'str':
				return `STR +${value}`;
			case 'dex':
				return `DEX +${value}`;
			case 'int':
				return `INT +${value}`;
			case 'luk':
				return `LUK +${value}`;
			case 'maxHp':
				return `최대 HP +${value}`;
			case 'maxMp':
				return `최대 MP +${value}`;
			case 'maxHpRate':
				return `최대 HP +${value}%`;
			case 'maxMpRate':
				return `최대 MP +${value}%`;
			case 'maxDemonForce':
				return `MaxDF +${value}`;
			case 'attackPower':
				return `공격력 +${value}`;
			case 'magicPower':
				return `마력 +${value}`;
			case 'armor':
				return `방어력 +${value}`;
			case 'speed':
				return `이동속도 +${value}`;
			case 'jump':
				return `점프력 +${value}`;
			case 'bossDamage':
				return `보스 몬스터 데미지 +${value}%`;
			case 'ignoreMonsterArmor':
				return `몬스터 방어율 무시 +${value}%`;
			case 'damage':
				return `데미지 +${value}%`;
			case 'allStat':
				return `올스탯 +${value}%`;
		}
	}
	return '';
}
