import {
	GearType,
	isSubWeapon,
	isWeapon,
	PotentialGrade,
	ReadonlyGear,
	type GearOption,
	type PotentialData
} from '@malib/gear';
import { getAdditionalPotentialCodes, getPotentialCodes } from './codes';
import itemOptionData from './item-option.json';

export interface ItemOption {
	level: Record<number, { string: string; option: Partial<GearOption> }>;
	optionType?: number;
	reqLevel?: number;
}

const itemOptions: Record<number, ItemOption> = itemOptionData;

export function getGradePotentialDatas(gear: ReadonlyGear, grade: PotentialGrade): PotentialData[] {
	const codes = getPotentialCodes(grade);
	return getPotentialDatasByCodes(codes, gear.type, gear.req.level + gear.req.levelIncrease);
}

export function getGradeAdditionalPotentialDatas(
	gear: ReadonlyGear,
	grade: PotentialGrade
): PotentialData[] {
	const codes = getAdditionalPotentialCodes(grade);
	return getPotentialDatasByCodes(codes, gear.type, gear.req.level + gear.req.levelIncrease);
}

export function getPotentialDatasByCodes(
	codes: number[],
	gearType: GearType,
	gearReqLevel: number
) {
	return codes
		.map((code) => {
			const itemOption = itemOptions[code];
			if (itemOption.optionType) {
				if (!checkOptionType(itemOption.optionType, gearType)) return null;
			}
			if (itemOption.reqLevel) {
				if (gearReqLevel < itemOption.reqLevel) return null;
			}
			const level = getPotentialLevel(gearReqLevel);
			const levelData = itemOption.level[level];
			return {
				id: code,
				grade: Math.floor(code / 10000),
				summary: levelData.string,
				option: { ...levelData.option }
			};
		})
		.filter((potential) => potential !== null);
}

function getPotentialLevel(gearReqLevel: number) {
	if (gearReqLevel <= 0) return 1;
	else if (gearReqLevel >= 250) return 25;
	else return Math.floor((gearReqLevel + 9) / 10);
}

function checkOptionType(optionType: number, gearType: GearType): boolean {
	switch (optionType) {
		case 0:
			return true;
		case 10:
			return isWeapon(gearType) || isSubWeapon(gearType) || gearType === GearType.emblem;
		case 11:
			return !checkOptionType(10, gearType);
		case 20:
			return (
				isSubWeapon(gearType) ||
				gearType === GearType.cap ||
				gearType === GearType.coat ||
				gearType === GearType.longcoat ||
				gearType === GearType.pants ||
				gearType === GearType.shoes ||
				gearType === GearType.glove ||
				gearType === GearType.cape ||
				gearType === GearType.belt ||
				gearType === GearType.shoulder
			);
		case 40:
			return (
				gearType === GearType.faceAccessory ||
				gearType === GearType.eyeAccessory ||
				gearType === GearType.earrings ||
				gearType === GearType.ring ||
				gearType === GearType.pendant
			);
		case 51:
			return gearType === GearType.cap;
		case 52:
			return gearType === GearType.coat || gearType === GearType.longcoat;
		case 53:
			return gearType === GearType.pants;
		case 54:
			return gearType === GearType.glove;
		case 55:
			return gearType === GearType.shoes;
		default:
			return false;
	}
}
