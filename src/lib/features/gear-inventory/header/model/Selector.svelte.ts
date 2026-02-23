import { deleteGearData } from '$lib/stores/gear-inventory';
import { removeSeqsFromSlots } from '$lib/stores/slot-layout';
import { SvelteSet } from 'svelte/reactivity';

export class Selector {
	seqs = $state(new SvelteSet<number>());

	count = $derived(this.seqs.size);
	isEmpty = $derived(this.count === 0);

	add = (seq: number) => this.seqs.add(seq);
	has = (seq: number) => this.seqs.has(seq);
	delete = (seq: number) => this.seqs.delete(seq);
	clear = () => this.seqs.clear();

	deleteSelected = async () => {
		const seqs = [...this.seqs.values()];
		await deleteGearData(...seqs);
		await removeSeqsFromSlots(seqs);
		const count = this.count;
		this.clear();
		return count;
	};
}

export function createSelector() {
	return new Selector();
}
