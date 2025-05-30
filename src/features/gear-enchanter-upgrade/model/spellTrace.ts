import {
	GearType,
	getSpellTraceScroll,
	isAccessory,
	isArmor,
	isWeapon,
	ReadonlyGear,
	SpellTraceType,
	type SpellTrace,
	type SpellTraceRate
} from '@malib/gear';

export function showSpellTraceTab(gear: ReadonlyGear) {
	return getSpellTraceScrolls(gear).length > 0;
}

export function getSpellTraceScrolls(gear: ReadonlyGear) {
	const scrolls: SpellTrace[] = [];
	const names = new Set<string>();
	const types = getSpellTraceTypes(gear);
	const rates = [100, 70, 30, 15] as const;
	for (const type of types) {
		for (const rate of rates) {
			try {
				const scroll = getSpellTraceScroll(gear, type, rate);
				if (!names.has(scroll.name)) {
					scroll.icon = getSpellTraceIcon(rate);
					scrolls.push(scroll);
					names.add(scroll.name);
				}
			} catch {}
		}
	}
	return scrolls;
}

function getSpellTraceTypes(gear: ReadonlyGear) {
	const jobStat = [
		[SpellTraceType.str, SpellTraceType.maxHp],
		[SpellTraceType.int],
		[SpellTraceType.dex],
		[SpellTraceType.str, SpellTraceType.dex, SpellTraceType.luk],
		[SpellTraceType.str, SpellTraceType.dex, SpellTraceType.luk]
	];
	const typeSet = new Set<SpellTraceType>();
	if (gear.req.beginner()) {
		typeSet.add(SpellTraceType.str);
		typeSet.add(SpellTraceType.dex);
		typeSet.add(SpellTraceType.int);
		typeSet.add(SpellTraceType.luk);
		typeSet.add(SpellTraceType.maxHp);
	} else {
		for (let i = 0; i < 5; i++) {
			if ((gear.req.job & (1 << i)) !== 0) {
				for (const stat of jobStat[i]) {
					typeSet.add(stat);
				}
			}
		}
	}
	if (isArmor(gear.type) || isAccessory(gear.type)) {
		typeSet.add(SpellTraceType.allStat);
	}

	const types =
		isWeapon(gear.type) || gear.type === GearType.katara ? weaponTypeOrder : armorTypeOrder;
	return types.filter((type) => typeSet.has(type));
}

function getSpellTraceIcon(rate: SpellTraceRate) {
	switch (rate) {
		case 100:
			return '2040000';
		case 70:
			return '2040008';
		case 30:
			return '2040001';
		case 15:
			return '2040020';
	}
}

const weaponTypeOrder = [
	SpellTraceType.str,
	SpellTraceType.dex,
	SpellTraceType.luk,
	SpellTraceType.maxHp,
	SpellTraceType.int,
	SpellTraceType.allStat
];

const armorTypeOrder = [
	SpellTraceType.str,
	SpellTraceType.int,
	SpellTraceType.dex,
	SpellTraceType.luk,
	SpellTraceType.maxHp,
	SpellTraceType.allStat
];
