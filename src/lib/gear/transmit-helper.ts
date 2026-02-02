import { getGearData, getGearHash } from '$lib/api';
import { extractGearData, getGearRow } from '$lib/stores/gear-inventory';
import type { GearData } from '@malib/gear';
import { transmit } from './transmit';

/**
 * 해당 장비가 업데이트가 필요한지 여부를 반환합니다.
 * 저장된 hash가 존재하지 않는 경우 항상 true를 반환합니다.
 */
export async function shouldTransmit(seq: number): Promise<boolean> {
	const row = await getGearRow(seq);
	if (!row) return false;

	const currentGear = extractGearData(row);
	const gearId = currentGear.id;
	const storedHash = row.hash;

	const serverHash = await getGearHash(gearId);
	if (storedHash == null) return true;
	return storedHash !== serverHash;
}

/**
 * 장비 id를 기반으로 새로운 기본 장비 정보에 transmit 결과를 반환합니다.
 * transmit이 필요하지 않은 경우 null을 반환합니다.
 * @param seq 장비 id
 * @returns 업데이트할 데이터가 있으면 { gear, hash }, 이미 최신이면 null
 */
export async function runTransmit(seq: number, abortSignal?: AbortSignal): Promise<{ gear: GearData; hash: string } | null> {
	const row = await getGearRow(seq);
	if (!row) return null;

	const currentGear = extractGearData(row);
	const gearId = currentGear.id;
	const storedHash = row.hash;

	const [newGearData, serverHash] = await Promise.all([getGearData(gearId, abortSignal), getGearHash(gearId, abortSignal)]);

	if (storedHash === serverHash) return null;

	const success = transmit(currentGear, newGearData);
	return success ? { gear: newGearData, hash: serverHash } : null;
}
