import type { GearRow } from '$lib/stores/gear-inventory';
import lzs from 'lz-string';
import type { ExportPayload } from './types';

export function serializeExportPayload(payload: ExportPayload): string {
	return lzs.compress(JSON.stringify(payload));
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
