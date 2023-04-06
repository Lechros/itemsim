import { GearPropType, type Gear } from '@malib/gear';

export function getOnlyScrolls(gear: Gear) {
	switch (gear.itemID) {
		case 1123007:
		case 1123008:
		case 1123009:
		case 1123010:
		case 1123011:
		case 1123012:
			return [
				{
					name: '힘의 오닉스 스톤',
					stat: new Map([
						[GearPropType.incSTR, 2],
						[GearPropType.incPDD, 15]
					])
				},
				{
					name: '민첩의 오닉스 스톤',
					stat: new Map([
						[GearPropType.incDEX, 2],
						[GearPropType.incPDD, 15]
					])
				},
				{
					name: '지능의 오닉스 스톤',
					stat: new Map([
						[GearPropType.incINT, 2],
						[GearPropType.incPDD, 15]
					])
				},
				{
					name: '행운의 오닉스 스톤',
					stat: new Map([
						[GearPropType.incLUK, 2],
						[GearPropType.incPDD, 15]
					])
				},
				{
					name: '체력의 오닉스 스톤',
					stat: new Map([
						[GearPropType.incMHP, 100],
						[GearPropType.incPDD, 15]
					])
				},
				{
					name: '균형의 오닉스 스톤',
					stat: new Map([
						[GearPropType.incSTR, 1],
						[GearPropType.incDEX, 1],
						[GearPropType.incINT, 1],
						[GearPropType.incLUK, 1],
						[GearPropType.incPDD, 15]
					])
				}
			];
		case 1114207:
		case 1114208:
		case 1114209:
		case 1114210:
		case 1114211:
		case 1114212:
			return [
				{
					name: '힘의 오닉스 스톤',
					stat: new Map([[GearPropType.incSTR, 8]])
				},
				{
					name: '민첩의 오닉스 스톤',
					stat: new Map([[GearPropType.incDEX, 8]])
				},
				{
					name: '지능의 오닉스 스톤',
					stat: new Map([[GearPropType.incINT, 8]])
				},
				{
					name: '행운의 오닉스 스톤',
					stat: new Map([[GearPropType.incLUK, 8]])
				},
				{
					name: '체력의 오닉스 스톤',
					stat: new Map([[GearPropType.incMHP, 400]])
				},
				{
					name: '균형의 오닉스 스톤',
					stat: new Map([
						[GearPropType.incSTR, 4],
						[GearPropType.incDEX, 4],
						[GearPropType.incINT, 4],
						[GearPropType.incLUK, 4]
					])
				},
				{
					name: '파괴의 오닉스 스톤',
					stat: new Map([
						[GearPropType.incPAD, 1],
						[GearPropType.incPDD, 30]
					])
				},
				{
					name: '마력의 오닉스 스톤',
					stat: new Map([[GearPropType.incMAD, 1]])
				}
			];
		case 1114226:
		case 1114227:
		case 1114228:
		case 1114230:
		case 1114231:
			return [
				{
					name: '강력한 힘의 오닉스 스톤',
					stat: new Map([
						[GearPropType.incSTR, 4],
						[GearPropType.incPAD, 1],
						[GearPropType.incPDD, 15]
					])
				},
				{
					name: '강력한 민첩의 오닉스 스톤',
					stat: new Map([
						[GearPropType.incDEX, 4],
						[GearPropType.incPAD, 1],
						[GearPropType.incPDD, 15]
					])
				},
				{
					name: '강력한 지능의 오닉스 스톤',
					stat: new Map([
						[GearPropType.incINT, 4],
						[GearPropType.incPAD, 1],
						[GearPropType.incPDD, 15]
					])
				},
				{
					name: '강력한 행운의 오닉스 스톤',
					stat: new Map([
						[GearPropType.incLUK, 4],
						[GearPropType.incPAD, 1],
						[GearPropType.incPDD, 15]
					])
				},
				{
					name: '강력한 체력의 오닉스 스톤',
					stat: new Map([
						[GearPropType.incMHP, 200],
						[GearPropType.incPAD, 1],
						[GearPropType.incPDD, 15]
					])
				},
				{
					name: '강력한 균형의 오닉스 스톤',
					stat: new Map([
						[GearPropType.incSTR, 2],
						[GearPropType.incDEX, 2],
						[GearPropType.incINT, 2],
						[GearPropType.incLUK, 2],
						[GearPropType.incPAD, 1],
						[GearPropType.incPDD, 15]
					])
				},
				{
					name: '현명한 힘의 오닉스 스톤',
					stat: new Map([
						[GearPropType.incSTR, 4],
						[GearPropType.incMAD, 1]
					])
				},
				{
					name: '현명한 민첩의 오닉스 스톤',
					stat: new Map([
						[GearPropType.incDEX, 4],
						[GearPropType.incMAD, 1]
					])
				},
				{
					name: '현명한 지능의 오닉스 스톤',
					stat: new Map([
						[GearPropType.incINT, 4],
						[GearPropType.incMAD, 1]
					])
				},
				{
					name: '현명한 행운의 오닉스 스톤',
					stat: new Map([
						[GearPropType.incLUK, 4],
						[GearPropType.incMAD, 1]
					])
				},
				{
					name: '현명한 체력의 오닉스 스톤',
					stat: new Map([
						[GearPropType.incMHP, 200],
						[GearPropType.incMAD, 1]
					])
				},
				{
					name: '현명한 균형의 오닉스 스톤',
					stat: new Map([
						[GearPropType.incSTR, 2],
						[GearPropType.incDEX, 2],
						[GearPropType.incINT, 2],
						[GearPropType.incLUK, 2],
						[GearPropType.incMAD, 1]
					])
				}
			];
		case 1114300:
			return [
				{
					name: '벤전스 스톤',
					stat: new Map([
						[GearPropType.incSTR, 1],
						[GearPropType.incDEX, 1],
						[GearPropType.incINT, 1],
						[GearPropType.incLUK, 1],
						[GearPropType.incMHP, 100],
						[GearPropType.incMMP, 100],
						[GearPropType.incPAD, 1],
						[GearPropType.incMAD, 1]
					])
				}
			];
		case 1114303:
			return [
				{
					name: '코스믹 아톰',
					stat: new Map([
						[GearPropType.incSTR, 1],
						[GearPropType.incDEX, 1],
						[GearPropType.incINT, 1],
						[GearPropType.incLUK, 1],
						[GearPropType.incMHP, 100],
						[GearPropType.incMMP, 100],
						[GearPropType.incPAD, 1],
						[GearPropType.incMAD, 1]
					])
				}
			];
		case 1114307:
			return [
				{
					name: '테네브리스 원정대 반지 강화 주문서',
					stat: new Map([
						[GearPropType.incSTR, 10],
						[GearPropType.incDEX, 10],
						[GearPropType.incINT, 10],
						[GearPropType.incLUK, 10],
						[GearPropType.incMHP, 1000],
						[GearPropType.incMMP, 1000],
						[GearPropType.incPAD, 5],
						[GearPropType.incMAD, 5]
					])
				}
			];
		case 1114318:
			return [
				{
					name: '어웨이크 링 전용 강화 주문서',
					stat: new Map([
						[GearPropType.incSTR, 10],
						[GearPropType.incDEX, 10],
						[GearPropType.incINT, 10],
						[GearPropType.incLUK, 10],
						[GearPropType.incMHP, 1000],
						[GearPropType.incMMP, 1000],
						[GearPropType.incPAD, 5],
						[GearPropType.incMAD, 5]
					])
				}
			];
	}
	return [];
}
