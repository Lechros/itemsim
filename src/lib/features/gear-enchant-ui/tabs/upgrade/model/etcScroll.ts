import {
	GearType,
	isAccessory,
	isArmor,
	isDoubleHandWeapon,
	isLeftWeapon,
	type ReadonlyGear,
	type Scroll
} from '@malib/gear';
import { scrollData } from './scrollData';

export function showEtcScrollTab(gear: ReadonlyGear) {
	return getEtcScrolls(gear).length > 0;
}

export function getEtcScrolls(gear: ReadonlyGear) {
	switch (gear.id) {
		case 1123007:
		case 1123008:
		case 1123009:
		case 1123010:
		case 1123011:
		case 1123012:
			return [
				scrollData['힘의 오닉스 스톤 (펜던트)'],
				scrollData['민첩의 오닉스 스톤 (펜던트)'],
				scrollData['지능의 오닉스 스톤 (펜던트)'],
				scrollData['행운의 오닉스 스톤 (펜던트)'],
				scrollData['체력의 오닉스 스톤 (펜던트)'],
				scrollData['균형의 오닉스 스톤 (펜던트)']
			];
		case 1114207:
		case 1114208:
		case 1114209:
		case 1114210:
		case 1114211:
		case 1114212:
			return [
				scrollData['힘의 오닉스 스톤 (반지)'],
				scrollData['민첩의 오닉스 스톤 (반지)'],
				scrollData['지능의 오닉스 스톤 (반지)'],
				scrollData['행운의 오닉스 스톤 (반지)'],
				scrollData['체력의 오닉스 스톤 (반지)'],
				scrollData['균형의 오닉스 스톤 (반지)'],
				scrollData['파괴의 오닉스 스톤 (반지)'],
				scrollData['마력의 오닉스 스톤 (반지)']
			];
		case 1114226:
		case 1114227:
		case 1114228:
		case 1114230:
		case 1114231:
			return [
				scrollData['강력한 힘의 오닉스 스톤'],
				scrollData['강력한 민첩의 오닉스 스톤'],
				scrollData['강력한 지능의 오닉스 스톤'],
				scrollData['강력한 행운의 오닉스 스톤'],
				scrollData['강력한 체력의 오닉스 스톤'],
				scrollData['강력한 균형의 오닉스 스톤'],
				scrollData['현명한 힘의 오닉스 스톤'],
				scrollData['현명한 민첩의 오닉스 스톤'],
				scrollData['현명한 지능의 오닉스 스톤'],
				scrollData['현명한 행운의 오닉스 스톤'],
				scrollData['현명한 체력의 오닉스 스톤'],
				scrollData['현명한 균형의 오닉스 스톤']
			];
		case 1114300:
			return [scrollData['벤젼스 스톤']];
		case 1114303:
			return [scrollData['코스믹 아톰']];
		case 1114307:
			return [scrollData['테네브리스 원정대 반지 강화 주문서']];
		case 1114318:
			return [scrollData['어웨이크 링 전용 강화 주문서']];
		case 1092123: // 아스트라 세이크리드 이지스
		case 1092124:
		case 1092125:
		case 1092132: // 아스트라 토파즈 이지스
		case 1092133:
		case 1092134:
			return [scrollData['아스트라 이지스 전용 공격력 주문서']];
		case 1092126: // 아스트라 아케인 실드
		case 1092127:
		case 1092128:
		case 1092135: // 아스트라 루비 실드
		case 1092136:
		case 1092137:
		case 1092138: // 아스트라 프로미넌트 실드
		case 1092139:
		case 1092140:
		case 1092141: // 아스트라 엄브럴 실드
		case 1092142:
		case 1092143:
			return [scrollData['아스트라 실드 전용 마력 주문서']];
		case 1092129: // 아스트라 베인 실드
		case 1092130:
		case 1092131:
			return [scrollData['아스트라 베인 실드 전용 공격력 주문서']];
	}
	const scrolls: Scroll[] = [];
	switch (gear.id) {
		case 1122000:
		case 1122076:
		case 1122278:
			scrolls.push(scrollData['드래곤의 돌']);
			break;
		case 1122150:
		case 1122372:
		case 1122373:
		case 1122374:
		case 1122375:
		case 1122376:
		case 1122377:
			scrolls.push(scrollData['비틀린 시간의 파편']);
			break;
		case 1342121:
		case 1342122:
		case 1342123:
			scrolls.push(scrollData['아스트라 블레이드 전용 공격력 주문서']);
			break;
	}
	if (gear.type === GearType.earrings) {
		scrolls.push(scrollData['귀 장식 지력 주문서 10%']);
	}
	if (isArmor(gear.type)) {
		scrolls.push(scrollData['얼티밋 방어구 강화 주문서 20%']);
		scrolls.push(scrollData['10주년 프라임 방어구 주문서']);
	}
	if (isAccessory(gear.type)) {
		scrolls.push(
			scrollData['악세서리 공격력 주문서 100% (+2)'],
			scrollData['악세서리 공격력 주문서 100% (+3)'],
			scrollData['프리미엄 악세서리 공격력 주문서 100% (+4)'],
			scrollData['프리미엄 악세서리 공격력 주문서 100% (+5)'],
			scrollData['악세서리 마력 주문서 100% (+2)'],
			scrollData['악세서리 마력 주문서 100% (+3)'],
			scrollData['프리미엄 악세서리 마력 주문서 100% (+4)'],
			scrollData['프리미엄 악세서리 마력 주문서 100% (+5)'],
			scrollData['10주년 프라임 악세서리 주문서']
		);
	}
	if (
		isLeftWeapon(gear.type) ||
		gear.type === GearType.katara ||
		gear.type == GearType.machineHeart
	) {
		scrolls.push(
			scrollData['매지컬 한손무기 공격력 주문서 (+9)'],
			scrollData['매지컬 한손무기 공격력 주문서 (+10)'],
			scrollData['매지컬 한손무기 공격력 주문서 (+11)'],
			scrollData['매지컬 한손무기 마력 주문서 (+9)'],
			scrollData['매지컬 한손무기 마력 주문서 (+10)'],
			scrollData['매지컬 한손무기 마력 주문서 (+11)']
		);
	}
	if (isDoubleHandWeapon(gear.type)) {
		scrolls.push(
			scrollData['매지컬 두손무기 공격력 주문서 (+9)'],
			scrollData['매지컬 두손무기 공격력 주문서 (+10)'],
			scrollData['매지컬 두손무기 공격력 주문서 (+11)']
		);
	}

	return scrolls;
}
