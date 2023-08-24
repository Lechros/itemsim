import {
	Gear,
	GearPropType,
	addAmazingEnhancement,
	addStarforce,
	resetEnhancement
} from '@malib/gear';

export function canEnhance(gear: Gear) {
	return gear.maxStar > 0;
}

export function canAmazing(gear: Gear) {
	return !gear.getBooleanValue(GearPropType.superiorEqp) && gear.req.level <= 150;
}

export function canLimitBreak(gear: Gear) {
	if(gear.getBooleanValue(GearPropType.superiorEqp)) {
		return false;
	}
	return Gear.getMaxStar(gear) < 25;
}

export function canStarforceChange(gear: Gear, diff: number, ignoreMaxStar: boolean) {
	const MAX_STAR = gear.amazing || gear.getBooleanValue(GearPropType.superiorEqp) ? 15 : 25;
	const gearMaxStar = ignoreMaxStar ? MAX_STAR : gear.maxStar;
	const targetStar = gear.star + diff;
	return !gear.amazing && 0 <= targetStar && targetStar <= gearMaxStar;
}

export function doStarforceChange(gear: Gear, diff: number, ignoreMaxStar: boolean) {
	if (diff > 0) {
		for (let i = 0; i < diff; i++) {
			addStarforce(gear, ignoreMaxStar);
		}
	} else if (diff < 0) {
		const count = gear.star + diff;
		resetEnhancement(gear);
		for (let i = 0; i < count; i++) {
			addStarforce(gear, ignoreMaxStar);
		}
	}
	return gear;
}

export function canAmazingEnhancementChange(gear: Gear, diff: number, ignoreMaxStar: boolean) {
	if (gear.req.level > 150 || gear.getBooleanValue(GearPropType.superiorEqp)) {
		return false;
	}
	if (diff < 0) {
		return false;
	}
	const MAX_STAR = Math.min(gear.maxStar, 15);
	const gearMaxStar = ignoreMaxStar ? 15 : MAX_STAR;
	const targetStar = gear.star + diff;
	return 0 <= targetStar && targetStar <= gearMaxStar;
}

export function doAmazingEnhancementChange(gear: Gear, diff: number, bonus: boolean, ignoreMaxStar: boolean) {
	if (diff > 0) {
		for (let i = 0; i < diff; i++) {
			addAmazingEnhancement(gear, bonus, ignoreMaxStar);
		}
	}
	return gear;
}

export function canResetEnhancement(gear: Gear) {
	return gear.star > 0;
}

export function doResetEnhancement(gear: Gear) {
	resetEnhancement(gear);
	return gear;
}
