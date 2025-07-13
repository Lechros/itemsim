import { apiBaseUrl } from '$lib/shared/config';
import { create, indexedResolver, windowedFiniteBatchScheduler } from '@yornaath/batshit';

export function getGearIconOriginUrl(iconId: string) {
	return new URL(`/gears/${iconId}/icon/origin`, apiBaseUrl).toString();
}

export function getGearIconOriginsUrl(iconIds: string[]) {
	return new URL(`/gears/icon/origins?id=${iconIds.join(',')}`, apiBaseUrl).toString();
}

const originBatch = create({
	fetcher: async (iconIds: string[]) => {
		const url = getGearIconOriginsUrl(iconIds);
		const response = await fetch(url, { cache: 'force-cache' });
		const origins = (await response.json()) as [number, number][];
		return Object.fromEntries(iconIds.map((id, index) => [id, origins[index]]));
	},
	resolver: indexedResolver(),
	scheduler: windowedFiniteBatchScheduler({
		windowMs: 10,
		maxBatchSize: 100
	})
});

export async function getGearIconOrigin(iconId: string) {
	const url = getGearIconOriginUrl(iconId);
	const response = await fetch(url, { cache: 'force-cache' });
	return (await response.json()) as [number, number];
}

export async function getGearIconOriginBatched(iconId: string) {
	return originBatch.fetch(iconId) as Promise<[number, number]>;
}
