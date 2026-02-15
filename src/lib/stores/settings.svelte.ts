import type { GearTooltip } from '$lib/components/gear-tooltip';
import type { GearTooltip as GearTooltip2 } from '$lib/components/gear-tooltip2';
import type { ComponentProps } from 'svelte';

export interface Settings {
	layout: 'grid' | 'list';
	columns: 'auto' | number;
	tooltipVersion: '1' | '2';
	tooltip1Options: Omit<ComponentProps<typeof GearTooltip>, 'gear' | 'loadExclusiveEquips'>;
	tooltip2Options: Omit<
		ComponentProps<typeof GearTooltip2>,
		'gear' | 'loadSetItemName' | 'loadExclusiveEquips'
	>;
}

export class SettingsStore implements Settings {
	layout = $state<Settings['layout']>('grid');
	columns = $state<Settings['columns']>('auto');
	tooltipVersion = $state<Settings['tooltipVersion']>('2');
	tooltip1Options = $state<Settings['tooltip1Options']>({ incline: { combat: 0 } });
	tooltip2Options = $state<Settings['tooltip2Options']>({ incline: { combat: 0 } });

	constructor() {
		$effect.pre(() => {
			if (typeof localStorage !== 'undefined') {
				const layout = localStorage.getItem('gear-inventory-layout');
				const columns = localStorage.getItem('gear-inventory-columns');
				const tooltipVersion = localStorage.getItem('tooltip-version');
				const tooltip1Options = localStorage.getItem('tooltip1-options');
				const tooltip2Options = localStorage.getItem('tooltip2-options');
				if (layout) {
					this.layout = layout as 'grid' | 'list';
				}
				if (columns) {
					this.columns = columns === 'auto' ? 'auto' : Number(columns);
				}
				if (tooltipVersion) {
					this.tooltipVersion = tooltipVersion as '1' | '2';
				}
				if (tooltip1Options) {
					this.tooltip1Options = JSON.parse(tooltip1Options);
				}
				if (tooltip2Options) {
					this.tooltip2Options = JSON.parse(tooltip2Options);
				}
			}
		});
		$effect(() => {
			if (typeof localStorage !== 'undefined') {
				localStorage.setItem('gear-inventory-layout', this.layout);
				localStorage.setItem('gear-inventory-columns', this.columns.toString());
				localStorage.setItem('tooltip-version', this.tooltipVersion);
				localStorage.setItem('tooltip1-options', JSON.stringify(this.tooltip1Options));
				localStorage.setItem('tooltip2-options', JSON.stringify(this.tooltip2Options));
			}
		});
	}
}

let instance: SettingsStore | null = null;

export function getSettingsStore(): SettingsStore {
	if (typeof window === 'undefined') {
		return new SettingsStore();
	}
	if (!instance) {
		instance = new SettingsStore();
	}
	return instance;
}

export function createSettingsStore() {
	return getSettingsStore();
}
