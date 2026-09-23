import type { SoulData, SoulOption } from '@malib/gear';
import soulData from './soul-data.json';
import { getGearOptionGroupedStrings } from '$lib/utils';

const souls: Record<number, SoulRawData> = soulData;

export type MagnificentOptionType =
	| 'attackPower'
	| 'magicPower'
	| 'allStat'
	| 'maxHp'
	| 'criticalRate'
	| 'bossDamage'
	| 'ignoreMonsterArmor';

interface SoulRawData {
	name: string;
	magnificent?: boolean;
	option?: Partial<SoulOption>;
	options?: Partial<Record<MagnificentOptionType, Partial<SoulOption>>>;
}

export interface SoulSummary {
	id: number;
	name: string;
	magnificent?: boolean;
}

export function getSoulSummaries(): SoulSummary[] {
	return Object.entries(souls).map(([id, data]) => ({
		id: Number(id),
		name: data.name,
		magnificent: data.magnificent
	}));
}

export function getNormalSoulData(id: number): SoulData {
	const data = souls[id];
	if (!data) throw new Error('잘못된 소울 ID입니다.');
	if (data.magnificent) throw new Error('일반 소울이 아닙니다.');

	return {
		name: data.name,
		option: data.option!
	};
}

export function getMagnificentSoulDatas(id: number): SoulData[] {
	const data = souls[id];
	if (!data) throw new Error('잘못된 소울 ID입니다.');
	if (!data.magnificent) throw new Error('위대한 소울이 아닙니다.');

	return Object.entries(data.options!).map(([, option]) => ({
		name: data.name,
		option: {
			...option
		}
	}));
}

export function getSoulOptionString(option: Partial<SoulOption>): string {
	return getGearOptionGroupedStrings(option)[0].join(' ');
}
