import { migrate, type GearData } from '@malib/gear';
import ky from 'ky';
import { env } from '$lib/config/env';
import { GEAR_VERSION } from '$lib/config/constant';
import { join } from '$lib/api/url';

export interface SearchGearSummary {
	id: number;
	name: string;
	icon: string;
	highlight: string;
}

export function getGearSearchUrl(name: string, type?: number) {
	if (type) {
		return join(env.API_URL, `/gears/search?query=${encodeURIComponent(name)}&type=${type}`);
	} else {
		return join(env.API_URL, `/gears/search?query=${encodeURIComponent(name)}`);
	}
}

export async function getGearSearch(name: string, type?: number) {
	name = name.trim();
	if (!name) {
		return [];
	}
	return await ky.get(getGearSearchUrl(name, type)).json<SearchGearSummary[]>();
}

export function getGearDataUrl(id: number) {
	return join(env.API_URL, `/gears/${id}`);
}

export function getGearData(id: number, signal?: AbortSignal) {
	return ky
		.get(getGearDataUrl(id), { signal })
		.json<object>()
		.then((data) => migrate(data as GearData, GEAR_VERSION) as GearData);
}

export function getGearDatasUrl(ids: number[]) {
	return join(env.API_URL, `/gears?id=${ids.join(',')}`);
}

export async function getGearDatas(ids: number[]) {
	if (ids.length === 0) {
		return [];
	}
	return (await ky.get(getGearDatasUrl(ids)).json<object[]>()).map(
		(data) => migrate(data as GearData, GEAR_VERSION) as GearData
	);
}

export function getGearHashUrl(id: number) {
	return join(env.API_URL, `/gears/${id}/hash`);
}

export async function getGearHash(id: number, signal?: AbortSignal) {
	const url = getGearHashUrl(id);
	const response = await fetch(url, { signal });
	return (await response.json()) as string;
}

export function getGearHashesUrl(ids: number[]) {
	return join(env.API_URL, `/gears/hashes?id=${ids.join(',')}`);
}

export async function getGearHashes(ids: number[]) {
	const url = getGearHashesUrl(ids);
	const response = await fetch(url);
	return (await response.json()) as string[];
}

export function getGearIconUrl(iconId: string) {
	return join(env.IMAGE_URL, `/gears/icon/${iconId}.png`);
}

export function getGearIconOriginUrl(iconId: string) {
	return join(env.API_URL, `/gears/${iconId}/icon/origin`);
}

export async function getGearIconOrigin(iconId: string) {
	const url = getGearIconOriginUrl(iconId);
	const response = await fetch(url, { cache: 'force-cache' });
	return (await response.json()) as [number, number];
}
