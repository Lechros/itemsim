import { apiBaseUrl } from '$lib/shared/config';

export function getGearSearchUrl(name: string) {
	return new URL(`/gears/search?query=${name}`, apiBaseUrl);
}

export function getGearDataUrl(id: number) {
	return new URL(`/gears/${id}`, apiBaseUrl);
}

export type SearchGearResponse = {
	id: number;
	name: string;
	icon: string;
	highlight: string;
}[];
