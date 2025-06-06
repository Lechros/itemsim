export class LayoutStore {
	layout = $state<'grid' | 'list'>('grid');
	columns = $state<'auto' | number>('auto');

	constructor() {
		$effect.pre(() => {
			if (typeof localStorage !== 'undefined') {
				const layout = localStorage.getItem('gear-inventory-layout');
				const columns = localStorage.getItem('gear-inventory-columns');
				if (layout) {
					this.layout = layout as 'grid' | 'list';
				}
				if (columns) {
					this.columns = columns === 'auto' ? 'auto' : Number(columns);
				}
			}
		});
		$effect(() => {
			if (typeof localStorage !== 'undefined') {
				localStorage.setItem('gear-inventory-layout', this.layout);
				localStorage.setItem('gear-inventory-columns', this.columns.toString());
			}
		});
	}
}

export function createLayoutStore() {
	return new LayoutStore();
}
