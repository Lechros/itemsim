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
	const option2 = new Map(option);

	let temp = option2.get(GearPropType.incSTR);
	if (
		temp !== undefined &&
		temp > 0 &&
		option2.get(GearPropType.incDEX) === temp &&
		option2.get(GearPropType.incINT) === temp &&
		option2.get(GearPropType.incLUK) === temp
	) {
		option2.set(GearPropType.incAllStat, temp);
		option2.set(GearPropType.incSTR, 0);
		option2.set(GearPropType.incDEX, 0);
		option2.set(GearPropType.incINT, 0);
		option2.set(GearPropType.incLUK, 0);
	}

	const sorted = [...option2].sort((a, b) => a[0] - b[0]);
	const strings = [];
	let skipMMP = false,
		skipMAD = false;
	for (const [type, value] of sorted) {
		if (type === GearPropType.incMHP) {
			temp = option2.get(GearPropType.incMHP);
			if (temp !== undefined && temp > 0 && option2.get(GearPropType.incMMP) === temp) {
				strings.push(`최대 HP / 최대 MP : +${value}`);
				skipMMP = true;
				continue;
			}
		}
		if (type === GearPropType.incMMP && skipMMP) continue;

		if (type === GearPropType.incPAD) {
			temp = option2.get(GearPropType.incPAD);
			if (temp !== undefined && temp > 0 && option2.get(GearPropType.incMAD) === temp) {
				strings.push(`공격력 / 마력 : +${value}`);
				skipMAD = true;
				continue;
			}
		}
		if (type === GearPropType.incMAD && skipMAD) continue;

		strings.push(getGearPropString(type, value));
	}
	return strings;
}
