import { Gear, GearType } from '@malib/gear';
import { expect, test } from 'vitest';
import {
	canAmazingEnhancementChange,
	canEnhance,
	canResetEnhancement,
	canStarforceChange,
	doAmazingEnhancementChange,
	doResetEnhancement,
	doStarforceChange
} from './enhance';

function getTestGear() {
	const gear = new Gear();
	gear.type = GearType.cap;
	gear.req.level = 120;
	gear.totalUpgradeCount = 1;
	return gear;
}

test('canEnhance', () => {
	const gear = getTestGear();
	gear.maxStar = 0;
	expect(canEnhance(gear)).toBe(false);
	gear.maxStar = 20;
	expect(canEnhance(gear)).toBe(true);
	gear.star = 20;
	expect(canEnhance(gear)).toBe(true);
});

test.each([
	[3, 5, 1, false, true],
	[5, 5, 1, false, false],
	[5, 10, 5, false, true],
	[5, 10, 6, false, false],
	[5, 10, 1, true, true],
	[5, 10, 6, true, false],
	[15, 15, 1, true, false],
	[15, 20, -1, false, true],
	[15, 20, -15, false, true],
	[15, 20, -16, false, false],
	[15, 15, -1, true, false],
	[3, 10, -2, true, false]
])(
	'canStarforceChange(star: %d, maxStar: %d, diff: %d, amazing: %s) -> %s',
	(star, maxStar, diff, amazing, expected) => {
		const gear = getTestGear();
		gear.star = star;
		gear.maxStar = maxStar;
		gear.amazing = amazing;
		expect(canStarforceChange(gear, diff, false)).toBe(expected);
	}
);

test.each([
	[3, 5, 1, false, 4, false],
	[5, 10, 5, false, 10, false],
	[5, 10, 1, true, 6, true],
	[5, 15, 6, true, 11, true],
	[15, 15, 1, true, 15, true],
	[15, 20, -1, false, 14, false],
	[15, 20, -15, false, 0, false]
])(
	'doStarforceChange(star: %d, maxStar: %d, diff: %d, amazing: %s) -> %d, %s',
	(star, maxStar, diff, amazing, expectedStar, expectedAmazing) => {
		const gear = getTestGear();
		gear.star = star;
		gear.maxStar = maxStar;
		gear.amazing = amazing;
		doStarforceChange(gear, diff, false);
		expect(gear.star).toBe(expectedStar);
		expect(gear.amazing).toBe(expectedAmazing);
	}
);

test.each([
	[3, 5, 1, false, true],
	[5, 5, 1, false, false],
	[5, 10, 5, false, true],
	[5, 10, 6, false, false],
	[5, 10, 1, true, true],
	[5, 10, 6, true, false],
	[15, 15, 1, true, false],
	[15, 20, 1, false, false],
	[15, 20, -1, false, false],
	[15, 20, -15, false, false],
	[15, 20, -16, false, false],
	[15, 15, -1, true, false],
	[3, 10, -2, true, false]
])(
	'canAmazingEnhancementChange(star: %d, maxStar: %d, diff: %d, amazing: %s) -> %s',
	(star, maxStar, diff, amazing, expected) => {
		const gear = getTestGear();
		gear.star = star;
		gear.maxStar = maxStar;
		gear.amazing = amazing;
		expect(canAmazingEnhancementChange(gear, diff, false)).toBe(expected);
	}
);

test.each([
	[3, 5, 1, false, 4, true],
	[5, 10, 5, false, 10, true],
	[5, 10, 1, true, 6, true],
	[5, 15, 6, true, 11, true]
])(
	'doAmazingEnhancementChange(star: %d, maxStar: %d, diff: %d, amazing: %s) -> %d, %s',
	(star, maxStar, diff, amazing, expectedStar, expectedAmazing) => {
		const gear = getTestGear();
		gear.star = star;
		gear.maxStar = maxStar;
		gear.amazing = amazing;
		doAmazingEnhancementChange(gear, diff, false, false);
		expect(gear.star).toBe(expectedStar);
		expect(gear.amazing).toBe(expectedAmazing);
	}
);

test('canResetEnhancement', () => {
	const gear = getTestGear();
	gear.star = 3;
	gear.maxStar = 5;
	expect(canResetEnhancement(gear)).toBe(true);
	gear.star = 5;
	expect(canResetEnhancement(gear)).toBe(true);
	gear.star = 2;
	gear.amazing = true;
	expect(canResetEnhancement(gear)).toBe(true);
});

test('doResetEnhancement', () => {
	const gear = getTestGear();
	gear.star = 15;
	gear.maxStar = 25;
	expect(doResetEnhancement(gear)).toBe(gear);
	expect(gear.star).toBe(0);
	gear.star = 7;
	gear.maxStar = 15;
	gear.amazing = true;
	expect(doResetEnhancement(gear)).toBe(gear);
	expect(gear.star).toBe(0);
	expect(gear.amazing).toBe(false);
});
