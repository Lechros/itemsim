import { deleteGearData } from '$lib/stores/gear-inventory';
import { SvelteSet } from 'svelte/reactivity';

export class Deleter {
	seqs = $state(new SvelteSet<number>());

	count = $derived(this.seqs.size);
	isEmpty = $derived(this.count === 0);

	add = (seq: number) => this.seqs.add(seq);
	has = (seq: number) => this.seqs.has(seq);
	delete = (seq: number) => this.seqs.delete(seq);
	clear = () => this.seqs.clear();

	deleteAll = async () => {
		await deleteGearData(...this.seqs.values());
		const count = this.count;
		this.clear();
		return count;
	};
}

export function createDeleter() {
	return new Deleter();
}
