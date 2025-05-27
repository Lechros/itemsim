import {
	isWeapon,
	isSubWeapon,
	PotentialGrade,
	ReadonlyGear,
	type GearOption,
	type PotentialData,
	GearType
} from '@malib/gear';
import itemOptionData from './item-option.json';

export interface ItemOption {
	level: Record<number, { string: string; option: Partial<GearOption> }>;
	optionType?: number;
	reqLevel?: number;
}

const itemOptions: Record<number, ItemOption> = itemOptionData;

export function getPotentialDatas(gear: ReadonlyGear, grade: PotentialGrade): PotentialData[] {
	const codes = getPotentialCodes(grade);
	return codes
		.map((code) => {
			const itemOption = itemOptions[code];
			if (itemOption.optionType) {
				if (!checkOptionType(itemOption.optionType, gear.type)) return null;
			}
			const gearReqLevel = gear.req.level + gear.req.levelIncrease;
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

export function getAdditionalPotentialDatas(
	gear: ReadonlyGear,
	grade: PotentialGrade
): PotentialData[] {
	const codes = getAddPotentialCodes(grade);
	return codes
		.map((code) => {
			const itemOption = itemOptions[code];
			if (itemOption.optionType) {
				if (!checkOptionType(itemOption.optionType, gear.type)) return null;
			}
			const gearReqLevel = gear.req.level + gear.req.levelIncrease;
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

function getPotentialCodes(grade: PotentialGrade) {
	switch (grade) {
		case PotentialGrade.Normal:
			return [1, 2, 3, 4, 5, 6, 9, 10, 11, 12, 13];
		case PotentialGrade.Rare:
			return [
				10001, 10002, 10003, 10004, 10005, 10006, 10009, 10010, 10011, 10012, 10013, 10041, 10042,
				10043, 10044, 10045, 10046, 10051, 10052, 10053, 10055, 10070, 10081, 10151, 10156, 10201,
				10202, 10206, 10207, 10221, 10222, 10226, 10227, 10231, 10232, 10236, 10237, 10241, 10242,
				10246, 10247, 10291
			];
		case PotentialGrade.Epic:
			return [
				20041, 20042, 20043, 20044, 20045, 20046, 20051, 20052, 20053, 20055, 20070, 20086, 20201,
				20202, 20206, 20207, 20291, 20351, 20352, 20353, 20366, 20401, 20406
			];
		case PotentialGrade.Unique:
			return [
				30041, 30042, 30043, 30044, 30045, 30046, 30051, 30052, 30053, 30055, 30070, 30086, 30091,
				30092, 30093, 30094, 30291, 30356, 30357, 30366, 30371, 30376, 30377, 30551, 30602, 30701,
				30702, 31001, 31002, 31003, 31004
			];
		case PotentialGrade.Legendary:
			return [
				40041, 40042, 40043, 40044, 40045, 40046, 40051, 40052, 40053, 40055, 40056, 40070, 40086,
				40091, 40092, 40291, 40292, 40356, 40357, 40366, 40371, 40376, 40377, 40501, 40502, 40551,
				40556, 40557, 40602, 40603, 40650, 40656, 40701, 40702, 40703, 41005, 41006, 41007
			];
		default:
			return [];
	}
}

function getAddPotentialCodes(grade: PotentialGrade) {
	switch (grade) {
		case PotentialGrade.Normal:
			return [2001, 2002, 2003, 2004, 2005, 2006, 2009, 2010, 2011, 2012, 2013, 2015, 2016];
		case PotentialGrade.Rare:
			return [
				12001, 12002, 12003, 12004, 12005, 12006, 12009, 12010, 12011, 12012, 12013, 12015, 12016,
				12017, 12018, 12019, 12020, 12041, 12042, 12043, 12044, 12045, 12046, 12047, 12048, 12049,
				12050, 12051, 12052, 12053, 12055, 12070, 12081, 12082
			];
		case PotentialGrade.Epic:
			return [
				22001, 22002, 22003, 22004, 22005, 22006, 22009, 22010, 22011, 22012, 22013, 22041, 22042,
				22043, 22044, 22045, 22046, 22051, 22052, 22053, 22055, 22057, 22058, 22059, 22060, 22070,
				22086, 22087, 22201, 22206, 22291
			];
		case PotentialGrade.Unique:
			return [
				32001, 32002, 32003, 32004, 32005, 32006, 32011, 32012, 32013, 32041, 32042, 32043, 32044,
				32045, 32046, 32051, 32053, 32055, 32057, 32059, 32060, 32061, 32062, 32070, 32086, 32087,
				32091, 32092, 32093, 32094, 32201, 32206, 32291, 32551, 32601
			];
		case PotentialGrade.Legendary:
			return [
				42001, 42002, 42003, 42004, 42005, 42006, 42011, 42012, 42013, 42041, 42042, 42043, 42044,
				42045, 42046, 42051, 42053, 42055, 42057, 42059, 42060, 42063, 42064, 42065, 42066, 42070,
				42086, 42087, 42091, 42092, 42093, 42094, 42095, 42096, 42292, 42501, 42551, 42556, 42602,
				42650, 42656
			];
		default:
			return [];
	}
}
