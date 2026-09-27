import type { SoulOption } from '@malib/gear';
import ky from 'ky';
import { env } from '$lib/config/env';
import { join } from '$lib/api/url';

export interface SearchSoulSummary {
	id: number;
	name: string;
	highlight: string;
}

export type SoulItemData = {
	name: string;
} & (
	| { magnificent?: false; option: Partial<SoulOption> }
	| { magnificent: true; options: Partial<SoulOption>[] }
);

export function getSoulSearchUrl(name: string, magnificent?: boolean) {
	const filter = magnificent === undefined ? '' : `&magnificent=${magnificent}`;
	return join(env.API_URL, `/souls/search?query=${encodeURIComponent(name)}${filter}`);
}

export async function getSoulSearch(name: string, magnificent?: boolean, signal?: AbortSignal) {
	name = name.trim();
	if (!name) {
		return [];
	}
	return ky.get(getSoulSearchUrl(name, magnificent), { signal }).json<SearchSoulSummary[]>();
}

export function getSoulDataUrl(id: number) {
	return join(env.API_URL, `/souls/${id}`);
}

export function getSoulData(id: number, signal?: AbortSignal) {
	return ky.get(getSoulDataUrl(id), { signal }).json<SoulItemData>();
}
