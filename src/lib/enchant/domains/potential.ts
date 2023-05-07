import { createPotentialFromCode } from '@malib/create-gear';
import { Gear, GearPropType, Potential, PotentialGrade } from '@malib/gear';

export function canPotential(gear: Gear) {
	return gear.canPotential && !gear.getBooleanValue(GearPropType.fixedPotential);
}

export function getGearPotentialCodes(gear: Gear) {
	return [
		gear.potentials[0]?.code ?? 0,
		gear.potentials[1]?.code ?? 0,
		gear.potentials[2]?.code ?? 0
	];
}

export function getGearAddPotentialCodes(gear: Gear) {
	return [
		gear.additionalPotentials[0]?.code ?? 0,
		gear.additionalPotentials[1]?.code ?? 0,
		gear.additionalPotentials[2]?.code ?? 0
	];
}

export function getDefaultPotentialCodes() {
	return [0, 0, 0];
}

export function getDefaultAddPotentialCodes() {
	return [0, 0, 0];
}

export class GearPotentialCache {
	constructor(gear: Gear) {
		this.gearId = gear.itemID;
		this.potentials = new Map();
		this.additionalPotentials = new Map();
		for (const grade of [
			PotentialGrade.normal,
			PotentialGrade.rare,
			PotentialGrade.epic,
			PotentialGrade.unique,
			PotentialGrade.legendary
		]) {
			this.potentials.set(grade, createPotentials(gear, getPotentialCodes(grade)));
			this.additionalPotentials.set(grade, createPotentials(gear, getAddPotentialCodes(grade)));
		}
	}

	gearId: number;
	potentials: Map<PotentialGrade, Potential[]>;
	additionalPotentials: Map<PotentialGrade, Potential[]>;

	/**
	 * 잠재능력 등급에 따른 첫 번째 옵션 목록
	 */
	getFirstPotentials(grade: PotentialGrade) {
		return this.potentials.get(grade) ?? [];
	}

	/**
	 * 잠재능력 등급에 따른 두 번째 이후 옵션 목록
	 */
	getSecondPotentials(grade: PotentialGrade) {
		return this.potentials.get(grade - 1) ?? [];
	}

	/**
	 * 에디셔널 잠재능력 등급에 따른 첫 번째 옵션 목록
	 */
	getFirstAddPotentials(grade: PotentialGrade) {
		return this.additionalPotentials.get(grade) ?? [];
	}

	/**
	 * 에디셔널 잠재능력 등급에 따른 두 번째 이후 옵션 목록
	 */
	getSecondAddPotentials(grade: PotentialGrade) {
		return this.additionalPotentials.get(grade) ?? [];
	}

	static getUpdatedInstance(gear: Gear | undefined, prev: GearPotentialCache | undefined) {
		if (!gear) return undefined;
		if (prev && prev.gearId == gear.itemID) return prev;
		return new this(gear);
	}
}

function createPotentials(gear: Gear, codes: number[]) {
	const potentialLevel = Potential.getPotentialLevel(gear.req.level);
	return codes
		.map((code) => createPotentialFromCode(code, potentialLevel))
		.filter((pot): pot is Potential => isPossiblePotential(gear, pot));
}

function isPossiblePotential(gear: Gear, potential: Potential | undefined) {
	return (
		potential !== undefined &&
		Potential.checkOptionType(potential.optionType, gear.type) &&
		gear.req.level >= potential.reqLevel
	);
}

function getPotentialCodes(grade: PotentialGrade) {
	switch (grade) {
		case PotentialGrade.normal:
			return [1, 2, 3, 4, 5, 6, 9, 10, 11, 12, 13];
		case PotentialGrade.rare:
			return [
				10001, 10002, 10003, 10004, 10005, 10006, 10009, 10010, 10011, 10012, 10013, 10041, 10042,
				10043, 10044, 10045, 10046, 10051, 10052, 10053, 10055, 10070, 10081, 10151, 10156, 10201,
				10202, 10206, 10207, 10221, 10222, 10226, 10227, 10231, 10232, 10236, 10237, 10241, 10242,
				10246, 10247, 10291
			];
		case PotentialGrade.epic:
			return [
				20041, 20042, 20043, 20044, 20045, 20046, 20051, 20052, 20053, 20055, 20070, 20086, 20201,
				20202, 20206, 20207, 20291, 20351, 20352, 20353, 20366, 20401, 20406
			];
		case PotentialGrade.unique:
			return [
				30041, 30042, 30043, 30044, 30045, 30046, 30051, 30052, 30053, 30055, 30070, 30086, 30091,
				30092, 30093, 30094, 30291, 30356, 30357, 30366, 30371, 30376, 30377, 30551, 30602, 30701,
				30702, 31001, 31002, 31003, 31004
			];
		case PotentialGrade.legendary:
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
		case PotentialGrade.normal:
			return [2001, 2002, 2003, 2004, 2005, 2006, 2009, 2010, 2011, 2012, 2013, 2015, 2016];
		case PotentialGrade.rare:
			return [
				12001, 12002, 12003, 12004, 12005, 12006, 12009, 12010, 12011, 12012, 12013, 12015, 12016,
				12017, 12018, 12019, 12020, 12041, 12042, 12043, 12044, 12045, 12046, 12047, 12048, 12049,
				12050, 12051, 12052, 12053, 12055, 12070, 12081, 12082
			];
		case PotentialGrade.epic:
			return [
				22001, 22002, 22003, 22004, 22005, 22006, 22009, 22010, 22011, 22012, 22013, 22041, 22042,
				22043, 22044, 22045, 22046, 22051, 22052, 22053, 22055, 22057, 22058, 22059, 22060, 22070,
				22086, 22087, 22201, 22206, 22291
			];
		case PotentialGrade.unique:
			return [
				32001, 32002, 32003, 32004, 32005, 32006, 32011, 32012, 32013, 32041, 32042, 32043, 32044,
				32045, 32046, 32051, 32053, 32055, 32057, 32059, 32060, 32061, 32062, 32070, 32086, 32087,
				32091, 32092, 32093, 32094, 32201, 32206, 32291, 32551, 32601
			];
		case PotentialGrade.legendary:
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
