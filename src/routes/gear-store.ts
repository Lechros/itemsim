import {
	BonusStatType,
	Gear,
	type BonusStatGrade,
	type GearLike,
	gearToPlain,
	plainToGear,
	isGearLike
} from '@malib/gear';
import { writable } from 'svelte/store';

type GearSlot = {
	gear: Gear | undefined;
	meta: {
		bonus: {
			type: BonusStatType | -1;
			grade: BonusStatGrade | 0;
		}[];
	};
};

type GearSlotLike = {
	gear: GearLike | undefined;
	meta: GearSlot['meta'];
};

const createGearSlot = (): GearSlot => {
	return {
		gear: undefined,
		meta: {
			bonus: [
				{ type: -1, grade: 0 },
				{ type: -1, grade: 0 },
				{ type: -1, grade: 0 },
				{ type: -1, grade: 0 }
			]
		}
	};
};

const createBrowser = () => {
	const invStrorNull = localStorage.getItem('gear-inventory');
	const invData =
		invStrorNull === null
			? Array.from({ length: 32 }, createGearSlot)
			: deserializeInventory(invStrorNull);
	let _inventory: GearSlot[];
	const inventory = writable(invData);
	inventory.subscribe((value) => {
		_inventory = value;
		localStorage.setItem('gear-inventory', serializeInventory(value));
	});

	let _selected = -1;
	const selected = writable(-1);
	selected.subscribe((value) => {
		_selected = value;
		const newGear = _inventory[value]?.gear;
		if (newGear) {
			gear.set(newGear);
			meta.set(_inventory[value].meta);
		}
	});

	const gear = writable(undefined as Gear | undefined);
	gear.subscribe((value) => {
		inventory.update((inv) => {
			if (_selected > -1) {
				inv[_selected].gear = value;
			}
			return inv;
		});
	});

	const meta = writable({
		bonus: []
	} as GearSlot['meta']);
	meta.subscribe((value) => {
		inventory.update((inv) => {
			if (_selected > -1) {
				inv[_selected].meta = value;
			}
			return inv;
		});
	});

	return { inventory, selected, gear, meta };
};

const createNode = () => {
	const inventory = writable(Array.from({ length: 32 }, createGearSlot));
	const selected = writable(-1);
	const gear = writable(new Gear());
	const meta = writable({
		bonus: []
	} as GearSlot['meta']);

	return { inventory, selected, gear, meta };
};

function serializeInventory(inventory: GearSlot[]): string {
	return JSON.stringify(inventory.map(serializeSlot));
}

function deserializeInventory(invString: string): GearSlot[] {
	return (JSON.parse(invString) as GearSlotLike[]).map(deserializeGearOrSlot);
}

function deserializeGearOrSlot(like: GearLike | undefined | GearSlotLike) {
	if (!like) {
		return createGearSlot();
	}
	if ('meta' in like) {
		return deserializeSlot(like);
	} else {
		const slot = createGearSlot();
		slot.gear = plainToGear(like);
		return slot;
	}
}

function serializeSlot(slot: GearSlot): GearSlotLike {
	return { gear: slot.gear ? gearToPlain(slot.gear) : undefined, meta: slot.meta };
}
function deserializeSlot(like: GearSlotLike): GearSlot {
	return {
		gear: like.gear && isGearLike(like.gear) ? plainToGear(like.gear) : undefined,
		meta: like.meta
	};
}

export const { inventory, selected, gear, meta } =
	typeof localStorage === 'undefined' ? createNode() : createBrowser();
