import { afterEach, describe, expect, test, vi } from 'vitest';
import { getSoulData, getSoulSearch } from './soul';

vi.mock('$lib/config/env', () => ({ env: { API_URL: 'https://api.example.com' } }));

afterEach(() => vi.unstubAllGlobals());

describe('소울 API', () => {
	test('빈 검색어로는 요청하지 않는다', async () => {
		const fetch = vi.fn();
		vi.stubGlobal('fetch', fetch);

		expect(await getSoulSearch('   ')).toEqual([]);
		expect(fetch).not.toHaveBeenCalled();
	});

	test('검색어의 공백을 제거하고 인코딩하여 검색한다', async () => {
		const results = [{ id: 2591659, name: '위대한 루시드의 소울', highlight: '00001110000' }];
		const fetch = vi.fn().mockResolvedValue(Response.json(results));
		vi.stubGlobal('fetch', fetch);

		expect(await getSoulSearch('  루시드 & 소울  ')).toEqual(results);
		const request = fetch.mock.calls[0][0] as Request;
		expect(request.url).toBe(
			`https://api.example.com/souls/search?query=${encodeURIComponent('루시드 & 소울')}`
		);
	});

	test('선택한 ID의 상세 정보와 위대한 소울 여부를 가져온다', async () => {
		const data = {
			name: '위대한 루시드의 소울',
			magnificent: true,
			options: [{ magicPowerRate: 3 }, { attackPowerRate: 3 }]
		};
		const fetch = vi.fn().mockResolvedValue(Response.json(data));
		vi.stubGlobal('fetch', fetch);
		const controller = new AbortController();

		expect(await getSoulData(2591659, controller.signal)).toEqual(data);
		const request = fetch.mock.calls[0][0] as Request;
		expect(request.url).toBe('https://api.example.com/souls/2591659');
		controller.abort();
		expect(request.signal.aborted).toBe(true);
	});

	test('존재하지 않는 소울은 오류를 전달한다', async () => {
		vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(null, { status: 404 })));

		await expect(getSoulData(0)).rejects.toMatchObject({ response: { status: 404 } });
	});
	test.each([true, false])('passes magnificent=%s to the server', async (magnificent) => {
		const fetch = vi.fn().mockResolvedValue(Response.json([]));
		vi.stubGlobal('fetch', fetch);
		const controller = new AbortController();

		expect(await getSoulSearch('Lucid', magnificent, controller.signal)).toEqual([]);
		const request = fetch.mock.calls[0][0] as Request;
		const url = new URL(request.url);
		expect(url.searchParams.get('query')).toBe('Lucid');
		expect(url.searchParams.get('magnificent')).toBe(String(magnificent));
		controller.abort();
		expect(request.signal.aborted).toBe(true);
	});
});
