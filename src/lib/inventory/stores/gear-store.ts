import {
	BonusStatType,
	Gear,
	gearToPlain,
	plainToGear,
	type BonusStatGrade,
	type GearLike
} from '@malib/gear';
import { writable } from 'svelte/store';
import { persisted } from 'svelte-local-storage-store';

export type GearInventory = (GearInfo | undefined)[];

export type GearMeta = {
	bonus: {
		type: BonusStatType | -1;
		grade: BonusStatGrade | 0;
	}[];
};

export type GearInfo = {
	gear: Gear;
	meta: GearMeta;
};

export type GearInfoLike = {
	gear: GearLike;
	meta: GearMeta;
};

const createGearInfo = (gear: Gear): GearInfo => {
	return {
		gear,
		meta: createGearMeta()
	};
};

export const createGearMeta = (): GearMeta => {
	return {
		bonus: [
			{ type: -1, grade: 0 },
			{ type: -1, grade: 0 },
			{ type: -1, grade: 0 },
			{ type: -1, grade: 0 }
		]
	};
};

const createInventory = (): GearInventory => {
	return Array.from({ length: MAX_INV }, () => undefined);
};

const inventorySerializer = {
	stringify: (inventory: GearInventory): string => {
		return JSON.stringify(
			inventory.map((value) =>
				value
					? {
							gear: gearToPlain(value.gear),
							meta: value.meta
					  }
					: undefined
			)
		);
	},
	parse: (data: string): GearInventory => {
		return JSON.parse(data).map((value: GearInfoLike) =>
			value ? { gear: plainToGear(value.gear), meta: value.meta } : undefined
		);
	}
};

const MAX_INV = 32;
const SELECTED_DEFAULT = -1;

const createStore = () => {
	let _inventory: GearInventory = [];
	const inventory = persisted('gear-inventory-v2', createInventory(), {
		serializer: inventorySerializer
	});
	let _selected = SELECTED_DEFAULT;
	const selected = writable(_selected);
	let _gear: Gear | undefined = undefined;
	const gear = writable<Gear | undefined>(_gear);
	let _meta: GearMeta | undefined = undefined;
	const meta = writable<GearMeta | undefined>(_meta);

	const inventory_addGear = (gear: Gear) => {
		let addIndex = -1;
		inventory.update((inv) => {
			for (let i = 0; i < MAX_INV; i++) {
				if (inv[i] === undefined) {
					inv[i] = createGearInfo(gear);
					addIndex = i;
					break;
				}
			}
			return inv;
		});
		return addIndex;
	};
	const inventory_add = (info: GearInfo) => {
		let addIndex = -1;
		inventory.update((inv) => {
			for (let i = 0; i < MAX_INV; i++) {
				if (inv[i] === undefined) {
					inv[i] = info;
					addIndex = i;
					break;
				}
			}
			return inv;
		});
		return addIndex;
	};
	const inventory_putGear = (gear: Gear, index: number) => {
		let before: Gear | undefined;
		inventory.update((inv) => {
			before = inv[index]?.gear;
			inv[index] = createGearInfo(gear);
			return inv;
		});
		return before;
	};
	const inventory_put = (info: GearInfo, index: number) => {
		let before: GearInfo | undefined;
		inventory.update((inv) => {
			before = inv[index];
			inv[index] = info;
			return inv;
		});
		return before;
	};
	const inventory_remove = (index: number) => {
		let removed: GearInfo | undefined;
		inventory.update((inv) => {
			removed = inv[index];
			if (inv[index]) {
				inv[index] = undefined;
			}
			if (_selected === index) {
				selected.set(SELECTED_DEFAULT);
			}
			return inv;
		});
		return removed;
	};
	const inventory_swap = (index1: number, index2: number) => {
		if (index1 !== index2 && 0 <= index1 && index1 < MAX_INV && 0 <= index2 && index2 < MAX_INV) {
			inventory.update((inv) => {
				const temp = inv[index1];
				inv[index1] = inv[index2];
				inv[index2] = temp;
				return inv;
			});
			return true;
		}
		return false;
	};
	const inventory_select = (index: number) => {
		if (_inventory[index]) {
			selected.set(index);
		}
		return _selected;
	};
	const inventory_deselect = () => {
		selected.set(SELECTED_DEFAULT);
		return _selected;
	};
	const meta_reset = () => {
		if (_gear && _meta) {
			meta.set(createGearMeta());
		}
	};

	inventory.subscribe((newInv) => (_inventory = newInv));
	selected.subscribe((newSel) => {
		if (newSel === -1 || _inventory[newSel] !== undefined) {
			_selected = newSel;
			gear.set(_inventory[newSel]?.gear);
			meta.set(_inventory[newSel]?.meta);
		}
	});
	gear.subscribe((newGear) => {
		_gear = newGear;
		if (newGear) {
			if (_inventory[_selected] === undefined) {
				_inventory[_selected] = createGearInfo(newGear);
			} else {
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				_inventory[_selected]!.gear = newGear;
			}
		}
		inventory.update((_) => _);
	});
	meta.subscribe((newMeta) => {
		_meta = newMeta;
		if (newMeta && _inventory[_selected] !== undefined) {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			_inventory[_selected]!.meta = newMeta;
		}
		inventory.update((_) => _);
	});

	return {
		inventory: {
			subscribe: inventory.subscribe,
			set: inventory.set,
			update: inventory.update,
			addGear: inventory_addGear,
			add: inventory_add,
			putGear: inventory_putGear,
			put: inventory_put,
			remove: inventory_remove,
			swap: inventory_swap,
			select: inventory_select,
			deselect: inventory_deselect
		},
		selected: {
			subscribe: selected.subscribe
		},
		gear,
		meta: {
			subscribe: meta.subscribe,
			set: meta.set,
			update: meta.update,
			reset: meta_reset
		}
	};
};

export const { inventory, selected, gear, meta } = createStore();
