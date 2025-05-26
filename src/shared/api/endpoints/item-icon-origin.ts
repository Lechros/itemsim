import { apiBaseUrl } from '$lib/shared/config';

export function getItemRawIconOriginUrl(iconId: string) {
	return new URL(`/items/${iconId}/raw-icon/origin`, apiBaseUrl).toString();
}

export async function getItemRawIconOrigin(iconId: string) {
	const url = getItemRawIconOriginUrl(iconId);
	const response = await fetch(url, { cache: 'force-cache' });
	return (await response.json()) as [number, number];
}
