import { imageBaseUrl } from '$lib/shared/config';

export function getGearIconUrl(iconId: string) {
	return new URL(`/gears/icon/${iconId}.png`, imageBaseUrl).toString();
}
