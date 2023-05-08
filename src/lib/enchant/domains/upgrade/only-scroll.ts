import type { Gear, Scroll } from '@malib/gear';
import { onlyScrolls } from './scroll-data';

export function getOnlyScrolls(gear: Gear) {
	switch (gear.itemID) {
		case 1122000:
		case 1122076:
		case 1122278:
			return [onlyScrolls['드래곤의 돌']];
		case 1122150:
		case 1122372:
		case 1122373:
		case 1122374:
		case 1122375:
		case 1122376:
		case 1122377:
			return [onlyScrolls['비틀린 시간의 파편']];
		case 1123007:
		case 1123008:
		case 1123009:
		case 1123010:
		case 1123011:
		case 1123012:
			return [
				onlyScrolls['힘의 오닉스 스톤 (펜던트)'],
				onlyScrolls['민첩의 오닉스 스톤 (펜던트)'],
				onlyScrolls['지능의 오닉스 스톤 (펜던트)'],
				onlyScrolls['행운의 오닉스 스톤 (펜던트)'],
				onlyScrolls['체력의 오닉스 스톤 (펜던트)'],
				onlyScrolls['균형의 오닉스 스톤 (펜던트)']
			];
		case 1114207:
		case 1114208:
		case 1114209:
		case 1114210:
		case 1114211:
		case 1114212:
			return [
				onlyScrolls['힘의 오닉스 스톤 (반지)'],
				onlyScrolls['민첩의 오닉스 스톤 (반지)'],
				onlyScrolls['지능의 오닉스 스톤 (반지)'],
				onlyScrolls['행운의 오닉스 스톤 (반지)'],
				onlyScrolls['체력의 오닉스 스톤 (반지)'],
				onlyScrolls['균형의 오닉스 스톤 (반지)'],
				onlyScrolls['파괴의 오닉스 스톤 (반지)'],
				onlyScrolls['마력의 오닉스 스톤 (반지)']
			];
		case 1114226:
		case 1114227:
		case 1114228:
		case 1114230:
		case 1114231:
			return [
				onlyScrolls['강력한 힘의 오닉스 스톤'],
				onlyScrolls['강력한 민첩의 오닉스 스톤'],
				onlyScrolls['강력한 지능의 오닉스 스톤'],
				onlyScrolls['강력한 행운의 오닉스 스톤'],
				onlyScrolls['강력한 체력의 오닉스 스톤'],
				onlyScrolls['강력한 균형의 오닉스 스톤'],
				onlyScrolls['현명한 힘의 오닉스 스톤'],
				onlyScrolls['현명한 민첩의 오닉스 스톤'],
				onlyScrolls['현명한 지능의 오닉스 스톤'],
				onlyScrolls['현명한 행운의 오닉스 스톤'],
				onlyScrolls['현명한 체력의 오닉스 스톤'],
				onlyScrolls['현명한 균형의 오닉스 스톤']
			];
		case 1114300:
			return [onlyScrolls['벤젼스 스톤']];
		case 1114303:
			return [onlyScrolls['코스믹 아톰']];
		case 1114307:
			return [onlyScrolls['테네브리스 원정대 반지 강화 주문서']];
		case 1114318:
			return [onlyScrolls['어웨이크 링 전용 강화 주문서']];
	}
	return [];
}
