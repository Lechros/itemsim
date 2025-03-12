import { apiBaseUrl } from '$lib/shared/config';

export function getGearIconOriginUrl(iconId: string) {
	return new URL(`/gears/${iconId}/icon/origin`, apiBaseUrl).toString();
}

export async function getGearIconOrigin(iconId: string) {
	const url = getGearIconOriginUrl(iconId);
	const response = await fetch(url, { cache: 'force-cache' });
	return (await response.json()) as [number, number];
}
