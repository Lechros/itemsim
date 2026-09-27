import { PotentialGrade } from '@malib/gear';
import { render, screen } from '@testing-library/svelte';
import { expect, test, vi } from 'vitest';
import GearPotentialUIBase from './GearPotentialUIBase.svelte';

test('기존 잠재능력 UI는 없음 등급과 초기화 동작을 유지한다', () => {
	const onChange = vi.fn();
	render(GearPotentialUIBase, {
		getGradePotentials: () => [],
		gradeLabel: '잠재능력 등급',
		optionLabel: '잠재능력 옵션',
		onChange
	});
	expect(screen.getByRole('tab', { name: '없음' })).toBeInTheDocument();
	expect(onChange).toHaveBeenCalledWith(PotentialGrade.Normal, []);
});

test('비활성 소울 편집기는 없음 등급을 숨기고 값을 변경하지 않는다', () => {
	const onChange = vi.fn();
	render(GearPotentialUIBase, {
		initialGrade: PotentialGrade.Rare,
		minimumGrade: PotentialGrade.Rare,
		disabled: true,
		getGradePotentials: () => [],
		gradeLabel: '소울 잠재능력 등급',
		optionLabel: '소울 잠재능력 옵션',
		onChange
	});
	expect(screen.queryByRole('tab', { name: '없음' })).not.toBeInTheDocument();
	for (const tab of screen.getAllByRole('tab')) expect(tab).toBeDisabled();
	for (const select of screen.getAllByRole('button', { name: '-' })) expect(select).toBeDisabled();
	expect(onChange).not.toHaveBeenCalled();
});
