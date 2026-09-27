import { Gear, GearType } from '@malib/gear';
import { render, screen } from '@testing-library/svelte';
import { expect, test } from 'vitest';
import SoulOptionRow from './SoulOptionRow.svelte';

test('기본값 0으로 정규화된 소울 옵션에서 실제 옵션만 표시한다', () => {
	const gear = new Gear({
		version: 4,
		id: 1212145,
		name: '무기',
		icon: '1212145',
		type: GearType.shiningRod,
		req: { level: 250 },
		attributes: {},
		baseOption: { magicPower: 439 },
		soulWeapon: {
			enchanted: true,
			soul: { name: '위대한 소울', magnificent: true, option: { magicPowerRate: 3 } }
		}
	});
	render(SoulOptionRow, { soulOption: gear.soul!.option, baseOption: gear.soulBaseOption });
	expect(screen.getByText('마력 : +3%, 마력 : +20')).toBeInTheDocument();
	expect(screen.queryByText(/STR/)).not.toBeInTheDocument();
});
