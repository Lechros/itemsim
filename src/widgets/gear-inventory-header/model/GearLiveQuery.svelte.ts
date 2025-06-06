import { useGearQuery, type GearQuerySortTypes } from '$lib/features/gear-inventory';
import type { GearRow } from '$lib/shared/lib';
import { AbstractLiveQuery } from './AbstractLiveQuery.svelte';

export class GearLiveQuery extends AbstractLiveQuery<GearRow[]> {
	search = $state('');
	sort = $state<GearQuerySortTypes>('createdAtDesc');

	constructor() {
		super();
		if (typeof localStorage !== 'undefined') {
			const sort = localStorage.getItem('gear-inventory-sort');
			if (sort) {
				this.sort = sort as GearQuerySortTypes;
			}
		}
		$effect(() => {
			if (typeof localStorage !== 'undefined') {
				localStorage.setItem('gear-inventory-sort', this.sort);
			}
		});
	}

	isLoadedAndEmpty = $derived(!this.isLoading && (this.value?.length ?? 0) === 0);
	isLoadedAndNotEmpty = $derived(!this.isLoading && (this.value?.length ?? 0) > 0);

	protected getLiveQuery() {
		return useGearQuery({ filter: { name: this.search }, sort: this.sort });
	}
}

export function createGearLiveQuery() {
	return new GearLiveQuery();
}
