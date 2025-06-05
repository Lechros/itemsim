import { useGearQuery, type GearQuerySortTypes } from '$lib/features/gear-inventory';
import type { GearRow } from '$lib/shared/lib';
import { AbstractLiveQuery } from './AbstractLiveQuery.svelte';

export class GearLiveQuery extends AbstractLiveQuery<GearRow[]> {
	search = $state('');
	sort = $state<GearQuerySortTypes>('createdAtDesc');

	isLoadedAndEmpty = $derived(!this.isLoading && (this.value?.length ?? 0) === 0);
	isLoadedAndNotEmpty = $derived(!this.isLoading && (this.value?.length ?? 0) > 0);

	protected getLiveQuery() {
		return useGearQuery({ filter: { name: this.search }, sort: this.sort });
	}
}

export function createGearLiveQuery() {
	return new GearLiveQuery();
}
