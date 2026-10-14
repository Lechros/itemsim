import lzs from 'lz-string';
import { describe, expect, test } from 'vitest';
import { parseExportPayload } from './parse';
import { serializeExportPayload } from './serialize';
import type { ExportPayload } from './types';

describe('내보내기 데이터 검증', () => {
	test('정상 백업 데이터를 복원한다', () => {
		const payload: ExportPayload = {
			version: 2,
			type: 'backup',
			items: [
				{
					gear: { name: '테스트 장비' },
					createdAt: '2026-10-13T00:00:00Z',
					updatedAt: '2026-10-13T00:00:00Z'
				}
			]
		};
		expect(parseExportPayload(serializeExportPayload(payload))).toEqual(payload);
	});

	test.each([
		{ version: 3, type: 'export', items: [] },
		{ version: 2, type: 'export', items: [{ gear: { name: 123 } }] },
		{ version: 2, type: 'backup', items: [{ gear: { name: '테스트 장비' } }] }
	])('잘못된 구조를 거부한다: %j', (payload) => {
		const bytes = lzs.compressToUint8Array(JSON.stringify(payload)) as Uint8Array<ArrayBuffer>;
		expect(() => parseExportPayload(bytes)).toThrow('Invalid export payload');
	});
});
