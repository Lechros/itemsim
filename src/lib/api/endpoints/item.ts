import { env } from '$lib/config/env';
import { join } from '$lib/api/url';

export function getItemRawIconUrl(iconId: string) {
	return join(env.IMAGE_URL, `/items/iconRaw/${iconId}.png`);
}
export function getItemRawIconOriginUrl(iconId: string) {
	return join(env.API_URL, `/items/${iconId}/raw-icon/origin`);
}

export async function getItemRawIconOrigin(iconId: string) {
	const url = getItemRawIconOriginUrl(iconId);
	const response = await fetch(url, { cache: 'force-cache' });
	return (await response.json()) as [number, number];
}
