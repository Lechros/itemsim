import type { GearOption } from '@malib/gear';

import { getOptionStrings } from '$lib/entities/gear-tooltip2';

export function getGearOptionSummaries(option: Partial<GearOption>, plus: boolean = true) {
	const strings: [string, string][] = [];
	const props = [
		'str',
		'dex',
		'int',
		'luk',
		'maxHp',
		'maxMp',
		'maxHpRate',
		'maxMpRate',
		'maxDemonForce',
		'attackPower',
		'magicPower',
		'armor',
		'speed',
		'jump',
		'bossDamage',
		'ignoreMonsterArmor',
		'damage',
		'allStat'
	] as const;
	for (const prop of props) {
		if (option[prop]) {
			const summary = getOptionStrings(prop, option[prop]!, plus);
			strings.push(summary);
		}
	}
	return strings;
}
