/**
 * Slot inventory layout: maps slot index → gear seq (or empty).
 * Persisted in IDB (slots / SlotRow). Used when 보기 모드 is '인벤토리' (inventoryView === 'slots').
 *
 * - Entries with slot index >= slotCount are ignored on load (not deleted).
 * - When a slot's gearSeq has no matching inventory row (stale), that row is deleted on read.
 * - gearSeq has a unique index; duplicate seq in another slot throws (catch to skip on batch add).
 */

import { db, type GearRow } from '$lib/stores/gear-inventory';
import { liveQuery } from 'dexie';

/** One slot in the layout: slot index and gear row (null if empty). Use gearRow.seq when filled. */
export interface SlotLayoutEntry {
	slotIndex: number;
	gearRow: GearRow | null;
}

/**
 * Returns layout for the given slot count as structured entries.
 * Loads only slot.index < slotCount; entries beyond are ignored.
 * Uses bulkGet for inventory so each slot's gear row is resolved in one batch.
 * For each loaded SlotRow, if the gear row no longer exists, the slot row is deleted and the slot is empty.
 */
export async function getSlotLayout(slotCount: number): Promise<SlotLayoutEntry[]> {
	const rows = await db.slots.where('index').below(slotCount).toArray();
	const result: SlotLayoutEntry[] = Array.from({ length: slotCount }, (_, i) => ({
		slotIndex: i,
		gearRow: null
	}));

	const toDelete: number[] = [];
	const seqs: number[] = [];

	for (const row of rows) {
		if (row.index < 0 || row.index >= slotCount) continue;
		seqs.push(row.gearSeq);
	}

	if (seqs.length === 0) return result;

	const gearRows = await db.inventory.bulkGet(seqs);
	const seqToRow = new Map(seqs.map((seq, i) => [seq, gearRows[i]]));

	for (const row of rows) {
		if (row.index < 0 || row.index >= slotCount) continue;
		const gearRow = seqToRow.get(row.gearSeq);
		if (gearRow === undefined) {
			toDelete.push(row.index);
		} else {
			result[row.index].gearRow = gearRow;
		}
	}

	if (toDelete.length > 0) {
		await db.slots.bulkDelete(toDelete);
	}

	return result;
}

/**
 * Reactive slot layout for the given slot count (use in components).
 */
export function useSlotLayout(slotCount: number) {
	return liveQuery(() => getSlotLayout(slotCount));
}

/**
 * Returns whether the given gear seq is already assigned to any slot.
 */
export async function hasSeqInSlot(seq: number): Promise<boolean> {
	const row = await db.slots.where('gearSeq').equals(seq).first();
	return row !== undefined;
}

/**
 * Puts an item (seq) in a slot, or clears the slot if seq is null.
 * - If seq is already in a slot with index < slotCount: returns false (duplicate).
 * - If seq is already in a slot with index >= slotCount: removes it from that slot and puts in the requested slot.
 * - Otherwise: puts in the requested slot.
 */
export async function setSlot(
	slotIndex: number,
	seq: number | null,
	slotCount: number
): Promise<boolean> {
	if (slotIndex < 0 || slotIndex >= slotCount) return false;

	try {
		await db.transaction('rw', db.slots, async () => {
			if (seq === null) {
				await db.slots.delete(slotIndex);
				return;
			}

			const existing = await db.slots.where('gearSeq').equals(seq).first();
			if (existing !== undefined) {
				if (existing.index < slotCount) {
					// Already in a valid slot → return false, no change
					throw new SetSlotDuplicateError();
				}
				// In a slot outside slotCount → remove and add to requested slot
				await db.slots.delete(existing.index);
			}

			await db.slots.put({ index: slotIndex, gearSeq: seq });
		});
		return true;
	} catch (e) {
		if (e instanceof SetSlotDuplicateError) return false;
		throw e;
	}
}

/** Thrown inside setSlot when seq is already in a slot within slotCount; caught to return false. */
export class SetSlotDuplicateError extends Error {
	constructor() {
		super('Seq already in slot within slotCount');
		this.name = 'SetSlotDuplicateError';
	}
}

/**
 * Moves item from one slot to another. If target has an item, swaps.
 * Deletes both slots first then puts both to satisfy unique gearSeq.
 */
export async function moveSlot(fromIndex: number, toIndex: number, slotCount: number) {
	if (
		fromIndex < 0 ||
		fromIndex >= slotCount ||
		toIndex < 0 ||
		toIndex >= slotCount ||
		fromIndex === toIndex
	) {
		return;
	}

	await db.transaction('rw', db.slots, async () => {
		const fromRow = await db.slots.get(fromIndex);
		const toRow = await db.slots.get(toIndex);
		const fromSeq = fromRow?.gearSeq ?? null;
		const toSeq = toRow?.gearSeq ?? null;

		await db.slots.delete(fromIndex);
		await db.slots.delete(toIndex);

		if (fromSeq !== null) {
			await db.slots.put({ index: toIndex, gearSeq: fromSeq });
		}
		if (toSeq !== null) {
			await db.slots.put({ index: fromIndex, gearSeq: toSeq });
		}
	});
}

/**
 * Removes a seq from all slots (e.g. when the item is deleted from inventory).
 */
export async function removeSeqFromSlots(seq: number) {
	await db.slots.where('gearSeq').equals(seq).delete();
}

/**
 * Removes multiple seqs from slots (e.g. batch delete).
 */
export async function removeSeqsFromSlots(seqs: number[]) {
	if (seqs.length === 0) return;
	await db.slots.where('gearSeq').anyOf(seqs).delete();
}

/**
 * Clears all slot rows.
 */
export async function clearSlotLayout() {
	await db.slots.clear();
}
