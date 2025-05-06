import {
	GearAttribute,
	GearCapability,
	GearCuttable,
	GearShare,
	GearTrade,
	GearType,
	type GearOption
} from '@malib/gear';

export function getTags({ only, trade, onlyEquip, share, canPotential }: Partial<GearAttribute>) {
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
	if (canPotential === GearCapability.Fixed) {
		tags.push('잠재능력 재설정 불가');
	}
	return tags;
}

export function getDescriptions({
	desc,
	trade,
	cuttable,
	accountShareTag,
	lucky,
	incline,
	starScroll
}: Partial<GearAttribute> & { desc?: string; starScroll: boolean }) {
	const descs: string[] = [];

	if (desc) {
		descs.push(desc);
	}
	if (trade !== GearTrade.Tradeable) {
		if (cuttable === GearCuttable.Silver) {
			descs.push(
				'#c카르마의 가위 또는 실버 카르마의 가위를 사용하면 1회 교환이 가능하게 할 수 있습니다.#'
			);
		} else if (cuttable === GearCuttable.Platinum) {
			descs.push('#c플래티넘 카르마의 가위를 사용하면 1회 교환이 가능하게 할 수 있습니다.#');
		}
	}
	if (accountShareTag) {
		descs.push('#c쉐어 네임 텍을 사용하면 월드 내 나의 캐릭터 간 1회 이동할 수 있습니다.#');
	}
	if (lucky) {
		descs.push(
			'#c3개 이상 착용하고 있는 모든 세트 아이템에 포함되는 럭키 아이템! (단, 2개 이상의 럭키 아이템 착용 시 1개만 효과 적용.)#'
		);
	}

	if (incline) {
		const traits = [
			['카리스마', incline.charisma],
			['통찰력', incline.insight],
			['의지', incline.will],
			['손재주', incline.craft],
			['감성', incline.sense],
			['매력', incline.charm]
		] as const;
		const str = traits
			.filter(([, value]) => value > 0)
			.map(([name, value]) => `${name} ${value}`)
			.join(', ');
		descs.push(
			`#c장착 시 1회에 한해 ${str}의 경험치를 얻을 수 있습니다. (일일제한, 최대치 초과 시 제외)#`
		);
	}

	if (starScroll) {
		descs.push('#c놀라운 장비강화 주문서가 사용되었습니다.#');
	}

	return descs;
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

export function getGearTypeString(type: GearType) {
	switch (type) {
		case GearType.faceAccessory:
			return '얼굴장식';
		case GearType.eyeAccessory:
			return '눈장식';
		case GearType.earrings:
			return '귀고리';
		case GearType.pendant:
			return '펜던트';
		case GearType.belt:
			return '벨트';
		case GearType.medal:
			return '훈장';
		case GearType.shoulder:
			return '어깨장식';
		case GearType.cap:
			return '모자';
		case GearType.cape:
			return '망토';
		case GearType.coat:
			return '상의';
		case GearType.dragonMask:
			return '드래곤 모자';
		case GearType.dragonPendant:
			return '드래곤 펜던트';
		case GearType.dragonWings:
			return '드래곤 날개장식';
		case GearType.dragonTail:
			return '드래곤 꼬리장식';
		case GearType.glove:
			return '장갑';
		case GearType.longcoat:
			return '한벌옷';
		case GearType.machineEngine:
			return '메카닉 엔진';
		case GearType.machineArms:
			return '메카닉 암';
		case GearType.machineLegs:
			return '메카닉 레그';
		case GearType.machineBody:
			return '메카닉 프레임';
		case GearType.machineTransistors:
			return '메카닉 트랜지스터';
		case GearType.pants:
			return '하의';
		case GearType.ring:
			return '반지';
		case GearType.shield:
			return '방패';
		case GearType.shoes:
			return '신발';
		case GearType.shiningRod:
			return '샤이닝 로드';
		case GearType.soulShooter:
			return '소울 슈터';
		case GearType.ohSword:
			return '한손검';
		case GearType.ohAxe:
			return '한손도끼';
		case GearType.ohBlunt:
			return '한손둔기';
		case GearType.dagger:
			return '단검';
		case GearType.katara:
			return '블레이드';
		case GearType.magicArrow:
			return '마법화살';
		case GearType.card:
			return '카드';
		case GearType.orb:
			return '오브';
		case GearType.dragonEssence:
			return '용의 정수';
		case GearType.soulRing:
			return '소울링';
		case GearType.magnum:
			return '매그넘';
		case GearType.cane:
			return '케인';
		case GearType.wand:
			return '완드';
		case GearType.staff:
			return '스태프';
		case GearType.thSword:
			return '두손검';
		case GearType.thAxe:
			return '두손도끼';
		case GearType.thBlunt:
			return '두손둔기';
		case GearType.spear:
			return '창';
		case GearType.polearm:
			return '폴암';
		case GearType.bow:
			return '활';
		case GearType.crossbow:
			return '석궁';
		case GearType.claw:
			return '아대';
		case GearType.knuckle:
			return '너클';
		case GearType.gun:
			return '건';
		case GearType.android:
			return '안드로이드';
		case GearType.machineHeart:
			return '기계 심장';
		case GearType.pickaxe:
			return '채광 도구';
		case GearType.shovel:
			return '약초채집 도구';
		case GearType.pocket:
			return '포켓 아이템';
		case GearType.dualBowguns:
			return '듀얼 보우건';
		case GearType.handCannon:
			return '핸드캐논';
		case GearType.badge:
			return '뱃지';
		case GearType.emblem:
			return '엠블렘';
		case GearType.soulShield:
			return '소울실드';
		case GearType.demonShield:
			return '포스실드';
		case GearType.petEquip:
			return '펫장비';
		case GearType.heavySword:
			return '대검';
		case GearType.longSword:
			return '태도';
		case GearType.medallion:
			return '메달';
		case GearType.rosary:
			return '로자리오';
		case GearType.ironChain:
			return '쇠사슬';
		case GearType.magicBook1:
		case GearType.magicBook2:
		case GearType.magicBook3:
			return '마도서';
		case GearType.arrowFletching:
			return '화살깃';
		case GearType.bowThimble:
			return '활골무';
		case GearType.daggerScabbard:
			return '단검용 검집';
		case GearType.charm:
			return '부적';
		case GearType.wristBand:
			return '리스트밴드';
		case GearType.farSight:
			return '조준기';
		case GearType.powderKeg:
		case GearType.powderKeg2:
			return '화약통';
		case GearType.mass:
			return '무게추';
		case GearType.document:
			return '문서';
		case GearType.magicMarble:
			return '마법구슬';
		case GearType.arrowhead:
			return '화살촉';
		case GearType.jewel:
			return '보석';
		case GearType.controller:
			return '컨트롤러';
		case GearType.foxMarble:
			return '여우 구슬';
		case GearType.chessPiece:
			return '체스피스';
		case GearType.powerSource:
			return '파워소스';

		case GearType.energySword:
			return '에너지소드';
		case GearType.desperado:
			return '데스페라도';
		case GearType.espLimiter:
			return 'ESP 리미터';

		case GearType.gauntletRevolver:
			return '건틀렛 리볼버';
		case GearType.charge:
			return '장약';

		case GearType.chain:
			return '체인';
		case GearType.magicGauntlet:
			return '매직 건틀렛';
		case GearType.transmitter:
			return '무기 전송장치';
		case GearType.magicWing:
			return '매직윙';
		case GearType.pathOfAbyss:
			return '패스 오브 어비스';

		case GearType.relic:
			return '렐릭';
		case GearType.ancientBow:
			return '에인션트 보우';

		case GearType.ritualFan:
			return '부채';
		case GearType.fanTassel:
			return '선추';

		case GearType.tuner:
			return '튜너';
		case GearType.bracelet:
			return '브레이슬릿';

		case GearType.breathShooter:
			return '브레스 슈터';
		case GearType.weaponBelt:
			return '웨폰 벨트';

		case GearType.ornament:
			return '노리개';

		case GearType.chakram:
			return '차크람';
		case GearType.hexSeeker:
			return '헥스시커';
	}
}

export function getGearOptionString(type: keyof GearOption, value: number) {
	if (value !== 0) {
		switch (type) {
			case 'str':
				return `STR : +${value}`;
			case 'dex':
				return `DEX : +${value}`;
			case 'int':
				return `INT : +${value}`;
			case 'luk':
				return `LUK : +${value}`;
			case 'maxHp':
				return `최대 HP : +${value}`;
			case 'maxMp':
				return `최대 MP : +${value}`;
			case 'maxHpRate':
				return `최대 HP : +${value}%`;
			case 'maxMpRate':
				return `최대 MP : +${value}%`;
			case 'maxDemonForce':
				return `MaxDF : +${value}`;
			case 'attackPower':
				return `공격력 : +${value}`;
			case 'magicPower':
				return `마력 : +${value}`;
			case 'armor':
				return `방어력 : +${value}`;
			case 'speed':
				return `이동속도 : +${value}`;
			case 'jump':
				return `점프력 : +${value}`;
			case 'knockback':
				return `직접 타격시 ${value}%의 확률로 넉백`;
			case 'bossDamage':
				return `보스 몬스터 공격 시 데미지 +${value}%`;
			case 'ignoreMonsterArmor':
				return `몬스터 방어율 무시 : +${value}%`;
			case 'damage':
				return `데미지 : +${value}%`;
			case 'allStat':
				return `올스탯 : +${value}%`;
		}
	}
	return '';
}

export function getCorrectedGearOptionString(type: keyof GearOption, value: number) {
	if (type === 'bossDamage') {
		return `보스 몬스터 공격 시 데미지 : +${value}%`;
	}
	return getGearOptionString(type, value);
}

export function convertGearOptionToSummaries(option: Partial<GearOption>) {
	const strings: string[] = [];
	let value: number;

	// str, dex, int, luk
	if ((value = equalValueOrZero(option, ['str', 'dex', 'int', 'luk'])) !== 0) {
		strings.push(`올스탯 : +${value}`);
	} else {
		pushNonEmptyOptionStrings(strings, option, ['str', 'dex', 'int', 'luk']);
	}
	// maxHp, maxMp
	if ((value = equalValueOrZero(option, ['maxHp', 'maxMp'])) !== 0) {
		strings.push(`최대 HP / 최대 MP : +${value}`);
	} else {
		pushNonEmptyOptionStrings(strings, option, ['maxHp', 'maxMp']);
	}
	// maxHpRate, maxMpRate, maxDemonForce
	pushNonEmptyOptionStrings(strings, option, ['maxHpRate', 'maxMpRate', 'maxDemonForce']);
	// attackPower, magicPower
	if ((value = equalValueOrZero(option, ['attackPower', 'magicPower'])) !== 0) {
		strings.push(`공격력 / 마력 : +${option.attackPower}`);
	} else {
		pushNonEmptyOptionStrings(strings, option, ['maxHp', 'maxMp']);
	}
	// armor, speed, jump, knockback, bossDamage, ignoreMonsterArmor, damage, allStat
	pushNonEmptyOptionStrings(strings, option, [
		'armor',
		'speed',
		'jump',
		'knockback',
		'bossDamage',
		'ignoreMonsterArmor',
		'damage',
		'allStat'
	]);

	return strings;
}

function equalValueOrZero(option: Partial<GearOption>, types: (keyof GearOption)[]) {
	const values = types.map((type) => option[type]);
	const value = values[0] ?? 0;
	if (value !== 0 && values.every((v) => v === value)) {
		return value;
	} else {
		return 0;
	}
}

function pushNonEmptyOptionStrings(
	strings: string[],
	option: Partial<GearOption>,
	types: (keyof GearOption)[]
) {
	for (const type of types) {
		const value = option[type] ?? 0;
		if (value !== 0) {
			strings.push(getCorrectedGearOptionString(type, value));
		}
	}
}
