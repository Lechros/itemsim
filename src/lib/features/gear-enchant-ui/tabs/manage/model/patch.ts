import {
	Gear,
	GearCapability,
	getSpellTraceScroll,
	SpellTraceType,
	toGearOption,
	type AddOptionGrade,
	type AddOptionType,
	type GearUpgradeOption,
	type ReadonlyGear,
	type SpellTraceRate
} from '@malib/gear';

export interface Patch {
	name: string;
	desc: string;
	can?: {
		star?: GearCapability;
		scroll?: GearCapability;
		add?: GearCapability;
		potential?: GearCapability;
		additionalPotential?: GearCapability;
	};
	star?: number;
	scroll?: [number, SpellTraceType, SpellTraceRate][];
	add?: [AddOptionType, AddOptionGrade][];
}

export function applyPatch(gear: Gear, patch: Patch) {
	if (patch.can?.star !== undefined) {
		gear.data.attributes.canStarforce = patch.can.star;
	}
	if (patch.can?.scroll !== undefined) {
		gear.data.attributes.canScroll = patch.can.scroll;
	}
	if (patch.can?.add !== undefined) {
		gear.data.attributes.canAddOption = patch.can.add;
	}
	if (patch.can?.potential !== undefined) {
		gear.data.attributes.canPotential = patch.can.potential;
	}
	if (patch.can?.additionalPotential !== undefined) {
		gear.data.attributes.canAdditionalPotential = patch.can.additionalPotential;
	}
	if (patch.star !== undefined) {
		const can = gear.data.attributes.canStarforce;
		gear.data.attributes.canStarforce = GearCapability.Can;
		gear.resetStarforce();
		while (gear.star < patch.star) {
			gear.applyStarforceIgnoringMaxStar();
		}
		gear.data.attributes.canStarforce = can;
	}
	if (patch.scroll !== undefined) {
		const can = gear.data.attributes.canScroll;
		gear.data.attributes.canScroll = GearCapability.Can;
		gear.resetUpgrade();
		for (const [count, type, rate] of patch.scroll) {
			for (let i = 0; i < count; i++) {
				gear.applySpellTrace(type, rate);
			}
		}
		gear.data.attributes.canScroll = can;
	}
	if (patch.add !== undefined) {
		const can = gear.data.attributes.canAddOption;
		gear.data.attributes.canAddOption = GearCapability.Can;
		gear.resetAddOption();
		for (const [type, grade] of patch.add) {
			gear.applyAddOption(type, grade);
		}
		gear.data.attributes.canAddOption = can;
	}
}

export function isPatchSatisfied(gear: ReadonlyGear, patch: Patch): boolean {
	if (patch.can?.star !== undefined && gear.data.attributes.canStarforce !== patch.can.star) {
		return false;
	}
	if (patch.can?.scroll !== undefined && gear.data.attributes.canScroll !== patch.can.scroll) {
		return false;
	}
	if (patch.can?.add !== undefined && gear.data.attributes.canAddOption !== patch.can.add) {
		return false;
	}
	if (
		patch.can?.potential !== undefined &&
		gear.data.attributes.canPotential !== patch.can.potential
	) {
		return false;
	}
	if (
		patch.can?.additionalPotential !== undefined &&
		gear.data.attributes.canAdditionalPotential !== patch.can.additionalPotential
	) {
		return false;
	}
	if (patch.star !== undefined && gear.star !== patch.star) {
		return false;
	}
	if (patch.scroll !== undefined) {
		if (gear.scrollUpgradeCount !== patch.scroll.reduce((acc, cur) => acc + cur[0], 0)) {
			return false;
		}
		const option = toGearOption({});
		for (const [count, type, rate] of patch.scroll) {
			for (let i = 0; i < count; i++) {
				const scroll = getSpellTraceScroll(gear, type, rate);
				for (const [stat, value] of Object.entries(scroll.option)) {
					option[stat as keyof GearUpgradeOption] += value;
				}
			}
		}
		// Check gear.upgradeOption == option
		for (const [stat, value] of Object.entries(option)) {
			if (gear.upgradeOption[stat as keyof GearUpgradeOption] !== value) {
				return false;
			}
		}
	}
	if (patch.add !== undefined) {
		if (gear.addOptions.length !== patch.add.length) {
			return false;
		}
		for (let i = 0; i < gear.addOptions.length; i++) {
			if (
				gear.addOptions[i].type !== patch.add[i][0] ||
				gear.addOptions[i].grade !== patch.add[i][1]
			) {
				return false;
			}
		}
	}
	return true;
}
