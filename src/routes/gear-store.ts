import { Gear } from '@malib/gear';
import { deserializeGear, serializeGear, type GearLike } from '@malib/serialize-gear';
import { writable } from 'svelte/store';

const createBrowser = () => {
	const invStrorNull = localStorage.getItem('gear-inventory');
	const invData =
		invStrorNull === null
			? Array<Gear | undefined>(32).fill(undefined)
			: deserializeInventory(invStrorNull);
	let _inventory: (Gear | undefined)[];
	const inventory = writable(invData);
	inventory.subscribe((value) => {
		_inventory = value;
		localStorage.setItem('gear-inventory', serializeInventory(value));
	});

	let _selected = -1;
	const selected = writable(-1);
	selected.subscribe((value) => {
		_selected = value;
		const newGear = _inventory[value];
		if (newGear) {
			gear.set(newGear);
		}
	});

	const gear = writable(undefined as Gear | undefined);
	gear.subscribe((value) => {
		inventory.update((inv) => {
			inv[_selected] = value;
			return inv;
		});
	});

	return { inventory, selected, gear };
};

const createNode = () => {
	const inventory = writable(Array<Gear | undefined>(32).fill(undefined));
	const selected = writable(-1);
	const gear = writable(new Gear());

	return { inventory, selected, gear };
};

function serializeInventory(inventory: (Gear | undefined)[]): string {
	return JSON.stringify(inventory.map((gear) => (gear ? serializeGear(gear) : undefined)));
}

function deserializeInventory(invString: string): (Gear | undefined)[] {
	return (JSON.parse(invString) as (GearLike | undefined)[]).map((like) =>
		like ? deserializeGear(like) : undefined
	);
}

export const { inventory, selected, gear } =
	typeof localStorage === 'undefined' ? createNode() : createBrowser();
