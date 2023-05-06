import { BonusStatType, Gear, GearPropType, GearType } from '@malib/gear';

export function canBonus(gear: Gear) {
	if (Gear.isArmor(gear.type)) {
		if (Gear.isShield(gear.type)) {
			return false;
		}
		return true;
	}
	if (Gear.isAccessory(gear.type)) {
		if (gear.type === GearType.ring) {
			return false;
		}
		if (gear.type === GearType.shoulder) {
			if (gear.itemID === 1152155) return true;
			return false;
		}
		return true;
	}
	if (gear.type == GearType.pocket) {
		return true;
	}
	if (Gear.isWeapon(gear.type)) {
		return true;
	}
	return false;
}

export function getBonusTypes(gear: Gear) {
	const types = [
		BonusStatType.STR,
		BonusStatType.DEX,
		BonusStatType.INT,
		BonusStatType.LUK,
		BonusStatType.STR_DEX,
		BonusStatType.STR_INT,
		BonusStatType.STR_LUK,
		BonusStatType.DEX_INT,
		BonusStatType.DEX_LUK,
		BonusStatType.INT_LUK,
		BonusStatType.MHP,
		BonusStatType.MMP
	];
	if (Gear.isWeapon(gear.type)) {
		types.push(BonusStatType.PAD, BonusStatType.MAD);
	} else if (gear.req.level >= 60) {
		types.push(BonusStatType.PAD, BonusStatType.MAD);
	}
	types.push(BonusStatType.PDD);
	if (Gear.isWeapon(gear.type)) {
		if (gear.req.level >= 90) types.push(BonusStatType.bdR);
		types.push(BonusStatType.damR);
	} else {
		types.push(BonusStatType.speed, BonusStatType.jump);
	}
	if (gear.req.level >= 70) {
		types.push(BonusStatType.allStatR);
	}
	types.push(BonusStatType.reduceReq);
	return types;
}

export function getBonusGrades(gear: Gear) {
	if (gear.getBooleanValue(GearPropType.bossReward)) {
		return [3, 4, 5, 6, 7] as const;
	} else {
		return [1, 2, 3, 4, 5, 6, 7] as const;
	}
}
