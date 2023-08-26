import { Gear, GearType } from '@malib/gear';
import { specialScrolls } from './scroll-data';

export function getSpecialScrolls(gear: Gear) {
	const scrolls = [];
	if (gear.type === GearType.earrings) {
		scrolls.push(specialScrolls['귀 장식 지력 주문서 10%']);
	}
	if (Gear.isArmor(gear.type)) {
		scrolls.push(specialScrolls['얼티밋 방어구 강화 주문서 20%']);
		scrolls.push(specialScrolls['10주년 프라임 방어구 주문서']);
	}
	if (Gear.isAccessory(gear.type)) {
		scrolls.push(specialScrolls['10주년 프라임 악세서리 주문서']);
	}
	if (Gear.isLeftWeapon(gear.type) || gear.type === GearType.machineHeart) {
		scrolls.push(
			specialScrolls['매지컬 한손무기 공격력 주문서 (+9)'],
			specialScrolls['매지컬 한손무기 공격력 주문서 (+10)'],
			specialScrolls['매지컬 한손무기 공격력 주문서 (+11)'],
			specialScrolls['매지컬 한손무기 마력 주문서 (+9)'],
			specialScrolls['매지컬 한손무기 마력 주문서 (+10)'],
			specialScrolls['매지컬 한손무기 마력 주문서 (+11)']
		);
	}
	if (Gear.isDoubleHandWeapon(gear.type)) {
		scrolls.push(
			specialScrolls['매지컬 두손무기 공격력 주문서 (+9)'],
			specialScrolls['매지컬 두손무기 공격력 주문서 (+10)'],
			specialScrolls['매지컬 두손무기 공격력 주문서 (+11)']
		);
	}

	return scrolls;
}
