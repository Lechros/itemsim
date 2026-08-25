import { Gear, GearCapability, GearType, type GearData } from '@malib/gear';
import { describe, expect, test } from 'vitest';
import { applyPatch, isPatchSatisfied } from './patch';
import { getSpecialPatches } from './patches';

function createDestiny2Weapon() {
	return new Gear({
		attributes: {
			bossReward: true,
			canAddOption: GearCapability.Can,
			canAdditionalPotential: GearCapability.Can,
			canPotential: GearCapability.Can,
			canScroll: GearCapability.Fixed,
			lucky: true,
			onlyEquip: true,
			setItemId: 887,
			trade: 1
		},
		baseOption: {
			attackPower: 260,
			bossDamage: 30,
			ignoreMonsterArmor: 20,
			int: 190,
			luk: 190,
			magicPower: 439
		},
		icon: '1212145',
		id: 1212145,
		name: '데스티니 샤이닝로드',
		req: {
			job: {
				class: 2
			},
			level: 250
		},
		scrollUpgradeableCount: 9,
		type: GearType.shiningRod,
		version: 3
	} satisfies GearData);
}

describe('데스티니 무기 2차 초월 패치', () => {
	test('22성에서 시작하고 최대 25성까지 스타포스 강화할 수 있다', () => {
		const gear = createDestiny2Weapon();
		const [patch] = getSpecialPatches(gear);

		expect(patch.name).toContain('2차 초월');
		expect(patch.can?.star).toBe(GearCapability.Can);
		expect(patch.maxStar).toBe(25);

		applyPatch(gear, patch);

		expect(gear.attributes.canStarforce).toBe(GearCapability.Can);
		expect(gear.attributes.fixedMaxStar).toBe(25);
		expect(gear.star).toBe(22);
		expect(gear.maxStar).toBe(25);
		expect(isPatchSatisfied(gear, patch)).toBe(true);

		while (gear.canApplyStarforce) {
			gear.applyStarforce();
		}

		expect(gear.star).toBe(25);
		expect(gear.canApplyStarforce).toBe(false);
	});
});
