import type { SlotLayoutEntry } from '$lib/stores/slot-layout';
import { useSlotLayout } from '$lib/stores/slot-layout';
import { AbstractLiveQuery } from './AbstractLiveQuery.svelte.js';

export class SlotLayoutLiveQuery extends AbstractLiveQuery<SlotLayoutEntry[]> {
	constructor(private getSlotCount: () => number) {
		super();
	}

	protected getLiveQuery() {
		return useSlotLayout(this.getSlotCount());
	}
}

export function createSlotLayoutLiveQuery(getSlotCount: () => number) {
	return new SlotLayoutLiveQuery(getSlotCount);
}
