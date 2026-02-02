import { getPotentialData } from '$lib/features/gear-enchant-ui/tabs/potential/model/potential';
import { Gear, GearCapability, ReadonlyGear, type GearData, type PotentialData } from '@malib/gear';

/**
 * 장비의 강화/옵션 정보를 장비 정보에 복사합니다.
 * 성공했을 경우, src의 상태는 보장되지 않습니다.
 * 실패했을 경우, dst의 상태는 보장되지 않습니다.
 * 놀라운 장비강화가 적용된 경우 보너스 스탯이 변경될 수 있습니다.
 * @param src 기존 장비의 강화/옵션 정보
 * @param dst 기본 장비 정보
 * @returns 복사가 성공했는지 여부
 */
export function transmit(src: GearData, dst: GearData): boolean {
	const srcGear = new ReadonlyGear(src);
	const dstGear = new Gear(dst);

	// Attributes
	if (srcGear.shape) {
		dstGear.shape = srcGear.shape;
	}
	if (srcGear.attributes.trade !== dstGear.attributes.trade) {
		dstGear.attributes.trade = srcGear.attributes.trade;
	}
	if (srcGear.attributes.cuttable !== dstGear.attributes.cuttable) {
		dstGear.data.attributes.cuttable = srcGear.attributes.cuttable;
	}
	if (srcGear.attributes.cuttableCount !== dstGear.attributes.cuttableCount) {
		dstGear.attributes.cuttableCount = srcGear.attributes.cuttableCount;
	}
	if (srcGear.attributes.totalCuttableCount !== dstGear.attributes.totalCuttableCount) {
		dstGear.data.attributes.totalCuttableCount = srcGear.attributes.totalCuttableCount;
	}
	if (srcGear.itemTag !== dstGear.itemTag) {
		dstGear.itemTag = srcGear.itemTag;
	}

	// Scroll
	const canScroll = dstGear.attributes.canScroll;
	dstGear.data.attributes.canScroll = GearCapability.Can;
	dstGear.resetUpgrade();
	if (srcGear.scrollUpgradeCount) {
		dstGear.applyScroll({ name: '', option: srcGear.upgradeOption });
		for (let i = 1; i < srcGear.scrollUpgradeCount; i++) {
			dstGear.applyScroll({ name: '', option: {} });
		}
	}
	if (srcGear.scrollResilienceCount) {
		for (let i = 0; i < srcGear.scrollResilienceCount; i++) {
			dstGear.applyScrollFail();
		}
	}
	dstGear.data.attributes.canScroll = canScroll;

	// Starforce
	const canStarforce = dstGear.attributes.canStarforce;
	dstGear.data.attributes.canStarforce = GearCapability.Can;
	dstGear.resetStarforce();
	if (srcGear.star) {
		for (let i = 0; i < srcGear.star; i++) {
			if (srcGear.starScroll) {
				dstGear.applyStarScrollIgnoringMaxStar(false);
			} else {
				dstGear.applyStarforceIgnoringMaxStar();
			}
		}
	}
	dstGear.data.attributes.canStarforce = canStarforce;

	// AddOption
	const canAddOption = dstGear.attributes.canAddOption;
	dstGear.data.attributes.canAddOption = GearCapability.Can;
	dstGear.resetAddOption();
	if (srcGear.addOptions.length > 0) {
		for (const option of srcGear.addOptions) {
			dstGear.applyAddOption(option.type, option.grade);
		}
	}
	dstGear.data.attributes.canAddOption = canAddOption;

	// Potential
	const canPotential = dstGear.attributes.canPotential;
	dstGear.data.attributes.canPotential = GearCapability.Can;
	dstGear.resetPotential();
	if (srcGear.potentialGrade && srcGear.potentials.length > 0) {
		dstGear.setPotential(
			srcGear.potentialGrade,
			srcGear.potentials.map((p) => safeGetPotentialData(dstGear, p))
		);
	}
	dstGear.data.attributes.canPotential = canPotential;

    // Additional Potential
	const canAdditionalPotential = dstGear.attributes.canAdditionalPotential;
	dstGear.data.attributes.canAdditionalPotential = GearCapability.Can;
	dstGear.resetAdditionalPotential();
	if (srcGear.additionalPotentialGrade && srcGear.additionalPotentials.length > 0) {
		dstGear.setAdditionalPotential(
			srcGear.additionalPotentialGrade,
			srcGear.additionalPotentials.map((p) => safeGetPotentialData(dstGear, p))
		);
	}
	dstGear.data.attributes.canAdditionalPotential = canAdditionalPotential;

	// Exceptional
	if (srcGear.exceptionalUpgradeCount > 0) {
		dstGear.resetExceptional();
		dstGear.applyExceptional({ name: '', option: srcGear.exceptionalOption });
		for (let i = 1; i < srcGear.exceptionalUpgradeCount; i++) {
			dstGear.applyExceptional({ name: '', option: {} });
		}
	}

	// Soul
	if (srcGear.soulEnchanted) {
		dstGear.data.soulSlot = srcGear.data.soulSlot;
	}

	return true;
}

function safeGetPotentialData(gear: ReadonlyGear, potential: PotentialData): PotentialData {
	if (!potential.id) {
		return potential;
	}
	return getPotentialData(potential.id, gear.req.level + gear.req.levelIncrease);
}
