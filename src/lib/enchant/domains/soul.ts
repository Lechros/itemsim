import { getSoulOptionString } from '$lib/gear-tooltip/strings';
import {
	ItemIndex,
	MagnificentSoulOptionType,
	createSoulFromId,
	soulJson
} from '@malib/create-gear';
import { Gear, type Soul } from '@malib/gear';

export function canSoul(gear: Gear) {
	return Gear.isWeapon(gear.type) && gear.req.level >= 30;
}

export function canSoulEnchant(gear: Gear) {
	return !gear.soulWeapon.enchanted;
}

export function doSoulEnchant(gear: Gear) {
	gear.soulWeapon.enchant();
	return gear;
}

export function canSoulDisenchant(gear: Gear) {
	return gear.soulWeapon.enchanted;
}

export function doSoulDisenchant(gear: Gear) {
	gear.soulWeapon.disenchant();
	return gear;
}

export function canSetSoul(gear: Gear) {
	return gear.soulWeapon.enchanted;
}

export function doSetSoul(gear: Gear, soulId: number, type: MagnificentSoulOptionType) {
	const soul = createSoulFromId(soulId, type);
	if (soul) {
		gear.soulWeapon.setSoul(soul);
	}
	return gear;
}

export function canRemoveSoul(gear: Gear) {
	return gear.soulWeapon.soul !== undefined;
}

export function doRemoveSoul(gear: Gear) {
	gear.soulWeapon.removeSoul();
	return gear;
}

const soulIndex = getSoulIndex();

export function getSoulInfo(soul: Soul) {
	const soulId = soulIndex.getId(soul.name);
	if (!soulId) {
		return undefined;
	}
	for (const type of Object.values(MagnificentSoulOptionType)) {
		const trySoul = createSoulFromId(soulId, type);
		if (!trySoul) continue;
		if (getSoulOptionString(trySoul.option) === getSoulOptionString(soul.option)) {
			return {
				id: soulId,
				type
			};
		}
	}
	return undefined;
}

export function getMagnificentTypes() {
	return [
		MagnificentSoulOptionType.PAD,
		MagnificentSoulOptionType.MAD,
		MagnificentSoulOptionType.allStat,
		MagnificentSoulOptionType.MHP,
		MagnificentSoulOptionType.cr,
		MagnificentSoulOptionType.bdR,
		MagnificentSoulOptionType.imdR
	];
}

export function getSoulIndex() {
	return new ItemIndex(soulJson);
}
