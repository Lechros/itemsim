import type { GearData } from '@malib/gear';
import Dexie, { type EntityTable } from 'dexie';

interface GearRow {
	seq: number;
	gear: GearData;
}

const db = new Dexie('itemsim') as Dexie & {
	inventory: EntityTable<GearRow, 'seq'>;
};

db.version(1).stores({
	inventory: '++seq, gear.name'
});

export { db };
export type { GearRow };
