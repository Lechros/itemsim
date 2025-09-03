import { GearType } from '@malib/gear';

export function getJobString(type: GearType, reqJob: number, reqClass?: number) {
	if (reqClass) {
		return getExtraJobReqStringByJob(reqClass);
	}
	const extraJob = getExtraJobReqString(type);
	if (extraJob) {
		return extraJob;
	}
	if (reqJob === 0 || reqJob === -1) {
		return '공용';
	}
	const jobs = ['전사', '마법사', '궁수', '도적', '해적'];
	const cans: string[] = [];
	for (let i = 0; i < jobs.length; i++) {
		if (reqJob & (1 << i)) {
			cans.push(jobs[i]);
		}
	}
	return cans.join(', ');
}

export function getExtraJobReqString(type: GearType) {
	switch (type) {
		// 0xxx
		case GearType.medallion:
			return '히어로 직업군';
		case GearType.rosary:
			return '팔라딘 직업군';
		case GearType.ironChain:
			return '다크나이트 직업군';
		case GearType.magicBook1:
			return '불,독 계열 마법사';
		case GearType.magicBook2:
			return '얼음,번개 계열 마법사';
		case GearType.magicBook3:
			return '비숍 계열 마법사';
		case GearType.arrowFletching:
			return '보우마스터 직업군';
		case GearType.bowThimble:
			return '신궁 직업군';
		case GearType.daggerScabbard:
			return '섀도어 직업군';
		case GearType.charm:
			return '나이트로드 직업군';
		case GearType.katara:
			return '듀얼블레이드 직업군';
		case GearType.wristBand:
			return '바이퍼 직업군';
		case GearType.farSight:
			return '캡틴 직업군';
		case GearType.powderKeg:
			return '캐논 슈터 직업군';
		case GearType.relic:
			return '패스파인더 직업군';

		// 1xxx
		case GearType.jewel:
			return '시그너스 기사단';

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
			return '데몬 어벤져';
		case GearType.magicMarble:
			return '배틀메이지 직업군';
		case GearType.arrowhead:
			return '와일드헌터 직업군';
		case GearType.magnum:
			return '메카닉';
		case GearType.controller:
		case GearType.powerSource:
		case GearType.energySword:
			return getExtraJobReqStringByJob(36);
		case GearType.gauntletRevolver:
		case GearType.charge:
			return getExtraJobReqStringByJob(37);

		// 5xxx
		case GearType.soulShield:
			return '미하일';

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

		case GearType.longSword2:
		case GearType.sacredJewel:
			return getExtraJobReqStringByJob(161);
	}
}

function getExtraJobReqStringByJob(specJob: number) {
	switch (specJob) {
		case 21:
			return '아란';
		case 22:
			return '에반';
		case 23:
			return '메르세데스';
		case 24:
			return '팬텀';
		case 25:
			return '은월';
		case 27:
			return '루미너스';
		case 31:
			return '데몬 직업군';
		case 36:
			return '제논';
		case 37:
			return '블래스터';
		case 51:
			return '미하일';
		case 61:
			return '카이저';
		case 63:
			return '카인';
		case 64:
			return '카데나';
		case 65:
			return '엔젤릭 버스터';
		case 101:
			return '제로';
		case 142:
			return '키네시스';
		case 151:
			return '아델';
		case 152:
			return '일리움';
		case 154:
			return '칼리';
		case 155:
			return '아크';
		case 161:
			return '렌';
		case 162:
			return '라라';
		case 164:
			return '호영';
	}
}
