import { Gear, GearType, PotentialGrade } from '@malib/gear';
import { fireEvent, render, screen } from '@testing-library/svelte';
import { afterEach, beforeEach, expect, test, vi } from 'vitest';
import SoulAmplificationTab from './SoulAmplificationTab.svelte';
import { setSoulAmplification } from '../model/soul-amplification';

beforeEach(() => {
	vi.stubGlobal(
		'ResizeObserver',
		class {
			observe() {}
			unobserve() {}
			disconnect() {}
		}
	);
});
afterEach(() => vi.unstubAllGlobals());

function createGear(level: number, amplificationLevel: number) {
	return new Gear({
		version: 4,
		id: 1212145,
		name: '무기',
		icon: '1212145',
		type: GearType.shiningRod,
		req: { level },
		attributes: {},
		baseOption: {},
		soulWeapon: {
			enchanted: true,
			soul: { name: '위대한 소울', magnificent: true, option: {} },
			amplificationLevel
		}
	});
}

test('최대 증폭에서도 단계를 낮출 수 있다', async () => {
	const gear = createGear(250, 4);
	render(SoulAmplificationTab, { gear, currentTab: 'soulAmplification' });
	expect(screen.getByRole('button', { name: '소울 증폭 단계 증가' })).toBeDisabled();
	expect(screen.getByRole('spinbutton', { name: '소울 증폭 단계' })).toBeEnabled();
	expect(screen.getByRole('slider')).not.toHaveAttribute('aria-disabled', 'true');
	await fireEvent.click(screen.getByRole('button', { name: '소울 증폭 단계 감소' }));
	expect(gear.soulAmplificationLevel).toBe(3);
});

test('위대한 소울이 있어도 200레벨 미만이면 요구 레벨을 안내한다', () => {
	const gear = createGear(199, 0);
	render(SoulAmplificationTab, { gear, currentTab: 'soulAmplification' });
	expect(
		screen.getByText('요구 레벨 200 이상인 무기만 소울을 증폭할 수 있어요.')
	).toBeInTheDocument();
	expect(screen.getByRole('button', { name: '소울 증폭 단계 증가' })).toBeDisabled();
});

test('증폭 전에는 소울 잠재능력 등급과 옵션 세 줄을 비활성 상태로 표시한다', () => {
	const gear = createGear(250, 0);
	render(SoulAmplificationTab, { gear, currentTab: 'soulAmplification' });
	expect(screen.getByText('소울 잠재능력 등급')).toBeInTheDocument();
	expect(screen.getByText('소울 잠재능력 옵션')).toBeInTheDocument();
	expect(screen.queryByRole('tab', { name: '없음' })).not.toBeInTheDocument();
	for (const tab of screen.getAllByRole('tab')) expect(tab).toBeDisabled();
	const options = screen.getAllByRole('button', { name: '-' });
	expect(options).toHaveLength(3);
	for (const option of options) expect(option).toBeDisabled();
	expect(gear.data.soulWeapon!.potentialGrade).toBeUndefined();
	expect(gear.data.soulWeapon!.potentials).toBeUndefined();
});

test('증폭된 소울은 전용 목록을 표시하고 등급 변경 후에도 세 옵션을 유지한다', async () => {
	const gear = createGear(250, 1);
	render(SoulAmplificationTab, { gear, currentTab: 'soulAmplification' });
	expect(gear.soulPotentials.map((p) => p.id)).toEqual([15001, 15001, 15001]);
	expect(screen.getAllByRole('button', { name: 'STR +2' })[0]).toBeEnabled();
	const previousPotentials = gear.soulPotentials;
	await fireEvent.click(screen.getByRole('tab', { name: '에픽' }));
	expect(gear.soulPotentialGrade).toBe(PotentialGrade.Epic);
	expect(gear.soulPotentials).toHaveLength(3);
	expect(gear.soulPotentials).toEqual(previousPotentials);
	await fireEvent.keyDown(screen.getAllByRole('button', { name: 'STR +2' })[0], { key: 'Enter' });
	expect(await screen.findByRole('listbox')).toBeInTheDocument();
	expect(screen.queryByRole('option', { name: '-' })).not.toBeInTheDocument();
});

test.each(['enchant', 'soul'] as const)(
	'비활성 상태에서는 모든 증폭 및 잠재능력 컨트롤이 잠긴다: %s',
	(target) => {
		const gear = createGear(250, 0);
		setSoulAmplification(gear, 4);
		if (target === 'enchant') gear.removeSoulEnchant();
		else gear.removeSoul();
		const previous = structuredClone(gear.data.soulWeapon);
		render(SoulAmplificationTab, { gear, currentTab: 'soulAmplification' });
		expect(screen.getByRole('button', { name: '소울 증폭 단계 감소' })).toBeDisabled();
		expect(screen.getByRole('button', { name: '소울 증폭 단계 증가' })).toBeDisabled();
		expect(screen.getByRole('spinbutton')).toBeDisabled();
		expect(screen.getByRole('slider')).toHaveAttribute('aria-disabled', 'true');
		for (const tab of screen.getAllByRole('tab')) expect(tab).toBeDisabled();
		for (const option of screen.getAllByRole('button', { name: 'STR +8' }))
			expect(option).toBeDisabled();
		expect(gear.data.soulWeapon).toEqual(previous);
	}
);

test('0단계에서도 증폭 조건을 충족하면 최초 증폭할 수 있다', async () => {
	const gear = createGear(250, 0);
	render(SoulAmplificationTab, { gear, currentTab: 'soulAmplification' });
	await fireEvent.click(screen.getByRole('button', { name: '소울 증폭 단계 증가' }));
	expect(gear.soulAmplificationLevel).toBe(1);
	expect(gear.soulPotentials).toHaveLength(3);
});

test('동일한 설명의 소울 잠재능력은 목록에 한 번만 표시한다', async () => {
	const gear = createGear(250, 1);
	render(SoulAmplificationTab, { gear, currentTab: 'soulAmplification' });
	await fireEvent.keyDown(screen.getAllByRole('button', { name: 'STR +2' })[1], { key: 'Enter' });
	await screen.findByRole('listbox');
	expect(screen.getAllByRole('option', { name: '이동속도 +1' })).toHaveLength(1);
	expect(screen.getAllByRole('option', { name: '점프력 +1' })).toHaveLength(1);
});
