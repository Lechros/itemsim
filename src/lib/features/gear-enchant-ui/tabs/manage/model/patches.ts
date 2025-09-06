import { GearCapability, GearType, isWeapon, SpellTraceType, type ReadonlyGear } from '@malib/gear';
import type { Patch } from './patch';

export function getSpecialPatches(gear: ReadonlyGear): Patch[] {
	if (isGenesisOrDestinyWeapon(gear)) {
		if (isDestinyWeapon(gear)) {
			return getStatsFromWeaponType(gear.type).map(getDestinyPatch);
		} else {
			return getStatsFromWeaponType(gear.type).map(getGenesisPatch);
		}
	}
	switch (gear.meta.id) {
		case 1152155: // 스칼렛 숄더
			return [
				{
					name: '스칼렛 숄더',
					desc: '추가 옵션 강화 불가 해제',
					can: {
						add: GearCapability.Can
					}
				}
			];
		case 1190400: // 보스 아레나 엠블렘
			return [
				{
					name: '보스 아레나 엠블렘',
					desc: '추가 옵션 강화 불가 해제',
					can: {
						add: GearCapability.Can
					}
				}
			];
	}
	return [];
}

function isGenesisOrDestinyWeapon(gear: ReadonlyGear): boolean {
	const setItemId = gear.attributes.setItemId;
	return isWeapon(gear.type) && setItemId !== undefined && 886 <= setItemId && setItemId <= 890;
}

function isDestinyWeapon(gear: ReadonlyGear): boolean {
	return isGenesisOrDestinyWeapon(gear) && gear.req.level === 250;
}

function getGenesisPatch(stat: SpellTraceType): Patch {
    const statName = getStatName(stat);
	return {
		name: `제네시스 무기 해방 (${statName})`,
		desc: `${statName} 15% 주문서 강화 8회, 스타포스 22성`,
		star: 22,
		scroll: [[8, stat, 15]]
	};
}

function getDestinyPatch(stat: SpellTraceType): Patch {
	const statName = getStatName(stat);
	return {
		name: `데스티니 무기 해방 (${statName})`,
		desc: `${statName} 15% 주문서 강화 8회, 스타포스 22성`,
		star: 22,
		scroll: [[8, stat, 15]]
	};
}

function getStatName(stat: SpellTraceType): string {
	switch (stat) {
		case SpellTraceType.str:
			return '힘';
		case SpellTraceType.dex:
			return '민첩';
		case SpellTraceType.int:
			return '지능';
		case SpellTraceType.luk:
			return '운';
		case SpellTraceType.maxHp:
			return '체력';
		case SpellTraceType.allStat:
			return '올스탯';
	}
}

function getStatsFromWeaponType(type: GearType): SpellTraceType[] {
	switch (type) {
		case GearType.shiningRod:
			return [SpellTraceType.int];
		case GearType.tuner:
			return [SpellTraceType.str];
		case GearType.breathShooter:
			return [SpellTraceType.dex];
		case GearType.longSword2:
			return [SpellTraceType.str];
		case GearType.soulShooter:
			return [SpellTraceType.dex];
		case GearType.desperado:
			return [SpellTraceType.maxHp];
		case GearType.energySword:
			return [SpellTraceType.str, SpellTraceType.dex, SpellTraceType.luk];
		case GearType.espLimiter:
			return [SpellTraceType.int];
		case GearType.chain:
			return [SpellTraceType.luk];
		case GearType.magicGauntlet:
			return [SpellTraceType.int];
		case GearType.ritualFan:
			return [SpellTraceType.luk];
		case GearType.ohSword:
			return [SpellTraceType.str];
		case GearType.ohAxe:
			return [SpellTraceType.str];
		case GearType.ohBlunt:
			return [SpellTraceType.str];
		case GearType.dagger:
			return [SpellTraceType.luk];
		case GearType.cane:
			return [SpellTraceType.luk];
		case GearType.wand:
			return [SpellTraceType.int];
		case GearType.staff:
			return [SpellTraceType.int];
		case GearType.thSword:
			return [SpellTraceType.str];
		case GearType.chakram:
			return [SpellTraceType.luk];
		case GearType.thAxe:
			return [SpellTraceType.str];
		case GearType.thBlunt:
			return [SpellTraceType.str];
		case GearType.spear:
			return [SpellTraceType.str];
		case GearType.polearm:
			return [SpellTraceType.str];
		case GearType.bow:
			return [SpellTraceType.dex];
		case GearType.crossbow:
			return [SpellTraceType.dex];
		case GearType.claw:
			return [SpellTraceType.luk];
		case GearType.knuckle:
			return [SpellTraceType.str];
		case GearType.gun:
			return [SpellTraceType.dex];
		case GearType.dualBowguns:
			return [SpellTraceType.dex];
		case GearType.handCannon:
			return [SpellTraceType.str];
		case GearType.longSword:
			return [SpellTraceType.str];
		case GearType.heavySword:
			return [SpellTraceType.str];
		case GearType.gauntletRevolver:
			return [SpellTraceType.str];
		case GearType.ancientBow:
			return [SpellTraceType.dex];
		default:
			return [];
	}
}
