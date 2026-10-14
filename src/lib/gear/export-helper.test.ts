import { GearType, type GearData } from '@malib/gear';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { addGearRows } from '#lib/stores/gear-inventory.ts';
import { importGears, restoreInventory } from './export-helper';
import { serializeExportPayload } from './export/serialize';

vi.mock('#lib/stores/gear-inventory.ts', () => ({
	addGearRows: vi.fn(),
	deleteAllGearData: vi.fn(),
	getAllGearRows: vi.fn(),
	db: { inventory: {}, transaction: vi.fn(async (_mode, _table, callback) => callback()) }
}));

beforeEach(() => {
	vi.clearAllMocks();
	vi.spyOn(console, 'error').mockImplementation(() => {});
});
afterEach(() => vi.restoreAllMocks());

const gear: GearData = {
	version: 4,
	id: 1212145,
	name: '테스트 장비',
	icon: '1212145',
	type: GearType.shiningRod,
	req: { level: 250 },
	attributes: {},
	baseOption: { magicPower: 439 }
};

describe('가져온 장비 검증', () => {
	test('유효한 장비를 저장한다', async () => {
		await importGears(serializeExportPayload({ version: 2, type: 'export', items: [{ gear }] }));
		expect(addGearRows).toHaveBeenCalledWith([
			expect.objectContaining({ gear, createdAt: expect.any(Date), updatedAt: expect.any(Date) })
		]);
	});

	test('필수 속성이 빠진 장비는 저장하지 않는다', async () => {
		const invalidGear = { version: 4, name: '테스트 장비' };
		const bytes = serializeExportPayload({
			version: 2,
			type: 'export',
			items: [{ gear: invalidGear }]
		});
		await expect(importGears(bytes)).rejects.toThrow('아이템 가져오기에 실패했어요.');
		expect(addGearRows).not.toHaveBeenCalled();
	});

	test('백업 안의 잘못된 장비도 저장하지 않는다', async () => {
		const invalidGear = { ...gear, req: { level: 'invalid' } };
		await expect(
			restoreInventory({
				version: 2,
				type: 'backup',
				items: [
					{
						gear: invalidGear,
						createdAt: '2026-10-13T00:00:00Z',
						updatedAt: '2026-10-13T00:00:00Z'
					}
				]
			})
		).rejects.toThrow('인벤토리 복원에 실패했어요.');
		expect(addGearRows).not.toHaveBeenCalled();
	});
});
