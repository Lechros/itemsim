import { Gear, GearType } from '@malib/gear';
import { expect, test } from 'vitest';
import {
	canAmazingEnhancement,
	canEnhance,
	canResetEnhancement,
	canStarforce,
	canStarforce17,
	canStarforce22,
	canStarforceReduce,
	doResetEnhancement,
	doStarforce,
	doStarforce17,
	doStarforce22,
	doStarforceReduce
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

test('canStarforce', () => {
	const gear = getTestGear();
	gear.star = 3;
	gear.maxStar = 5;
	expect(canStarforce(gear)).toBe(true);
	gear.star = 5;
	expect(canStarforce(gear)).toBe(false);
	gear.star = 2;
	gear.amazing = true;
	expect(canStarforce(gear)).toBe(true);
});

test('doStarforce', () => {
	const gear = getTestGear();
	gear.star = 15;
	gear.maxStar = 25;
	expect(doStarforce(gear)).toBe(gear);
	expect(gear.star).toBe(16);
});

test('canStarforceReduce', () => {
	const gear = getTestGear();
	gear.star = 20;
	gear.maxStar = 20;
	expect(canStarforceReduce(gear)).toBe(true);
	gear.star = 0;
	expect(canStarforceReduce(gear)).toBe(false);
	gear.star = 5;
	gear.amazing = true;
	expect(canStarforceReduce(gear)).toBe(false);
});

test('doStarforceReduce', () => {
	const gear = getTestGear();
	gear.star = 15;
	gear.maxStar = 25;
	expect(doStarforceReduce(gear)).toBe(gear);
	expect(gear.star).toBe(14);
});

test('canStarforce17', () => {
	const gear = getTestGear();
	gear.maxStar = 10;
	expect(canStarforce17(gear)).toBe(false);
	gear.maxStar = 20;
	expect(canStarforce17(gear)).toBe(true);
	gear.star = 2;
	expect(canStarforce17(gear)).toBe(true);
	gear.star = 17;
	expect(canStarforce17(gear)).toBe(false);
	gear.star = 0;
	gear.maxStar = 15;
	gear.amazing = true;
	expect(canStarforce17(gear)).toBe(false);
});

test('doStarforce17', () => {
	const gear = getTestGear();
	gear.star = 3;
	gear.maxStar = 20;
	expect(doStarforce17(gear)).toBe(gear);
	expect(gear.star).toBe(17);
});

test('canStarforce22', () => {
	const gear = getTestGear();
	gear.maxStar = 10;
	expect(canStarforce22(gear)).toBe(false);
	gear.maxStar = 20;
	expect(canStarforce22(gear)).toBe(false);
	gear.maxStar = 25;
	expect(canStarforce22(gear)).toBe(true);
	gear.star = 2;
	expect(canStarforce22(gear)).toBe(true);
	gear.star = 17;
	expect(canStarforce22(gear)).toBe(true);
	gear.star = 22;
	expect(canStarforce22(gear)).toBe(false);
	gear.star = 0;
	gear.maxStar = 15;
	gear.amazing = true;
	expect(canStarforce22(gear)).toBe(false);
});

test('doStarforce22', () => {
	const gear = getTestGear();
	gear.star = 3;
	gear.maxStar = 25;
	expect(doStarforce22(gear)).toBe(gear);
	expect(gear.star).toBe(22);
});

test('canAmazingEnhancement', () => {
	const gear = getTestGear();
	gear.star = 3;
	gear.maxStar = 5;
	expect(canAmazingEnhancement(gear)).toBe(true);
	gear.star = 5;
	expect(canAmazingEnhancement(gear)).toBe(false);
	gear.star = 2;
	gear.amazing = true;
	expect(canAmazingEnhancement(gear)).toBe(true);
});

test('doAmazingEnhancement', () => {
	const gear = getTestGear();
	gear.star = 15;
	gear.maxStar = 25;
	expect(doStarforce(gear)).toBe(gear);
	expect(gear.star).toBe(16);
});

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
