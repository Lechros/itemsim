import { apiBaseUrl } from '$lib/shared/config';
import { create, indexedResolver, windowedFiniteBatchScheduler } from '@yornaath/batshit';

export function getItemRawIconOriginUrl(iconId: string) {
	return new URL(`/items/${iconId}/raw-icon/origin`, apiBaseUrl).toString();
}

export function getItemRawIconOriginsUrl(iconIds: string[]) {
	return new URL(`/items/raw-icon/origins?id=${iconIds.join(',')}`, apiBaseUrl).toString();
}

const originBatch = create({
	fetcher: async (iconIds: string[]) => {
		const url = getItemRawIconOriginsUrl(iconIds);
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

export async function getItemRawIconOrigin(iconId: string) {
	const url = getItemRawIconOriginUrl(iconId);
	const response = await fetch(url, { cache: 'force-cache' });
	return (await response.json()) as [number, number];
}

export async function getItemRawIconOriginBatched(iconId: string) {
	return originBatch.fetch(iconId) as Promise<[number, number]>;
}
