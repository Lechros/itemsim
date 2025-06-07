import {
	GearAttribute,
	GearCuttable,
	GearShare,
	GearTrade,
	type GearAttributeData
} from '@malib/gear';

export function getTopAttributeHtmlStrings(
	attributes: GearAttributeData | GearAttribute
): string[] {
	const result: string[] = [];
	let temp: string[] = [];

	// 교환
	if (attributes.trade === GearTrade.TradeBlock) {
		temp.push('#$r교환 불가#');
	} else if (attributes.trade === GearTrade.EquipTradeBlock) {
		temp.push('#$r장착 시 교환 불가#');
	}
	if (attributes.cuttableCount !== undefined) {
		const cuttableText = `#$r(가위 사용 잔여 횟수 : ${attributes.cuttableCount} / ${attributes.totalCuttableCount})#`;
		temp.push(cuttableText);
	}
	if (temp.length > 0) {
		result.push(temp.join(' '));
		temp = [];
	}

	// 계정 내 이동
	if (attributes.share === GearShare.AccountSharableOnce) {
		result.push('#$r월드 내 나의 캐릭터 간 1회 이동 가능 (이동 후 교환불가)#');
	} else if (attributes.share === GearShare.AccountSharable) {
		result.push('#$r월드 내 나의 캐릭터 간 이동만 가능#');
	}

	return result;
}

export function getAttributeHtmlStrings(
	attributes: GearAttributeData | GearAttribute,
	exclusiveEquips: string[]
): string[] {
	const result: string[] = [];
	let temp: string[] = [];

	// 카르마의 가위
	if (attributes.cuttable === GearCuttable.Silver) {
		result.push('#$g카르마의 가위 또는 실버 카르마의 가위 사용 시 1회 교환 가능#');
	} else if (attributes.cuttable === GearCuttable.Platinum) {
		result.push('#$g플래티넘 카르마의 가위 사용 시 1회 교환 가능#');
	}

	// 쉐어 네임 택
	if (attributes.accountShareTag) {
		result.push('#c쉐어 네임 텍을 사용하면 월드 내 나의 캐릭터 간 1회 이동할 수 있습니다.#');
	}

	// TODO: 모루 불가

	// 중복 소지/장착
	if (attributes.only) {
		temp.push('#$r중복 소지 불가#');
	}
	if (attributes.onlyEquip) {
		temp.push('#$r중복 장착 불가#');
	}
	if (exclusiveEquips.length > 0) {
		temp.push(`#$r아이템 그룹 내 중복 장착 불가# (${exclusiveEquips.join(', ')})`);
	}
	if (temp.length > 0) {
		result.push(temp.join('#$r,# '));
		temp = [];
	}

	return result;
}
