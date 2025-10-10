import type { SearchGearSummary } from '$lib/api';
import { SvelteMap, SvelteSet } from 'svelte/reactivity';

export class SearchSelectState {
	private _items = $state<Map<number, SearchGearSummary>>(new SvelteMap());

	ids = $state<Set<string>>(new SvelteSet());

	gears = $derived<ReadonlyArray<SearchGearSummary>>([...this._items.values()]);

	get items(): ReadonlyMap<number, SearchGearSummary> {
		return this._items;
	}

	get count(): number {
		return this._items.size;
	}

	add(item: SearchGearSummary) {
		this._items.set(item.id, item);
		this.ids.add(String(item.id));
	}

	delete(item: SearchGearSummary) {
		this._items.delete(item.id);
		this.ids.delete(String(item.id));
	}

	clear() {
		this._items.clear();
		this.ids.clear();
	}
}

export function createSearchSelectState() {
	return new SearchSelectState();
}
