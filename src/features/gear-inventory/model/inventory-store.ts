import { db } from '$lib/shared/lib';
import type { GearData } from '@malib/gear';
import { liveQuery } from 'dexie';

/**
 * DB에 장비 정보를 추가합니다.
 * @param gear 추가할 장비 정보
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
 * @param seq 삭제할 장비 정보의 seq
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
 * DB에서 장비 정보를 조회하는 훅.
 *
 * TODO: 필터, 정렬 기능 추가
 */
export function useGearQuery() {
	return liveQuery(() => db.inventory.orderBy('createdAt').reverse().toArray());
}
