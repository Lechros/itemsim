import { GearAttribute, GearShare, GearTrade, GearType, PotentialCan } from '@malib/gear';

export function getTags({
	only,
	trade,
	onlyEquip,
	share,
	blockGoldenHammer,
	canPotential
}: Partial<GearAttribute>) {
	const tags = [];
	if (only) {
		tags.push('고유 아이템');
	}
	if (trade === GearTrade.TradeBlock) {
		tags.push('교환 불가');
	} else if (trade === GearTrade.EquipTradeBlock) {
		tags.push('장착 시 교환 불가');
	}
	if (onlyEquip) {
		tags.push('고유장착 아이템');
	}
	if (share === GearShare.AccountSharable) {
		tags.push('월드 내 나의 캐릭터간 이동만 가능');
	} else if (share === GearShare.AccountSharableOnce) {
		tags.push('월드 내 나의 캐릭터 간 1회 이동 가능', '(이동 후 교환불가)');
	}
	if (blockGoldenHammer) {
		tags.push('황금 망치 사용 불가');
	}
	if (canPotential === PotentialCan.Fixed) {
		tags.push('잠재능력 재설정 불가');
	}
	return tags;
}

export function getExtraJobReqString(type: GearType) {
	switch (type) {
		// 0xxx
		case GearType.medallion:
			return '히어로 직업군 착용 가능';
		case GearType.rosary:
			return '팔라딘 직업군 착용 가능';
		case GearType.ironChain:
			return '다크나이트 직업군 착용 가능';
		case GearType.magicBook1:
			return '불,독 계열 마법사 착용 가능';
		case GearType.magicBook2:
			return '얼음,번개 계열 마법사 착용 가능';
		case GearType.magicBook3:
			return '비숍 계열 마법사 착용 가능';
		case GearType.arrowFletching:
			return '보우마스터 직업군 착용 가능';
		case GearType.bowThimble:
			return '신궁 직업군 착용 가능';
		case GearType.daggerScabbard:
			return '섀도어 직업군 착용 가능';
		case GearType.charm:
			return '나이트로드 직업군 착용 가능';
		case GearType.katara:
			return '듀얼블레이드 직업군 착용 가능';
		case GearType.wristBand:
			return '바이퍼 직업군 착용 가능';
		case GearType.farSight:
			return '캡틴 직업군 착용 가능';
		case GearType.powderKeg:
			return '캐논 슈터 직업군 착용 가능';
		case GearType.relic:
			return '패스파인더 직업군 착용 가능';

		// 1xxx
		case GearType.jewel:
			return '시그너스 기사단 착용 가능';

		// 2xxx
		case GearType.mass:
			return getExtraJobReqStringByJob(21);
		case GearType.document:
			return getExtraJobReqStringByJob(22);
		case GearType.magicArrow:
			return getExtraJobReqStringByJob(23);
		case GearType.card:
			return getExtraJobReqStringByJob(24);
		case GearType.foxMarble:
			return getExtraJobReqStringByJob(25);
		case GearType.orb:
		case GearType.shiningRod:
			return getExtraJobReqStringByJob(27);

		// 3xxx
		case GearType.demonShield:
			return getExtraJobReqStringByJob(31);
		case GearType.desperado:
			return '데몬 어벤져 착용 가능';
		case GearType.magicMarble:
			return '배틀메이지 직업군 착용 가능';
		case GearType.arrowhead:
			return '와일드헌터 직업군 착용 가능';
		case GearType.magnum:
			return '메카닉 착용 가능';
		case GearType.controller:
		case GearType.powerSource:
		case GearType.energySword:
			return getExtraJobReqStringByJob(36);
		case GearType.gauntletRevolver:
		case GearType.charge:
			return getExtraJobReqStringByJob(37);

		// 5xxx
		case GearType.soulShield:
			return '미하일 착용 가능';

		// 6xxx
		case GearType.dragonEssence:
			return getExtraJobReqStringByJob(61);
		case GearType.breathShooter:
		case GearType.weaponBelt:
			return getExtraJobReqStringByJob(63);
		case GearType.chain:
		case GearType.transmitter:
			return getExtraJobReqStringByJob(64);
		case GearType.soulRing:
		case GearType.soulShooter:
			return getExtraJobReqStringByJob(65);

		// 10xxx
		case GearType.heavySword:
		case GearType.longSword:
			return getExtraJobReqStringByJob(101);

		case GearType.espLimiter:
		case GearType.chessPiece:
			return getExtraJobReqStringByJob(142);

		case GearType.magicGauntlet:
		case GearType.magicWing:
			return getExtraJobReqStringByJob(152);

		case GearType.pathOfAbyss:
			return getExtraJobReqStringByJob(155);

		case GearType.ritualFan:
		case GearType.fanTassel:
			return getExtraJobReqStringByJob(164);

		case GearType.tuner:
		case GearType.bracelet:
			return getExtraJobReqStringByJob(151);

		case GearType.ornament:
			return getExtraJobReqStringByJob(162);

		case GearType.chakram:
		case GearType.hexSeeker:
			return getExtraJobReqStringByJob(154);
	}
}

function getExtraJobReqStringByJob(specJob: number) {
	switch (specJob) {
		case 21:
			return '아란 착용 가능';
		case 22:
			return '에반 착용 가능';
		case 23:
			return '메르세데스 착용가능';
		case 24:
			return '팬텀 착용 가능';
		case 25:
			return '은월 착용 가능';
		case 27:
			return '루미너스 착용 가능';
		case 31:
			return '데몬 직업군 착용 가능';
		case 36:
			return '제논 착용 가능';
		case 37:
			return '블래스터 착용 가능';
		case 51:
			return '미하일 착용 가능';
		case 61:
			return '카이저 착용 가능';
		case 63:
			return '카인 착용 가능';
		case 64:
			return '카데나 착용 가능';
		case 65:
			return '엔젤릭 버스터 착용 가능';
		case 101:
			return '제로 착용 가능';
		case 142:
			return '키네시스 착용 가능';
		case 151:
			return '아델 착용 가능';
		case 152:
			return '일리움 착용 가능';
		case 154:
			return '칼리 착용 가능';
		case 155:
			return '아크 착용 가능';
		case 162:
			return '라라 착용 가능';
		case 164:
			return '호영 착용 가능';
	}
}
