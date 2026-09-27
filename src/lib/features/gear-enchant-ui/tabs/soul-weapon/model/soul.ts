import type { SoulData, SoulOption } from '@malib/gear';
import type { SoulItemData } from '$lib/api';
import { getGearOptionGroupedStrings } from '$lib/utils';

export function getSoulDatas(data: SoulItemData): SoulData[] {
	const options = data.magnificent ? data.options : [data.option];
	return options.map((option) => ({
		name: data.name,
		magnificent: data.magnificent ?? false,
		option: { ...option }
	}));
}

export function getSoulOptionString(option: Partial<SoulOption>): string {
	return getGearOptionGroupedStrings(option)
		.map((summary) => summary.join(' '))
		.join(', ');
}
