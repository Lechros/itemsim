import type { GearTooltip } from '$lib/components/gear-tooltip';
import type { GearTooltip as GearTooltip2 } from '$lib/components/gear-tooltip2';
import type { ComponentProps } from 'svelte';

export type BatchAction = 'export' | 'delete';

/** 보기 모드: 'list' = 일반, 'slots' = 인벤토리 */
export type InventoryView = 'list' | 'slots';

export interface Settings {
	layout: 'grid' | 'list';
	columns: 'auto' | number;
	/** 보기 모드: 일반 | 인벤토리 */
	inventoryView: InventoryView;
	/** 인벤토리 모드일 때 슬롯 개수. 동적 설정 가능. */
	slotCount: number;
	/** 일괄 작업 메인 버튼 동작 (내보내기/삭제하기) */
	batchAction: BatchAction;
	tooltipVersion: '1' | '2';
	tooltip1Options: Required<
		Omit<ComponentProps<typeof GearTooltip>, 'gear' | 'loadExclusiveEquips'>
	>;
	tooltip2Options: Required<
		Omit<ComponentProps<typeof GearTooltip2>, 'gear' | 'loadSetItemName' | 'loadExclusiveEquips'>
	>;
}

export class SettingsStore implements Settings {
	layout = $state<Settings['layout']>('grid');
	columns = $state<Settings['columns']>(5);
	inventoryView = $state<Settings['inventoryView']>('list');
	slotCount = $state<Settings['slotCount']>(128);
	batchAction = $state<Settings['batchAction']>('export');
	tooltipVersion = $state<Settings['tooltipVersion']>('2');
	tooltip1Options = $state<Settings['tooltip1Options']>({ cannot: {}, incline: { combat: 0 } });
	tooltip2Options = $state<Settings['tooltip2Options']>({
		cannot: {},
		expand: false,
		incline: { combat: 0 }
	});

	constructor() {
		$effect.pre(() => {
			if (typeof localStorage !== 'undefined') {
				const layout = localStorage.getItem('gear-inventory-layout');
				const columns = localStorage.getItem('gear-inventory-columns');
				const inventoryView = localStorage.getItem('gear-inventory-view');
				const slotCount = localStorage.getItem('gear-inventory-slot-count');
				const tooltipVersion = localStorage.getItem('tooltip-version');
				const batchAction = localStorage.getItem('batch-action');
				const tooltip1Options = localStorage.getItem('tooltip1-options');
				const tooltip2Options = localStorage.getItem('tooltip2-options');
				if (layout) {
					this.layout = layout as 'grid' | 'list';
				}
				if (columns) {
					this.columns = columns === 'auto' ? 'auto' : Number(columns);
				}
				if (inventoryView === 'list' || inventoryView === 'slots') {
					this.inventoryView = inventoryView;
				}
				if (slotCount !== null) {
					const n = Number(slotCount);
					if (Number.isInteger(n) && n >= 1) {
						this.slotCount = n;
					}
				}
				if (tooltipVersion) {
					this.tooltipVersion = tooltipVersion as '1' | '2';
				}
				if (batchAction === 'export' || batchAction === 'delete') {
					this.batchAction = batchAction;
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
			}
		});
		$effect(() => {
			if (typeof localStorage !== 'undefined') {
				localStorage.setItem('gear-inventory-columns', this.columns.toString());
			}
		});
		$effect(() => {
			if (typeof localStorage !== 'undefined') {
				localStorage.setItem('gear-inventory-view', this.inventoryView);
			}
		});
		$effect(() => {
			if (typeof localStorage !== 'undefined') {
				localStorage.setItem('gear-inventory-slot-count', this.slotCount.toString());
			}
		});
		$effect(() => {
			if (typeof localStorage !== 'undefined') {
				localStorage.setItem('batch-action', this.batchAction);
			}
		});
		$effect(() => {
			if (typeof localStorage !== 'undefined') {
				localStorage.setItem('tooltip-version', this.tooltipVersion);
			}
		});
		$effect(() => {
			if (typeof localStorage !== 'undefined') {
				localStorage.setItem('tooltip1-options', JSON.stringify(this.tooltip1Options));
			}
		});
		$effect(() => {
			if (typeof localStorage !== 'undefined') {
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
