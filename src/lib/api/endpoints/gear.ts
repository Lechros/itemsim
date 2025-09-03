import type { GearData } from '@malib/gear';
import ky from 'ky';
import { env } from '$lib/config/env';

export function getGearSearchUrl(name: string, type?: number) {
	if (type) {
		return new URL(`/gears/search?query=${name}&type=${type}`, env.API_URL);
	} else {
		return new URL(`/gears/search?query=${name}`, env.API_URL);
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
	return new URL(`/gears/${id}`, env.API_URL);
}

export function getGearData(id: number) {
	return ky.get(getGearDataUrl(id)).json<GearData>();
}

export function getGearDatasUrl(ids: number[]) {
	return new URL(`/gears?id=${ids.join(',')}`, env.API_URL);
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
export function getGearIconUrl(iconId: string) {
	return new URL(`/gears/icon/${iconId}.png`, env.IMAGE_URL).toString();
}

export function getGearIconOriginUrl(iconId: string) {
	return new URL(`/gears/${iconId}/icon/origin`, env.API_URL).toString();
}

export async function getGearIconOrigin(iconId: string) {
	const url = getGearIconOriginUrl(iconId);
	const response = await fetch(url, { cache: 'force-cache' });
	return (await response.json()) as [number, number];
}
