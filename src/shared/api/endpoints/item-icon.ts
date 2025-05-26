import { imageBaseUrl } from '$lib/shared/config';

export function getItemRawIconUrl(iconId: string) {
	return new URL(`/items/iconRaw/${iconId}.png`, imageBaseUrl).toString();
}
