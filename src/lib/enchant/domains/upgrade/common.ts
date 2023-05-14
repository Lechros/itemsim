import {
	Gear,
	GearPropType,
	addUpgradeFailCount,
	applyGoldHammer,
	applyScroll,
	resetEnhancement,
	resetUpgrade,
	restoreUpgradeCount,
	type Scroll
} from '@malib/gear';

export function canUpgrade(gear: Gear) {
	return gear.totalUpgradeCount > 0;
}

export function canGoldHammer(gear: Gear) {
	return (
		gear.hammerCount == 0 &&
		!gear.getBooleanValue(GearPropType.exceptUpgrade) &&
		!gear.getBooleanValue(GearPropType.blockGoldHammer)
	);
}

export function doGoldHammer(gear: Gear) {
	applyGoldHammer(gear);
	return gear;
}

export function canFailScroll(gear: Gear) {
	return (
		!gear.getBooleanValue(GearPropType.exceptUpgrade) &&
		!gear.getBooleanValue(GearPropType.onlyUpgrade) &&
		gear.upgradeCountLeft > 0
	);
}

export function doFailScroll(gear: Gear) {
	addUpgradeFailCount(gear);
	return gear;
}

export function canCleanSlateScroll(gear: Gear) {
	return gear.upgradeFailCount > 0;
}

export function doCleanSlateScroll(gear: Gear) {
	restoreUpgradeCount(gear);
	return gear;
}

export function canInnocentScroll(gear: Gear) {
	return (
		gear.hammerCount > 0 || gear.upgradeCount > 0 || gear.upgradeFailCount > 0 || gear.star > 0
	);
}

export function doInnocentScroll(gear: Gear) {
	resetUpgrade(gear);
	resetEnhancement(gear);
	return gear;
}

export function canArkInnocentScroll(gear: Gear) {
	return (
		!gear.amazing && (gear.hammerCount > 0 || gear.upgradeCount > 0 || gear.upgradeFailCount > 0)
	);
}

export function doArkInnocentScroll(gear: Gear) {
	resetUpgrade(gear);
	return gear;
}

export function canApplyScroll(gear: Gear) {
	return gear.upgradeCountLeft > 0;
}

export function isOnlyUpgradeGear(gear: Gear) {
	return gear.getBooleanValue(GearPropType.onlyUpgrade);
}

export function doApplyScroll(gear: Gear, scroll: Scroll) {
	applyScroll(gear, scroll);
	return gear;
}

export function doApplyScrollFull(gear: Gear, scroll: Scroll) {
	const count = gear.upgradeCountLeft;
	for (let i = 0; i < count; i++) {
		applyScroll(gear, scroll);
	}
	return gear;
}
