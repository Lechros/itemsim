import { GEAR_VERSION } from '$lib/config/constant';
import { migrate, type GearData } from '@malib/gear';
import Dexie, { type EntityTable, liveQuery } from 'dexie';
import { getRegExp } from 'korean-regexp';

export interface GearRow {
	seq: number;
	gear: { name: string };
	hash?: string;
	createdAt: Date;
	updatedAt: Date;
}

const db = new Dexie('itemsim') as Dexie & {
	inventory: EntityTable<GearRow, 'seq'>;
};

db.version(1).stores({
	inventory: '++seq, gear.name, gear.meta.id, gear.meta.version, createdAt, updatedAt'
});

db.version(2).stores({
	inventory: '++seq, gear.name, gear.meta.id, gear.meta.version, createdAt, updatedAt'
});

/**
 * DB에 장비 정보를 추가합니다.
 * @param gears 추가할 장비 정보
 * @param hashes 각 장비의 기본 정보 해시. gears와 동일한 순서여야 합니다.
 * @returns 추가된 장비의 seq. 여러 장비를 추가할 경우 마지막 장비의 seq를 반환합니다.
 */
export async function addGearData(gears: GearData[], hashes: string[]) {
	if (gears.length !== hashes.length) {
		throw new TypeError('gears와 hashes의 길이가 일치하지 않습니다.');
	}
	const now = new Date();
	const rows: Omit<GearRow, 'seq'>[] = gears.map((gear, i) => ({
		gear,
		hash: hashes[i],
		createdAt: now,
		updatedAt: now
	}));
	return await db.inventory.bulkAdd(rows);
}

/**
 * DB에서 장비 정보를 수정합니다. 존재하지 않는 seq일 경우 추가되지 않습니다.
 * @param seq 수정할 장비 정보의 seq
 * @param gear 새로운 장비 정보
 * @param options.hash 기본 정보 해시. 업데이트 반영 시 서버 해시로 갱신.
 * @returns 수정되었을 경우 1; 아닐 경우 0.
 */
export async function updateGearData(
	seq: number,
	gear: GearData,
	options?: { hash?: string }
) {
	const now = new Date();
	const update: Partial<GearRow> = { gear, updatedAt: now };
	if (options?.hash) {
		update.hash = options.hash;
	}
	return await db.inventory.update(seq, update);
}

/**
 * DB에서 장비 정보를 삭제합니다.
 * @param seqs 삭제할 장비 정보의 seq
 */
export async function deleteGearData(...seqs: number[]) {
	return await db.inventory.bulkDelete(seqs);
}

/**
 * DB에서 장비 행을 조회합니다.
 * @param seq 조회할 seq
 * @returns `GearRow` 또는 `undefined`
 */
export function getGearRow(seq: number) {
	return db.inventory.get(seq);
}

/**
 * DB에서 장비 정보를 조회합니다.
 * @param seq 조회할 장비 정보의 seq
 * @returns 조회된 장비 정보 `Promise`
 */
export function getGearData(seq: number) {
	return db.inventory.get(seq).then((row) => {
		if (!row) return undefined;
		return extractGearData(row);
	});
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

/**
 * GearRow에서 GearData를 추출합니다.
 * @param row GearRow
 * @returns GearData
 */
export function extractGearData(row: GearRow) {
	return migrate(row.gear, GEAR_VERSION) as GearData;
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
			return chainCompare(nameCompare, seqCompare);
		case 'nameDesc':
			return chainCompare(nameCompare, seqCompare).reversed();
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
