import { getGearPropString } from '$lib/gear-tooltip/strings';
import { BonusStatType, GearPropType } from '@malib/gear';

export function getName(type: BonusStatType): string {
	switch (type) {
		case BonusStatType.STR:
			return 'STR';
		case BonusStatType.DEX:
			return 'DEX';
		case BonusStatType.INT:
			return 'INT';
		case BonusStatType.LUK:
			return 'LUK';
		case BonusStatType.STR_DEX:
			return 'STR + DEX';
		case BonusStatType.STR_INT:
			return 'STR + INT';
		case BonusStatType.STR_LUK:
			return 'STR + LUK';
		case BonusStatType.DEX_INT:
			return 'DEX + INT';
		case BonusStatType.DEX_LUK:
			return 'DEX + LUK';
		case BonusStatType.INT_LUK:
			return 'INT + LUK';
		case BonusStatType.MHP:
			return '최대 HP';
		case BonusStatType.MMP:
			return '최대 MP';
		case BonusStatType.PAD:
			return '공격력';
		case BonusStatType.MAD:
			return '마력';
		case BonusStatType.PDD:
			return '방어력';
		case BonusStatType.speed:
			return '이동속도';
		case BonusStatType.jump:
			return '점프력';
		case BonusStatType.damR:
			return '데미지 %';
		case BonusStatType.bdR:
			return '보스 몬스터 공격 시 데미지 %';
		case BonusStatType.allStatR:
			return '올스탯 %';
		case BonusStatType.reduceReq:
			return '착용 레벨 감소';
	}
}

export function optionToStrings(option: Map<GearPropType, number>) {
	const strings = [];
	for (const [type, value] of [...option.entries()].sort((e) => e[0] - e[1])) {
		strings.push(getGearPropString(type, value));
	}
	return strings;
}
