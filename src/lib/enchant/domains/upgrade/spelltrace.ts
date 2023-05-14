import {
	GearPropType,
	GearType,
	applyScroll,
	applySpellTrace,
	getSpellTraceScroll,
	recalculateStarforce,
	Gear,
	type Scroll,
	type SpellTraceProbability,
	type SpellTraceStatType
} from '@malib/gear';

export class SpellTraceEnchanter {
	constructor(gear: Gear) {
		this.gear = gear;
		this.probs = getSpellTraceProbs(gear);
		this.infos = getSpellTraceInfos(gear);
	}

	gear: Gear;
	probs: SpellTraceProbability[];
	infos: SpellTraceInfo[];
	/** 4번째 강화일 시 주문의 흔적 */
	infos4: SpellTraceInfo[] | undefined;

	getProbs() {
		return this.probs;
	}

	getInfos() {
		if (this.gear.upgradeCount + 1 === 4) {
			return this.infos4 ?? (this.infos4 = getSpellTraceInfos(this.gear));
		} else {
			return this.infos;
		}
	}

	apply(gear: Gear, info: SpellTraceInfo) {
		applyScroll(gear, info.scroll);
		recalculateStarforce(gear);
		return gear;
	}

	applyFull(gear: Gear, info: SpellTraceInfo) {
		const count = gear.upgradeCountLeft;
		for (let i = 0; i < count; i++) {
			if (gear.upgradeCount + 1 === 4) {
				applySpellTrace(gear, info.type, info.prob);
			} else {
				applyScroll(gear, info.scroll);
			}
		}
		recalculateStarforce(gear);
		return gear;
	}

	static getUpdatedInstance(gear: Gear | undefined, prev: SpellTraceEnchanter | undefined) {
		if (!gear) return undefined;
		if (prev && prev.gear.itemID == gear.itemID) return prev;
		return new this(gear);
	}
}

export type SpellTraceInfo = {
	scroll: Scroll;
	type: SpellTraceStatType;
	prob: SpellTraceProbability;
};

export function getSpellTraceInfos(gear: Gear) {
	const infos: SpellTraceInfo[] = [];
	const types = getSpellTraceTypes(gear);
	const probs = getSpellTraceProbs(gear);
	for (const type of types) {
		for (const prob of probs) {
			const scroll = getSpellTraceScroll(gear, type, prob);
			if (scroll && !infos.some((info) => info.scroll.name === scroll.name)) {
				infos.push({ scroll: scroll, type: type, prob: prob });
			}
		}
	}
	return infos;
}

export function getSpellTraceTypes(gear: Gear): SpellTraceStatType[] {
	const jobStat = [
		[GearPropType.incSTR, GearPropType.incMHP],
		[GearPropType.incINT],
		[GearPropType.incDEX],
		[GearPropType.incSTR, GearPropType.incDEX, GearPropType.incLUK],
		[GearPropType.incSTR, GearPropType.incDEX, GearPropType.incLUK]
	] as const;
	let types: SpellTraceStatType[] = [];
	if (gear.req.job === 0) {
		if (Gear.isWeapon(gear.type) || gear.type === GearType.katara) {
			types = [
				GearPropType.incSTR,
				GearPropType.incDEX,
				GearPropType.incLUK,
				GearPropType.incMHP,
				GearPropType.incINT
			];
		} else {
			types = [
				GearPropType.incSTR,
				GearPropType.incINT,
				GearPropType.incDEX,
				GearPropType.incLUK,
				GearPropType.incMHP
			];
		}
	} else {
		for (let i = 0; i < 5; i++) {
			if ((gear.req.job & (1 << i)) !== 0) {
				for (const stat of jobStat[i]) {
					if (!types.includes(stat)) types.push(stat);
				}
			}
		}
		types.sort((a, b) => a - b);
	}
	if (Gear.isArmor(gear.type) || Gear.isAccessory(gear.type)) {
		types.push(GearPropType.incAllStat);
	}
	return types;
}

export function getSpellTraceProbs(gear: Gear): SpellTraceProbability[] {
	if (Gear.isWeapon(gear.type) || gear.type == GearType.katara || Gear.isArmor(gear.type)) {
		return [100, 70, 30, 15];
	} else {
		return [100, 70, 30];
	}
}
