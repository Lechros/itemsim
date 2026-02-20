import type { GearRow } from '$lib/stores/gear-inventory';
import lzs from 'lz-string';
import type { ExportPayload } from './types';

export function serializeExportPayload(payload: ExportPayload): Uint8Array<ArrayBuffer> {
	const serialized = JSON.stringify(payload);
	return lzs.compressToUint8Array(serialized) as Uint8Array<ArrayBuffer>;
}

export function buildExportPayload(rows: GearRow[], type: 'backup' | 'export'): ExportPayload {
	if (type === 'backup') {
		return {
			version: 2,
			type,
			items: rows.map((row) => ({
				gear: row.gear,
				hash: row.hash,
				createdAt: row.createdAt.toISOString(),
				updatedAt: row.updatedAt.toISOString()
			}))
		};
	} else if (type === 'export') {
		return {
			version: 2,
			type,
			items: rows.map((row) => ({
				gear: row.gear,
				hash: row.hash
			}))
		};
	} else {
		throw new TypeError(`Invalid export type: ${type}`);
	}
}
