import { GearType, PotentialGrade, type GearData } from '@malib/gear';
import { describe, expect, test } from 'vitest';
import { transmit } from './transmit';

describe('장비 강화 정보 복사', () => {
	test.each([true, false])('소울웨폰 활성 여부 %s와 관계없이 소울 정보를 보존한다', (enchanted) => {
		const dst: GearData = {
			version: 4,
			id: 1212145,
			name: '데스티니 샤이닝로드',
			icon: '1212145',
			type: GearType.shiningRod,
			req: { level: 250 },
			attributes: {},
			baseOption: { magicPower: 439 }
		};
		const src: GearData = {
			...dst,
			attributes: {},
			soulWeapon: {
				enchanted,
				soul: { name: '위대한 루시드의 소울', magnificent: true, option: { magicPowerRate: 3 } },
				amplificationLevel: 1,
				potentialGrade: PotentialGrade.Rare,
				potentials: [
					{ grade: PotentialGrade.Rare, summary: '마력 : +10', option: { magicPower: 10 } }
				]
			}
		};

		expect(transmit(src, dst)).toBe(true);
		expect(dst.soulWeapon).toEqual(src.soulWeapon);
	});
});
