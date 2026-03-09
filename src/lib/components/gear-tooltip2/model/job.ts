import { GearType, type GearReqData } from '@malib/gear';

export function getReqJobNames(
	type: GearType,
	reqJob: NonNullable<Required<GearReqData['job']>>
): string[] {
	const typeJobName = getGearTypeJobName(type, reqJob.fullJobs);
	if (typeJobName) {
		return Array.isArray(typeJobName) ? typeJobName : [typeJobName];
	}

	if (reqJob.fullJobs.length > 0) {
		return reqJob.fullJobs.map((fullJob) => getFullJobName(fullJob)).filter(Boolean) as string[];
	}
	if (reqJob.jobs.length > 0) {
		return reqJob.jobs.map((job) => getJobName(job)).filter(Boolean) as string[];
	}

	switch (reqJob.class) {
		case -1:
			return ['초보자'];
		case 0:
			return ['공용'];
		default:
			return ['전사', '마법사', '궁수', '도적', '해적'].filter((_, i) => reqJob.class & (1 << i));
	}
}

function getGearTypeJobName(type: GearType, fullJobs: number[]): string | string[] | undefined {
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
			if (fullJobs.length > 0) {
				return fullJobs.map((fullJob) => getFullJobName(fullJob)).filter(Boolean) as string[];
			}
			return '시그너스 기사단';

		// 2xxx
		case GearType.mass:
			return getJobName(21);
		case GearType.document:
			return getJobName(22);
		case GearType.magicArrow:
			return getJobName(23);
		case GearType.card:
			return getJobName(24);
		case GearType.foxMarble:
			return getJobName(25);
		case GearType.orb:
		case GearType.shiningRod:
			return getJobName(27);

		// 3xxx
		case GearType.demonShield:
			return getJobName(31);
		case GearType.desperado:
			return '데몬 어벤져';
		case GearType.magicMarble:
			return '배틀메이지';
		case GearType.arrowhead:
			return '와일드헌터';
		case GearType.magnum:
			return '메카닉';
		case GearType.controller:
		case GearType.powerSource:
		case GearType.energySword:
			return getJobName(36);
		case GearType.gauntletRevolver:
		case GearType.charge:
			return getJobName(37);

		// 5xxx
		case GearType.soulShield:
			return getJobName(51);

		// 6xxx
		case GearType.dragonEssence:
			return getJobName(61);
		case GearType.breathShooter:
		case GearType.weaponBelt:
			return getJobName(63);
		case GearType.chain:
		case GearType.transmitter:
			return getJobName(64);
		case GearType.soulRing:
		case GearType.soulShooter:
			return getJobName(65);

		// 10xxx
		case GearType.heavySword:
		case GearType.longSword:
		case GearType.hourGlass:
			return getJobName(101);

		case GearType.espLimiter:
		case GearType.chessPiece:
			return getJobName(142);

		case GearType.magicGauntlet:
		case GearType.magicWing:
			return getJobName(152);

		case GearType.pathOfAbyss:
			return getJobName(155);

		case GearType.ritualFan:
		case GearType.fanTassel:
			return getJobName(164);

		case GearType.tuner:
		case GearType.bracelet:
			return getJobName(151);

		case GearType.ornament:
			return getJobName(162);

		case GearType.chakram:
		case GearType.hexSeeker:
			return getJobName(154);

		case GearType.longSword2:
		case GearType.sacredJewel:
			return getJobName(161);
	}
}

function getJobName(job: number): string | undefined {
	switch (job) {
		case 11:
			return '소울마스터';
		case 12:
			return '플레임위자드';
		case 13:
			return '윈드브레이커';
		case 14:
			return '나이트워커';
		case 15:
			return '스트라이커';
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
		case 32:
			return '배틀메이지';
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
			return '엔젤릭버스터';
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

function getFullJobName(fullJob: number): string | undefined {
	switch (fullJob) {
		case 0:
			return '초보자';
		case 100:
			return '검사';
		case 110:
			return '파이터';
		case 111:
			return '크루세이더';
		case 112:
		case 114:
			return '히어로';
		case 120:
			return '페이지';
		case 121:
			return '나이트';
		case 122:
		case 124:
			return '팔라딘';
		case 130:
			return '스피어맨';
		case 131:
			return '드래곤나이트';
		case 132:
		case 134:
			return '다크나이트';
		case 200:
			return '매지션';
		case 210:
			return '위자드(불,독)';
		case 211:
			return '메이지(불,독)';
		case 212:
		case 214:
			return '아크메이지(불,독)';
		case 220:
			return '위자드(썬,콜)';
		case 221:
			return '메이지(썬,콜)';
		case 222:
		case 224:
			return '아크메이지(썬,콜)';
		case 230:
			return '클레릭';
		case 231:
			return '프리스트';
		case 232:
		case 234:
			return '비숍';
		case 300:
			return '아처';
		case 301:
			return '아처';
		case 310:
			return '헌터';
		case 311:
			return '레인저';
		case 312:
		case 314:
			return '보우마스터';
		case 320:
			return '사수';
		case 321:
			return '저격수';
		case 322:
		case 324:
			return '신궁';
		case 330:
			return '에인션트 아처';
		case 331:
			return '체이서';
		case 332:
		case 334:
			return '패스파인더';
		case 400:
			return '로그';
		case 410:
			return '어쌔신';
		case 411:
			return '허밋';
		case 412:
		case 414:
			return '나이트로드';
		case 420:
			return '시프';
		case 421:
			return '시프마스터';
		case 422:
		case 424:
			return '섀도어';
		case 430:
			return '세미듀어러';
		case 431:
			return '듀어러';
		case 432:
			return '듀얼마스터';
		case 433:
			return '슬래셔';
		case 434:
		case 436:
			return '듀얼블레이더';
		case 500:
			return '해적';
		case 501:
			return '해적';
		case 510:
			return '인파이터';
		case 511:
			return '버커니어';
		case 512:
		case 514:
			return '바이퍼';
		case 520:
			return '건슬링거';
		case 521:
			return '발키리';
		case 522:
		case 524:
			return '캡틴';
		case 530:
			return '캐논슈터';
		case 531:
			return '캐논블래스터';
		case 532:
		case 534:
			return '캐논마스터';

		case 800:
		case 900:
			return '운영자';

		case 1000:
			return '노블레스';
		case 1100:
		case 1110:
		case 1111:
		case 1112:
		case 1114:
			return '소울마스터';
		case 1200:
		case 1210:
		case 1211:
		case 1212:
		case 1214:
			return '플레임위자드';
		case 1300:
		case 1310:
		case 1311:
		case 1312:
		case 1314:
			return '윈드브레이커';
		case 1400:
		case 1410:
		case 1411:
		case 1412:
		case 1414:
			return '나이트워커';
		case 1500:
		case 1510:
		case 1511:
		case 1512:
		case 1514:
			return '스트라이커';

		case 2000:
			return '레전드';
		case 2001:
			return '에반';
		case 2002:
			return '메르세데스';
		case 2003:
			return '팬텀';
		case 2004:
			return '루미너스';
		case 2005:
			return '은월';
		case 2100:
		case 2110:
		case 2111:
		case 2112:
		case 2114:
			return '아란';
		case 2200:
		case 2210:
		case 2211:
		case 2212:
		case 2213:
		case 2214:
		case 2215:
		case 2216:
		case 2217:
		case 2218:
		case 2220:
			return '에반';
		case 2300:
		case 2310:
		case 2311:
		case 2312:
		case 2314:
			return '메르세데스';
		case 2400:
		case 2410:
		case 2411:
		case 2412:
		case 2414:
			return '팬텀';
		case 2500:
		case 2510:
		case 2511:
		case 2512:
		case 2514:
			return '은월';
		case 2700:
		case 2710:
		case 2711:
		case 2712:
		case 2714:
			return '루미너스';

		case 3000:
			return '시티즌';
		case 3001:
			return '데몬';
		case 3100:
		case 3110:
		case 3111:
		case 3112:
		case 3114:
			return '데몬 슬레이어';
		case 3101:
		case 3120:
		case 3121:
		case 3122:
		case 3124:
			return '데몬 어벤져';
		case 3200:
		case 3210:
		case 3211:
		case 3212:
		case 3214:
			return '배틀메이지';
		case 3300:
		case 3310:
		case 3311:
		case 3312:
		case 3314:
			return '와일드헌터';
		case 3500:
		case 3510:
		case 3511:
		case 3512:
		case 3514:
			return '메카닉';
		case 3002:
		case 3600:
		case 3610:
		case 3611:
		case 3612:
		case 3614:
			return '제논';
		case 3700:
		case 3710:
		case 3711:
		case 3712:
		case 3714:
			return '블래스터';

		case 5000:
			return '미하일';
		case 5100:
		case 5110:
		case 5111:
		case 5112:
		case 5114:
			return '미하일';

		case 6000:
			return '카이저';
		case 6001:
			return '엔젤릭버스터';
		case 6002:
			return '카데나';
		case 6003:
			return '카인';
		case 6004:
			return '노바';
		case 6100:
		case 6110:
		case 6111:
		case 6112:
		case 6114:
			return '카이저';
		case 6200:
		case 6210:
		case 6211:
		case 6212:
		case 6214:
			return '노바_마법사';
		case 6300:
		case 6310:
		case 6311:
		case 6312:
		case 6314:
			return '카인';
		case 6400:
		case 6410:
		case 6411:
		case 6412:
		case 6414:
			return '카데나';
		case 6500:
		case 6510:
		case 6511:
		case 6512:
		case 6514:
			return '엔젤릭버스터';

		case 10000:
		case 10100:
		case 10110:
		case 10111:
		case 10112:
		case 10114:
			return '제로';

		case 14000:
		case 14200:
		case 14210:
		case 14211:
		case 14212:
		case 14214:
			return '키네시스';

		case 15000:
			return '일리움';
		case 15001:
			return '아크';
		case 15002:
			return '아델';
		case 15003:
			return '칼리';
		case 15004:
			return '레프';
		case 15100:
		case 15110:
		case 15111:
		case 15112:
		case 15114:
			return '아델';
		case 15200:
		case 15210:
		case 15211:
		case 15212:
		case 15214:
			return '일리움';
		case 15300:
		case 15310:
		case 15311:
		case 15312:
		case 15314:
			return '레프_궁수';
		case 15400:
		case 15410:
		case 15411:
		case 15412:
		case 15414:
			return '칼리';
		case 15500:
		case 15510:
		case 15511:
		case 15512:
		case 15514:
			return '아크';

		case 16000:
			return '호영';
		case 16001:
			return '라라';
		case 16002:
			return '렌';
		case 16003:
		case 16004:
			return '아니마';
		case 16100:
		case 16110:
		case 16114:
			return '렌';
		case 16200:
		case 16214:
			return '라라';
		case 16300:
		case 16314:
			return '아니마_궁수';
		case 16400:
		case 16410:
		case 16411:
		case 16412:
		case 16414:
			return '호영';
		case 16500:
		case 16510:
		case 16511:
		case 16512:
		case 16514:
			return '아니마_해적';
	}
}
