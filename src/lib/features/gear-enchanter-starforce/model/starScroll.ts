import type { Gear } from '@malib/gear';

export function showStarScrollTab(gear: Gear) {
	return gear.req.level <= 150 && !gear.attributes.superior;
}

export function showStarScrollIgnoreMaxStar(gear: Gear) {
	return gear.req.level + gear.req.levelIncrease < 120;
}

export function canAddStarScroll(gear: Gear, star: number, ignoreMaxStar: boolean) {
	if (ignoreMaxStar) {
		return gear.canApplyStarScrollIgnoringMaxStar && star <= 15;
	} else {
		return gear.canApplyStarScroll && star <= gear.maxStar && star <= 15;
	}
}

export function addStarScroll(gear: Gear, star: number, bonus: boolean, ignoreMaxStar: boolean) {
	for (let i = 0; i < star; i++) {
		if (ignoreMaxStar) {
			if (gear.canApplyStarScrollIgnoringMaxStar) {
				gear.applyStarScrollIgnoringMaxStar(bonus);
			}
		} else {
			if (gear.canApplyStarScroll) {
				gear.applyStarScroll(bonus);
			}
		}
	}
}

export function canSetStarScroll(gear: Gear, star: number, ignoreMaxStar: boolean) {
	if (gear.star > 0) return false;
	if (ignoreMaxStar) {
		return gear.canResetStarforce && star <= 15;
	} else {
		return gear.canResetStarforce && star <= gear.maxStar && star <= 15;
	}
}

export function setStarScroll(gear: Gear, star: number, bonus: boolean, ignoreMaxStar: boolean) {
	gear.resetStarforce();
	if (ignoreMaxStar) {
		for (let i = 0; i < star; i++) {
			if (gear.canApplyStarScrollIgnoringMaxStar) {
				gear.applyStarScrollIgnoringMaxStar(bonus);
			}
		}
	} else {
		for (let i = 0; i < star; i++) {
			if (gear.canApplyStarScroll) {
				gear.applyStarScroll(bonus);
			}
		}
	}
}
