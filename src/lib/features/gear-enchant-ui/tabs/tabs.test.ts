import { Gear, GearType, isWeapon } from '@malib/gear';
import { expect, test } from 'vitest';
import { tabs } from './tabs';

test.each(Object.values(GearType).filter((type): type is GearType => typeof type === 'number'))(
	'장비 종류 %s의 소울 탭은 무기일 때만 활성화된다',
	(type) => {
		const gear = new Gear({
			version: 4,
			id: 1212145,
			name: '장비',
			icon: '1212145',
			type,
			req: { level: 250 },
			attributes: {},
			baseOption: {}
		});
		expect(tabs.find((tab) => tab.value === 'soul')!.disabled!(gear)).toBe(!isWeapon(type));
	}
);
