import { useGearDataCount } from '$lib/stores/gear-inventory';
import { AbstractLiveQuery } from './AbstractLiveQuery.svelte.js';

export class GearCountLiveQuery extends AbstractLiveQuery<number> {
	protected getLiveQuery() {
		return useGearDataCount();
	}
}

export function createGearCountLiveQuery() {
	return new GearCountLiveQuery();
}
