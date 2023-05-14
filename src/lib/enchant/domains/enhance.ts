import {
	GearPropType,
	addAmazingEnhancement,
	addStarforce,
	resetEnhancement,
	type Gear
} from '@malib/gear';

export function canEnhance(gear: Gear) {
	return gear.maxStar > 0;
}

export function canStarforce(gear: Gear) {
	return gear.maxStar > gear.star;
}

export function doStarforce(gear: Gear) {
	addStarforce(gear);
	return gear;
}

export function canStarforceReduce(gear: Gear) {
	return !gear.amazing && gear.star > 0;
}

export function doStarforceReduce(gear: Gear) {
	const count = gear.star - 1;
	resetEnhancement(gear);
	for (let i = 0; i < count; i++) {
		addStarforce(gear);
	}
	return gear;
}

export function canStarforce17(gear: Gear) {
	return gear.maxStar >= 17 && gear.star < 17;
}

export function doStarforce17(gear: Gear) {
	const count = 17 - gear.star;
	for (let i = 0; i < count; i++) {
		addStarforce(gear);
	}
	return gear;
}

export function canStarforce22(gear: Gear) {
	return gear.maxStar >= 22 && gear.star < 22;
}

export function doStarforce22(gear: Gear) {
	const count = 22 - gear.star;
	for (let i = 0; i < count; i++) {
		addStarforce(gear);
	}
	return gear;
}

export function canAmazingEnhancement(gear: Gear) {
	return (
		gear.req.level <= 150 &&
		!gear.getBooleanValue(GearPropType.superiorEqp) &&
		gear.maxStar > gear.star &&
		gear.star < 15
	);
}

export function doAmazingEnhancement(gear: Gear) {
	addAmazingEnhancement(gear);
	return gear;
}

export function canResetEnhancement(gear: Gear) {
	return gear.star > 0;
}

export function doResetEnhancement(gear: Gear) {
	resetEnhancement(gear);
	return gear;
}
