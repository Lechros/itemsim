import type { Gear } from '@malib/gear';

export function showStarforceIgnoreMaxStar(gear: Gear) {
	return gear.req.level + gear.req.levelIncrease < 140;
}

export function getImplicitMaxStar(gear: Gear, ignoreMaxStar: boolean) {
	if (ignoreMaxStar) {
		const reqLevel = gear.req.level + gear.req.levelIncrease;
		if (reqLevel >= 140) {
			return 30;
		} else if (reqLevel >= 111) {
			return 29;
		} else if (reqLevel >= 101) {
			return 19;
		} else {
			return 15;
		}
	}
	return gear.maxStar;
}

export function canAddStarforce(gear: Gear, star: number, ignoreMaxStar: boolean) {
	return !gear.starScroll && gear.star + star <= getImplicitMaxStar(gear, ignoreMaxStar);
}

export function addStarforce(gear: Gear, star: number, ignoreMaxStar: boolean) {
	for (let i = 0; i < star; i++) {
		if (ignoreMaxStar) {
			if (gear.canApplyStarforceIgnoringMaxStar) {
				gear.applyStarforceIgnoringMaxStar();
			}
		} else {
			if (gear.canApplyStarforce) {
				gear.applyStarforce();
			}
		}
	}
}

export function canRemoveStarforce(gear: Gear, star: number) {
	return !gear.starScroll && gear.canResetStarforce && gear.star - star >= 0;
}

export function removeStarforce(gear: Gear, star: number, ignoreMaxStar: boolean) {
	const targetStar = gear.star - star;
	gear.resetStarforce();
	for (let i = 0; i < targetStar; i++) {
		if (ignoreMaxStar) {
			if (gear.canApplyStarforceIgnoringMaxStar) {
				gear.applyStarforceIgnoringMaxStar();
			}
		} else {
			if (gear.canApplyStarforce) {
				gear.applyStarforce();
			}
		}
	}
}

export function canSetStarforce(gear: Gear, star: number, ignoreMaxStar = false) {
	if (!gear.canResetStarforce || gear.starScroll) {
		return false;
	}
	return star >= 0 && star <= getImplicitMaxStar(gear, ignoreMaxStar);
}

export function setStarforce(gear: Gear, star: number, ignoreMaxStar = false) {
	if (!canSetStarforce(gear, star, ignoreMaxStar)) {
		return;
	}
	gear.resetStarforce();
	if (ignoreMaxStar) {
		for (let i = 0; i < star; i++) {
			if (gear.canApplyStarforceIgnoringMaxStar) {
				gear.applyStarforceIgnoringMaxStar();
			}
		}
	} else {
		for (let i = 0; i < star; i++) {
			if (gear.canApplyStarforce) {
				gear.applyStarforce();
			}
		}
	}
}
