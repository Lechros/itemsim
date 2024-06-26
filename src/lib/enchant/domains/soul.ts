import { getSoulOptionString } from '$lib/gear-tooltip/strings';
import { soulRepository, souls } from '$lib/malib-repository/soul';
import {
	Gear,
	MagnificentSoulOptionType,
	type Soul,
	type SoulData,
	type SoulDataMap
} from '@malib/gear';

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
	const soul = soulRepository.createSoulFromId(soulId, type);
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

export function getSoulInfo(soul: Soul) {
	const soulId = getSoulId(soul.name);
	if (!soulId) {
		return undefined;
	}
	for (const type of getMagnificentTypes()) {
		const trySoul = soulRepository.createSoulFromId(soulId, type);
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

export function isMagnificentSoul(soulId: number): boolean {
	return (souls as SoulDataMap)[soulId]?.magnificent === true;
}

export function getSoulEntries(): [number, SoulData][] {
	return Object.entries(souls as SoulDataMap).map(([id, data]) => [Number(id), data]);
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

const soulIndex = getSoulIndex();

function getSoulId(name: string): number {
	return soulIndex[name];
}

function getSoulIndex() {
	const map: { [name: string]: number } = {};
	for (const [id, data] of Object.entries(souls)) {
		map[data.name] = Number(id);
	}
	return map;
}
