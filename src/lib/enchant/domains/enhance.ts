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

export function canStarforceChange(gear: Gear, diff: number) {
	if (diff === 0) {
		return true;
	} else if (diff > 0) {
		return gear.star + diff <= gear.maxStar;
	} else {
		return !gear.amazing && gear.star + diff >= 0;
	}
}

export function doStarforceChange(gear: Gear, diff: number) {
	if (diff > 0) {
		for (let i = 0; i < diff; i++) {
			addStarforce(gear);
		}
	} else if (diff < 0) {
		const count = gear.star + diff;
		resetEnhancement(gear);
		for (let i = 0; i < count; i++) {
			addStarforce(gear);
		}
	}
	return gear;
}

export function canAmazingEnhancementChange(gear: Gear, diff: number) {
	if (gear.req.level > 150 || gear.getBooleanValue(GearPropType.superiorEqp)) {
		return false;
	}
	if (diff === 0) {
		return true;
	} else if (diff > 0) {
		return gear.star + diff <= gear.maxStar && gear.star + diff <= 15;
	} else {
		return false;
	}
}

export function doAmazingEnhancementChange(gear: Gear, diff: number, bonus: boolean) {
	if (diff > 0) {
		for (let i = 0; i < diff; i++) {
			addAmazingEnhancement(gear, bonus);
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
