import type { Gear } from '@malib/gear';

export function showStarforceIgnoreMaxStar(gear: Gear) {
	return gear.req.level + gear.req.levelIncrease < 140;
}

export function canAddStarforce(gear: Gear, star: number, ignoreMaxStar: boolean) {
	if (ignoreMaxStar) {
		return gear.canApplyStarforceIgnoringMaxStar && gear.star + star <= 30;
	} else {
		return gear.canApplyStarforce && gear.star + star <= gear.maxStar;
	}
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

export function canSetStarforce(gear: Gear, star: number) {
	return !gear.starScroll && gear.canResetStarforce && star <= gear.maxStar;
}

export function setStarforce(gear: Gear, star: number) {
	gear.resetStarforce();
	for (let i = 0; i < star; i++) {
		gear.applyStarforce();
	}
}
