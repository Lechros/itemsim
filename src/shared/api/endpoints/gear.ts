import { apiBaseUrl } from '$lib/shared/config';
import type { GearData } from '@malib/gear';
import ky from 'ky';

export function getGearSearchUrl(name: string) {
	return new URL(`/gears/search?query=${name}`, apiBaseUrl);
}

export async function getGearSearch(name: string) {
	name = name.trim();
	if (!name) {
		return [];
	}
	return await ky.get(getGearSearchUrl(name)).json<SearchGearSummary[]>();
}

export function getGearDataUrl(id: number) {
	return new URL(`/gears/${id}`, apiBaseUrl);
}

export function getGearData(id: number) {
	return ky.get(getGearDataUrl(id)).json<GearData>();
}

export function getGearDatasUrl(ids: number[]) {
	return new URL(`/gears?id=${ids.join(',')}`, apiBaseUrl);
}

export async function getGearDatas(ids: number[]) {
	if (ids.length === 0) {
		return [];
	}
	return await ky.get(getGearDatasUrl(ids)).json<GearData[]>();
}

export interface SearchGearSummary {
	id: number;
	name: string;
	icon: string;
	highlight: string;
}
