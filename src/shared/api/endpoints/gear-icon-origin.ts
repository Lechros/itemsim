import { apiBaseUrl } from '$lib/shared/config';

export function getGearIconOriginUrl(iconId: string) {
	return new URL(`/gears/${iconId}/icon/origin`, apiBaseUrl).toString();
}
