import type { GearData } from '@malib/gear';
import Dexie, { type EntityTable, liveQuery } from 'dexie';
import { getRegExp } from 'korean-regexp';

export interface GearRow {
	seq: number;
	gear: GearData;
	createdAt: Date;
	updatedAt: Date;
}

const db = new Dexie('itemsim') as Dexie & {
	inventory: EntityTable<GearRow, 'seq'>;
};

db.version(1).stores({
	inventory: '++seq, gear.name, gear.meta.id, gear.meta.version, createdAt, updatedAt'
});

/**
 * DB에 장비 정보를 추가합니다.
 * @param gears 추가할 장비 정보
 * @returns 추가된 장비의 seq. 여러 장비를 추가할 경우 마지막 장비의 seq를 반환합니다.
 */
export async function addGearData(...gears: GearData[]) {
	const now = new Date();
	return await db.inventory.bulkAdd(
		gears.map((gear) => ({ gear, createdAt: now, updatedAt: now }))
	);
}

/**
 * DB에서 장비 정보를 수정합니다. 존재하지 않는 seq일 경우 추가되지 않습니다.
 * @param seq 수정할 장비 정보의 seq
 * @param gear 새로운 장비 정보
 * @returns 수정되었을 경우 1; 아닐 경우 0.
 */
export async function updateGearData(seq: number, gear: GearData) {
	const now = new Date();
	return await db.inventory.update(seq, { gear, updatedAt: now });
}

/**
 * DB에서 장비 정보를 삭제합니다.
 * @param seqs 삭제할 장비 정보의 seq
 */
export async function deleteGearData(...seqs: number[]) {
	return await db.inventory.bulkDelete(seqs);
}

/**
 * DB에서 장비 정보를 조회합니다.
 * @param seq 조회할 장비 정보의 seq
 * @returns 조회된 장비 정보 Promise
 */
export function getGearData(seq: number) {
	return db.inventory.get(seq).then((row) => row?.gear);
}

/**
 * DB에 저장된 장비 정보의 총 개수를 반환합니다.
 * @returns 장비 정보의 총 개수
 */
export function useGearDataCount() {
	return liveQuery(() => db.inventory.count());
}

/**
 * DB에서 장비 정보를 조회하는 훅.
 */
export function useGearQuery({ filter, sort = 'createdAtDesc' }: GearQueryOptions = {}) {
	const filterFn = getFilter(filter);
	const compareFn = getComparer(sort);
	return liveQuery(() =>
		db.inventory
			.filter(filterFn)
			.toArray()
			.then((arr) => arr.sort(compareFn))
	);
}

export interface GearQueryOptions {
	filter?: {
		name?: string;
	};
	sort?: GearQuerySortTypes;
}

export type GearQuerySortTypes =
	| 'nameAsc'
	| 'nameDesc'
	| 'idAsc'
	| 'idDesc'
	| 'createdAtAsc'
	| 'createdAtDesc'
	| 'updatedAtAsc'
	| 'updatedAtDesc';

function getFilter(filter: GearQueryOptions['filter']) {
	const filters: ((row: GearRow) => boolean)[] = [];
	if (filter?.name) {
		const name = filter.name.trim();
		if (name) {
			filters.push((row) => getRegExp(name, { fuzzy: true, ignoreCase: true }).test(row.gear.name));
		}
	}
	return chainFilter(...filters);
}

function chainFilter(...filters: ((row: GearRow) => boolean)[]) {
	return (row: GearRow) => filters.every((filter) => filter(row));
}

function getComparer(sort: NonNullable<GearQueryOptions['sort']>) {
	switch (sort) {
		case 'nameAsc':
			return chainCompare(nameCompare, idCompare, seqCompare);
		case 'nameDesc':
			return chainCompare(nameCompare, idCompare, seqCompare).reversed();
		case 'idAsc':
			return chainCompare(idCompare, seqCompare);
		case 'idDesc':
			return chainCompare(idCompare, seqCompare).reversed();
		case 'createdAtAsc':
			return chainCompare(createdAtCompare, seqCompare);
		case 'createdAtDesc':
			return chainCompare(createdAtCompare, seqCompare).reversed();
		case 'updatedAtAsc':
			return chainCompare(updatedAtCompare, seqCompare);
		case 'updatedAtDesc':
			return chainCompare(updatedAtCompare, seqCompare).reversed();
	}
}

function nameCompare(a: GearRow, b: GearRow) {
	return a.gear.name.localeCompare(b.gear.name, 'ko', { sensitivity: 'accent', numeric: true });
}

function idCompare(a: GearRow, b: GearRow) {
	return a.gear.meta.id - b.gear.meta.id;
}

function createdAtCompare(a: GearRow, b: GearRow) {
	return a.createdAt.getTime() - b.createdAt.getTime();
}

function updatedAtCompare(a: GearRow, b: GearRow) {
	return a.updatedAt.getTime() - b.updatedAt.getTime();
}

function seqCompare(a: GearRow, b: GearRow) {
	return a.seq - b.seq;
}

function chainCompare(...comparers: ((a: GearRow, b: GearRow) => number)[]) {
	const compare = (a: GearRow, b: GearRow) => {
		for (const comparer of comparers) {
			const result = comparer(a, b);
			if (result !== 0) {
				return result;
			}
		}
		return 0;
	};
	return withReversed(compare);
}

function withReversed(compare: (a: GearRow, b: GearRow) => number) {
	return Object.assign(compare, { reversed: () => (a: GearRow, b: GearRow) => compare(b, a) });
}
