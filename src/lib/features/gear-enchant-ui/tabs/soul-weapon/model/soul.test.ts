import { describe, expect, test } from 'vitest';
import { getSoulDatas, getSoulOptionString } from './soul';

describe('소울 상세 정보 변환', () => {
	test('일반 소울의 이름과 옵션을 장착 데이터로 변환한다', () => {
		const [soul] = getSoulDatas({ name: '기운찬 루시드의 소울', option: { str: 24 } });

		expect(soul.name).toBe('기운찬 루시드의 소울');
		expect(soul.option).toEqual({ str: 24 });
		expect(soul.magnificent).toBe(false);
	});

	test('위대한 소울은 서버가 제공한 옵션만 선택할 수 있다', () => {
		const souls = getSoulDatas({
			name: '위대한 소울',
			magnificent: true,
			options: [{ attackPowerRate: 3 }, { magicPowerRate: 3 }]
		});

		expect(souls).toEqual([
			{ name: '위대한 소울', magnificent: true, option: { attackPowerRate: 3 } },
			{ name: '위대한 소울', magnificent: true, option: { magicPowerRate: 3 } }
		]);
	});

	test('장착 옵션 변경이 캐시된 서버 응답을 수정하지 않는다', () => {
		const data = { name: '기운찬 루시드의 소울', option: { str: 24 }, magnificent: false as const };
		const [soul] = getSoulDatas(data);
		soul.option.str = 10;

		expect(data.option.str).toBe(24);
		expect(soul.magnificent).toBe(false);
	});
	test.each([
		[{ attackPowerRate: 3 }, { magicPowerRate: 3 }],
		[{ magicPowerRate: 3 }, { attackPowerRate: 3 }]
	])('preserves the server option order: %j, %j', (first, second) => {
		const options = [first, second];
		const souls = getSoulDatas({ name: 'Soul', magnificent: true, options });

		expect(souls.map((soul) => soul.option)).toEqual(options);
	});

	test('does not mutate cached magnificent soul options', () => {
		const data = {
			name: 'Soul',
			magnificent: true as const,
			options: [{ attackPowerRate: 3 }, { magicPowerRate: 3 }]
		};
		const souls = getSoulDatas(data);
		souls[0].option.attackPowerRate = 10;

		expect(data.options).toEqual([{ attackPowerRate: 3 }, { magicPowerRate: 3 }]);
	});
});

describe('소울 옵션 표시', () => {
	test('옵션이 없으면 빈 문자열을 반환한다', () => {
		expect(getSoulOptionString({})).toBe('');
	});
	test('여러 옵션을 모두 표시한다', () => {
		expect(getSoulOptionString({ str: 24, magicPowerRate: 3 })).toBe('STR +24, 마력 +3%');
	});
});
