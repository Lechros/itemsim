import { GearOption, GearPropType, GearType, PotentialGrade } from '@malib/gear';

export function getGearPropString(type: GearPropType, value: number): string {
	switch (type) {
		case GearPropType.incSTR:
			return `STR : +${value}`;
		case GearPropType.incDEX:
			return `DEX : +${value}`;
		case GearPropType.incINT:
			return `INT : +${value}`;
		case GearPropType.incLUK:
			return `LUK : +${value}`;
		case GearPropType.incAllStat:
			return `올스탯: +${value}`;
		case GearPropType.incMHP:
			return `최대 HP : +${value}`;
		case GearPropType.incMMP:
			return `최대 MP : +${value}`;
		case GearPropType.incMHPr:
			return `최대 HP : +${value}%`;
		case GearPropType.incMMPr:
			return `최대 MP : +${value}%`;
		case GearPropType.incMDF:
			return `MaxDF : +${value}`;
		case GearPropType.incPAD:
			return `공격력 : +${value}`;
		case GearPropType.incMAD:
			return `마력 : +${value}`;
		case GearPropType.incPDD:
			return `방어력 : +${value}`;
		case GearPropType.incSpeed:
			return `이동속도 : +${value}`;
		case GearPropType.incJump:
			return `점프력 : +${value}`;
		case GearPropType.knockback:
			return `직접 타격시 ${value}%의 확률로 넉백`;
		case GearPropType.bdR:
			return `보스 몬스터 공격 시 데미지 : +${value}%`;
		case GearPropType.imdR:
			return `몬스터 방어율 무시 : +${value}%`;
		case GearPropType.damR:
			return `데미지 : +${value}%`;
		case GearPropType.statR:
			return `올스탯: +${value}%`;
		case GearPropType.reduceReq:
			return `착용 레벨 감소 : - ${value}`;

		case GearPropType.incPADr:
			return `공격력 : +${value}%`;
		case GearPropType.incMADr:
			return `마력 : +${value}%`;

		case GearPropType.incCr:
			return `크리티컬 확률 : +${value}%`;

		default:
			if (value > 0) {
				switch (type) {
					case GearPropType.only:
						return '고유 아이템';
					case GearPropType.tradeBlock:
						return '교환 불가';
					case GearPropType.equipTradeBlock:
						return '장착 시 교환 불가';
					case GearPropType.accountSharable:
						return '월드 내 나의 캐릭터간 이동만 가능';
					case GearPropType.sharableOnce:
						return '월드 내 나의 캐릭터 간 1회 이동 가능\n(이동 후 교환불가)';
					case GearPropType.onlyEquip:
						return '고유장착 아이템';
					case GearPropType.blockGoldHammer:
						return '황금망치 사용 불가';
					case GearPropType.noPotential:
						return '잠재능력 설정 불가';
					case GearPropType.fixedPotential:
						return '잠재능력 재설정 불가';
					case GearPropType.exceptUpgrade:
						return '강화불가';
					case GearPropType.tradeAvailable:
						switch (value) {
							case 1:
								return '#c카르마의 가위 또는 실버 카르마의 가위를 사용하면 1회 교환이 가능하게 할 수 있습니다.#';
							case 2:
								return '#c플래티넘 카르마의 가위를 사용하면 1회 교환이 가능하게 할 수 있습니다.#';
						}
						break;
					case GearPropType.accountShareTag:
						return '#c쉐어 네임 텍을 사용하면 월드 내 나의 캐릭터 간 1회 이동할 수 있습니다.#';
					case GearPropType.superiorEqp:
						return '아이템 강화 성공시 더욱 높은 효과를 받을 수 있습니다.';
					case GearPropType.jokerToSetItem:
						return '#c3개 이상 착용하고 있는 모든 세트 아이템에 포함되는 럭키 아이템! (단, 2개 이상의 럭키 아이템 착용 시 1개만 효과 적용.)#';
				}
			}
			return '';
	}
}

export function getGearOptionString(type: GearPropType, option: GearOption): string {
	let propStr = getGearPropString(type, option.sum);
	if (option.sum > option.base) {
		let subfix = '';
		let bonusStr = '';
		let enchantStr = '';
		switch (type) {
			case GearPropType.incSTR:
			case GearPropType.incDEX:
			case GearPropType.incINT:
			case GearPropType.incLUK:
			case GearPropType.incMHP:
			case GearPropType.incMMP:
			case GearPropType.incMDF:
			case GearPropType.incARC:
			case GearPropType.incAUT:
			case GearPropType.incPAD:
			case GearPropType.incMAD:
			case GearPropType.incPDD:
			case GearPropType.incSpeed:
			case GearPropType.incJump:
				if (option.bonus > 0) {
					bonusStr = ` #g+${option.bonus}#`;
				}
				if (option.upgrade + option.enchant > 0) {
					enchantStr = ` #$+${option.upgrade + option.enchant}#`;
				}
				subfix = `(${option.base}${bonusStr}${enchantStr})`;
				break;

			case GearPropType.bdR:
			case GearPropType.incBDR:
			case GearPropType.imdR:
			case GearPropType.incIMDR:
			case GearPropType.damR:
			case GearPropType.incDAMr:
			case GearPropType.statR:
				if (option.bonus > 0) {
					bonusStr = ` #g+${option.bonus}%#`;
				}
				if (option.upgrade + option.enchant > 0) {
					enchantStr = ` #$+${option.upgrade + option.enchant}%#`;
				}
				subfix = `(${option.base}%${bonusStr}%${enchantStr}%)`;
				break;
		}
		propStr = `#$${propStr}# ${subfix}`;
	}
	return propStr;
}

export function getGradeString(grade: PotentialGrade): string {
	switch (grade) {
		case PotentialGrade.rare:
			return '(레어 아이템)';
		case PotentialGrade.epic:
			return '(에픽 아이템)';
		case PotentialGrade.unique:
			return '(유니크 아이템)';
		case PotentialGrade.legendary:
			return '(레전드리 아이템)';
		case PotentialGrade.special:
			return '(스페셜 아이템)';
		default:
			return '';
	}
}

export function getGearTypeString(type: GearType): string {
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

		default:
			return type;
	}
}

export function getAttackSpeedString(attackSpeed: number) {
	let str: string;
	switch (attackSpeed) {
		case 2:
		case 3:
			str = '매우 빠름';
			break;
		case 4:
		case 5:
			str = '빠름';
			break;
		case 6:
			str = '보통';
			break;
		case 7:
		case 8:
			str = '느림';
			break;
		case 9:
			str = '매우 느림';
			break;
		default:
			str = attackSpeed.toString();
			break;
	}
	return `${str} (${10 - attackSpeed}단계)`;
}

export function getExtraJobReqString(type: GearType): string {
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

		default:
			return '';
	}
}

export function getExtraJobReqStringByJob(specJob: number): string {
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
		case 41:
			return '剑豪可穿戴装备';
		case 42:
			return '阴阳师可穿戴装备';
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
		default:
			return '';
	}
}
