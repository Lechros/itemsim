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

export type GearMeta = {
	bonus: {
		type: BonusStatType | -1;
		grade: BonusStatGrade | 0;
	}[];
};

export type GearSlot = {
	gear: Gear;
	meta: GearMeta;
};

export type GearSlotLike = {
	gear: GearLike;
	meta: GearMeta;
};

const createGearSlot = (gear: Gear): GearSlot => {
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

const createInventory = (): (GearSlot | undefined)[] => {
	return Array.from({ length: MAX_INV }, () => undefined);
};

const inventorySerializer = {
	stringify: (inventory: (GearSlot | undefined)[]): string => {
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
	parse: (data: string): (GearSlot | undefined)[] => {
		return JSON.parse(data).map((value: GearSlotLike) =>
			value ? { gear: plainToGear(value.gear), meta: value.meta } : undefined
		);
	}
};

const MAX_INV = 32;
const LASTADD_DEFAULT = -1;
const SELECTED_DEFAULT = -1;

const createStore = () => {
	let _inventory: (GearSlot | undefined)[] = [];
	const inventory = persisted('gear-inventory-v2', createInventory(), {
		serializer: inventorySerializer
	});
	let _lastAdd = LASTADD_DEFAULT;
	const lastAdd = writable(_lastAdd);
	let _selected = SELECTED_DEFAULT;
	const selected = writable(_selected);
	let _gear: Gear | undefined = undefined;
	const gear = writable<Gear | undefined>(_gear);
	let _meta: GearMeta | undefined = undefined;
	const meta = writable<GearMeta | undefined>(_meta);

	const inventory_add = (gear: Gear) => {
		inventory.update((inv) => {
			for (let i = 0; i < MAX_INV; i++) {
				if (inv[i] === undefined) {
					inv[i] = createGearSlot(gear);
					lastAdd.set(i);
					break;
				}
			}
			return inv;
		});
	};
	const inventory_addSlot = (slot: GearSlot) => {
		inventory.update((inv) => {
			for (let i = 0; i < MAX_INV; i++) {
				if (inv[i] === undefined) {
					inv[i] = slot;
					lastAdd.set(i);
					break;
				}
			}
			return inv;
		});
	};
	const inventory_change = (gear: Gear, index: number) => {
		inventory.update((inv) => {
			if (inv[index]) {
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				inv[index]!.gear = gear;
			} else {
				inv[index] = createGearSlot(gear);
			}
			return inv;
		});
	};
	const inventory_remove = (index: number) => {
		inventory.update((inv) => {
			if (inv[index]) {
				inv[index] = undefined;
			}
			if (_selected === index) {
				selected.set(SELECTED_DEFAULT);
			}
			return inv;
		});
	};
	const inventory_swap = (index1: number, index2: number) => {
		if (index1 !== index2 && 0 <= index1 && index1 < MAX_INV && 0 <= index2 && index2 < MAX_INV) {
			inventory.update((inv) => {
				const temp = inv[index1];
				inv[index1] = inv[index2];
				inv[index2] = temp;
				return inv;
			});
		}
	};
	const inventory_select = (index: number) => {
		if (_inventory[index]) {
			selected.set(index);
		}
	};
	const inventory_deselect = () => {
		selected.set(SELECTED_DEFAULT);
	};
	const meta_reset = () => {
		if (_gear && _meta) {
			meta.set(createGearMeta());
		}
	};

	inventory.subscribe((newInv) => (_inventory = newInv));
	lastAdd.subscribe((newAdd) => (_lastAdd = newAdd));
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
			inventory_change(newGear, _selected);
		}
	});
	meta.subscribe((newMeta) => {
		_meta = newMeta;
		if (newMeta && _inventory[_selected] !== undefined) {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			_inventory[_selected]!.meta = newMeta;
		}
	});

	return {
		inventory: {
			subscribe: inventory.subscribe,
			set: inventory.set,
			update: inventory.update,
			add: inventory_add,
			addSlot: inventory_addSlot,
			change: inventory_change,
			remove: inventory_remove,
			swap: inventory_swap,
			select: inventory_select,
			deselect: inventory_deselect
		},
		lastAdd: {
			subscribe: lastAdd.subscribe
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

export const { inventory, lastAdd, selected, gear, meta } = createStore();
