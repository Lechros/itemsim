import { Gear, GearType, type SoulOption } from '@malib/gear';
import { fireEvent, render, screen, waitFor } from '@testing-library/svelte';
import { afterEach, beforeEach, expect, test, vi } from 'vitest';
import { getSoulData, getSoulSearch } from '$lib/api';
import SoulEnchantTabHarness from './test/SoulEnchantTabHarness.svelte';

// jsdom에는 레이아웃이 없으므로 가상 목록의 항목을 직접 렌더링합니다.
vi.mock('virtua/svelte', async () => ({
	Virtualizer: (await import('./test/Virtualizer.svelte')).default
}));

vi.mock('$lib/api', () => ({
	getSoulSearch: vi.fn(async () => []),
	getSoulData: vi.fn(),
	getItemRawIconOrigin: vi.fn(async () => ({ x: 0, y: 0 })),
	getItemRawIconUrl: vi.fn(() => '')
}));

afterEach(() => vi.unstubAllGlobals());

beforeEach(() => {
	vi.stubGlobal(
		'ResizeObserver',
		class {
			observe() {}
			unobserve() {}
			disconnect() {}
		}
	);
	vi.mocked(getSoulSearch).mockReset().mockResolvedValue([]);
	vi.mocked(getSoulData).mockReset();
});

function createGear(amplificationLevel = 0, enchanted = true) {
	return new Gear({
		version: 4,
		id: 1212145,
		name: '무기',
		icon: '1212145',
		type: GearType.shiningRod,
		req: { level: 250 },
		attributes: {},
		baseOption: {},
		soulWeapon: {
			enchanted,
			amplificationLevel,
			soul: { name: '위대한 소울', magnificent: true, option: {} }
		}
	});
}

test('체크박스로 위대한 소울 검색 필터를 켜고 끈다', async () => {
	render(SoulEnchantTabHarness, { gear: createGear() });
	const checkbox = screen.getByRole('checkbox', { name: '위대한 소울만 검색' });
	expect(checkbox).not.toBeChecked();
	expect(checkbox).toBeEnabled();
	await fireEvent.input(screen.getByPlaceholderText('소울 이름'), { target: { value: '소울' } });
	await waitFor(() =>
		expect(getSoulSearch).toHaveBeenCalledWith('소울', undefined, expect.any(AbortSignal))
	);
	await fireEvent.click(checkbox);
	expect(checkbox).toBeChecked();
	await waitFor(() =>
		expect(getSoulSearch).toHaveBeenCalledWith('소울', true, expect.any(AbortSignal))
	);
	await fireEvent.click(checkbox);
	expect(checkbox).not.toBeChecked();
	await fireEvent.input(screen.getByPlaceholderText('소울 이름'), {
		target: { value: '다른 소울' }
	});
	await waitFor(() =>
		expect(getSoulSearch).toHaveBeenCalledWith('다른 소울', undefined, expect.any(AbortSignal))
	);
});

test('증폭 활성 상태에서는 체크박스가 체크된 채로 잠긴다', async () => {
	render(SoulEnchantTabHarness, { gear: createGear(1) });
	const checkbox = screen.getByRole('checkbox', { name: '위대한 소울만 검색' });
	expect(checkbox).toBeChecked();
	expect(checkbox).toBeDisabled();
	await fireEvent.input(screen.getByPlaceholderText('소울 이름'), { target: { value: '소울' } });
	await waitFor(() =>
		expect(getSoulSearch).toHaveBeenCalledWith('소울', true, expect.any(AbortSignal))
	);
});

test.each(['enchant', 'soul'] as const)(
	'저장된 증폭 단계가 있으면 비활성 상태에서도 검색 필터를 고정한다: %s',
	async (target) => {
		const gear = createGear(4);
		if (target === 'enchant') gear.removeSoulEnchant();
		else gear.removeSoul();
		render(SoulEnchantTabHarness, { gear });
		const checkbox = screen.getByRole('checkbox', { name: '위대한 소울만 검색' });
		expect(checkbox).toBeDisabled();
		expect(checkbox).toBeChecked();
		await fireEvent.input(screen.getByPlaceholderText('소울 이름'), { target: { value: '소울' } });
		await waitFor(() =>
			expect(getSoulSearch).toHaveBeenCalledWith('소울', true, expect.any(AbortSignal))
		);
	}
);

test.each([
	{
		label: '인챈트 전',
		enchanted: false,
		equipped: true,
		name: '선택 소울',
		current: { attackPower: 3 },
		selected: { attackPower: 3 },
		magnificent: true,
		disabled: false,
		button: '소울 웨폰으로 변환 및 소울 부여'
	},
	{
		label: '소울 없음',
		enchanted: true,
		equipped: false,
		name: '선택 소울',
		current: {},
		selected: { attackPower: 3 },
		magnificent: true,
		disabled: false,
		button: '선택 소울 부여'
	},
	{
		label: '위대한 소울 이름과 옵션 동일',
		enchanted: true,
		equipped: true,
		name: '선택 소울',
		current: { attackPower: 3 },
		selected: { attackPower: 3 },
		magnificent: true,
		disabled: true,
		button: '선택 소울로 변경'
	},
	{
		label: '일반 소울 이름과 옵션 동일',
		enchanted: true,
		equipped: true,
		name: '선택 소울',
		current: { attackPower: 3 },
		selected: { attackPower: 3 },
		magnificent: false,
		disabled: true,
		button: '선택 소울로 변경'
	},
	{
		label: '이름만 다름',
		enchanted: true,
		equipped: true,
		name: '기존 소울',
		current: { attackPower: 3 },
		selected: { attackPower: 3 },
		magnificent: true,
		disabled: false,
		button: '선택 소울로 변경'
	},
	{
		label: '일반 소울 옵션 값 다름',
		enchanted: true,
		equipped: true,
		name: '선택 소울',
		current: { attackPower: 2 },
		selected: { attackPower: 3 },
		magnificent: false,
		disabled: false,
		button: '선택 소울로 변경'
	},
	{
		label: '옵션 종류 다름',
		enchanted: true,
		equipped: true,
		name: '선택 소울',
		current: { magicPower: 3 },
		selected: { attackPower: 3 },
		magnificent: true,
		disabled: false,
		button: '선택 소울로 변경'
	},
	{
		label: '기존 소울에만 추가 옵션 존재',
		enchanted: true,
		equipped: true,
		name: '선택 소울',
		current: { attackPower: 3, magicPower: 2 },
		selected: { attackPower: 3 },
		magnificent: true,
		disabled: false,
		button: '선택 소울로 변경'
	},
	{
		label: '키 순서와 명시적인 0은 동일 옵션',
		enchanted: true,
		equipped: true,
		name: '선택 소울',
		current: { magicPower: 2, attackPower: 3 },
		selected: { attackPower: 3, magicPower: 2, str: 0 },
		magnificent: true,
		disabled: true,
		button: '선택 소울로 변경'
	}
])(
	'$label 상태의 부여 버튼',
	async ({ enchanted, equipped, name, current, selected, magnificent, disabled, button }) => {
		const gear = createGear(0, enchanted);
		if (equipped)
			gear.data.soulWeapon!.soul = { name, magnificent, option: current as Partial<SoulOption> };
		else delete gear.data.soulWeapon!.soul;
		vi.mocked(getSoulSearch).mockResolvedValue([
			{ id: 2590000, name: '선택 소울', highlight: '선택 소울' }
		]);
		vi.mocked(getSoulData).mockResolvedValue(
			magnificent
				? { name: '선택 소울', magnificent: true, options: [selected as Partial<SoulOption>] }
				: { name: '선택 소울', magnificent: false, option: selected as Partial<SoulOption> }
		);
		render(SoulEnchantTabHarness, { gear });
		await fireEvent.input(screen.getByPlaceholderText('소울 이름'), { target: { value: '선택' } });
		await fireEvent.click(await screen.findByText('선택 소울'));
		const action = await screen.findByRole('button', { name: button });
		await waitFor(() =>
			expect(screen.queryByText('소울 정보를 불러오고 있어요.')).not.toBeInTheDocument()
		);
		await waitFor(() => {
			if (disabled) expect(action).toBeDisabled();
			else expect(action).toBeEnabled();
		});
		if (!disabled) {
			await fireEvent.click(action);
			expect(gear.soulEnchanted).toBe(true);
			expect(gear.soul?.name).toBe('선택 소울');
			expect(gear.data.soulWeapon!.soul!.option).toEqual(selected);
		}
	}
);
