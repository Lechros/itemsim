import { GEAR_VERSION } from '$lib/config/constant';
import {
	addGearRows,
	db,
	deleteAllGearData,
	getAllGearRows,
	type GearRow
} from '$lib/stores/gear-inventory';
import { migrate, type GearData } from '@malib/gear';
import typia from 'typia';
import { parseExportPayload } from './export/parse';
import { buildExportPayload, serializeExportPayload } from './export/serialize';
import { type ExportPayload } from './export/types';

export async function backupInventory(): Promise<Uint8Array<ArrayBuffer>> {
	try {
		const rows = await getAllGearRows();
		const payload = buildExportPayload(rows, 'backup');
		return serializeExportPayload(payload);
	} catch (error) {
		console.error(error);
		throw new Error('알 수 없는 이유로 인벤토리 백업에 실패했어요.');
	}
}

export async function restoreInventory(payload: ExportPayload, clear: boolean = false) {
	if (payload.type !== 'backup') {
		throw new Error('인벤토리 복원에 실패했어요. 올바른 파일인지 확인해주세요.');
	}
	let rows: Omit<GearRow, 'seq'>[];
	try {
		rows = payload.items.map((item) => ({
			gear: ensureGearData(migrate(item.gear as GearData, GEAR_VERSION)),
			hash: item.hash,
			createdAt: new Date(item.createdAt),
			updatedAt: new Date(item.updatedAt)
		}));
	} catch (error) {
		console.error(error);
		throw new Error('인벤토리 복원에 실패했어요. 올바른 파일인지 확인해주세요.');
	}
	return db
		.transaction('rw', db.inventory, () => {
			if (clear) {
				deleteAllGearData();
			}
			addGearRows(rows);
		})
		.catch((error) => {
			console.error(error);
			throw new Error('알 수 없는 이유로 인벤토리 복원에 실패했어요.');
		});
}

export function exportGears(rows: GearRow[]): Uint8Array<ArrayBuffer> {
	try {
		const payload = buildExportPayload(rows, 'export');
		return serializeExportPayload(payload);
	} catch (error) {
		console.error(error);
		throw new Error('알 수 없는 이유로 아이템 내보내기에 실패했어요.');
	}
}

export async function importGears(payloadStr: Uint8Array<ArrayBuffer>) {
	let payload: ExportPayload;
	try {
		payload = parseExportPayload(payloadStr);
	} catch (error) {
		console.error(error);
		throw new Error('아이템 가져오기에 실패했어요. 올바른 파일인지 확인해주세요.');
	}
	if (payload.type !== 'export') {
		throw new Error('아이템 가져오기에 실패했어요. 올바른 파일인지 확인해주세요.');
	}
	let rows: Omit<GearRow, 'seq'>[];
	try {
		rows = payload.items.map((item) => ({
			gear: ensureGearData(migrate(item.gear as GearData, GEAR_VERSION)),
			hash: item.hash,
			createdAt: new Date(),
			updatedAt: new Date()
		}));
	} catch (error) {
		console.error(error);
		throw new Error('아이템 가져오기에 실패했어요. 올바른 파일인지 확인해주세요.');
	}
	return db
		.transaction('rw', db.inventory, () => addGearRows(rows))
		.catch((error) => {
			console.error(error);
			throw new Error('알 수 없는 이유로 아이템 가져오기에 실패했어요.');
		});
}

const ensureGearData = typia.createAssert<GearData>();
