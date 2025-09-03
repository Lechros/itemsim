import { env } from '$lib/config/env';

export function getItemRawIconUrl(iconId: string) {
	return new URL(`/items/iconRaw/${iconId}.png`, env.IMAGE_URL).toString();
}
export function getItemRawIconOriginUrl(iconId: string) {
	return new URL(`/items/${iconId}/raw-icon/origin`, env.API_URL).toString();
}

export async function getItemRawIconOrigin(iconId: string) {
	const url = getItemRawIconOriginUrl(iconId);
	const response = await fetch(url, { cache: 'force-cache' });
	return (await response.json()) as [number, number];
}
