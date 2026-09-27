import { Gear, GearCapability, GearType, PotentialGrade } from '@malib/gear';
import { render, screen } from '@testing-library/svelte';
import { describe, expect, test } from 'vitest';
import SoulWeapon from './SoulWeapon.svelte';

function createGear() {
	return new Gear({
		version: 4,
		id: 1212145,
		name: '무기',
		icon: '1212145',
		type: GearType.shiningRod,
		req: { level: 250 },
		attributes: { canPotential: GearCapability.Cannot },
		baseOption: { magicPower: 439 },
		potentialGrade: PotentialGrade.Legendary,
		potentials: [
			{ grade: PotentialGrade.Legendary, summary: '일반 잠재능력', option: { intRate: 12 } }
		],
		soulWeapon: {
			enchanted: true,
			soul: { name: '위대한 소울', magnificent: true, option: { magicPowerRate: 3 } },
			amplificationLevel: 2,
			potentialGrade: PotentialGrade.Unique,
			potentials: [
				{ grade: PotentialGrade.Unique, summary: '소울 전용 잠재능력', option: { magicPower: 10 } }
			]
		}
	});
}

describe('소울 툴팁', () => {
	test('소울 잠재능력의 등급과 옵션을 일반 잠재능력과 독립적으로 표시한다', () => {
		render(SoulWeapon, {
			props: { gear: createGear() },
			context: new Map([['FontRenderProvider', { itemDetailFontRender: undefined }]])
		});
		expect(screen.getByText('소울 잠재능력 : 유니크')).toBeInTheDocument();
		expect(screen.getByText('소울 전용 잠재능력')).toBeInTheDocument();
		expect(screen.queryByText('일반 잠재능력')).not.toBeInTheDocument();
	});
	test('200레벨 미만에서는 보존된 증폭과 잠재능력을 활성 상태로 표시하지 않는다', () => {
		const gear = createGear();
		gear.data.req.level = 199;
		render(SoulWeapon, {
			props: { gear },
			context: new Map([['FontRenderProvider', { itemDetailFontRender: undefined }]])
		});
		expect(screen.queryByText(/소울 잠재능력 :/)).not.toBeInTheDocument();
		expect(screen.queryByText('소울 전용 잠재능력')).not.toBeInTheDocument();
		expect(screen.getByText('소울 잠재능력 부여 불가')).toBeInTheDocument();
	});
	test('변환 해제 시 보존된 소울과 잠재능력을 숨긴다', () => {
		const gear = createGear();
		gear.removeSoulEnchant();
		render(SoulWeapon, {
			props: { gear },
			context: new Map([['FontRenderProvider', { itemDetailFontRender: undefined }]])
		});
		expect(screen.getByText('소울 : 소울 웨폰으로 변환 필요')).toBeInTheDocument();
		expect(screen.queryByText('소울 전용 잠재능력')).not.toBeInTheDocument();
	});
	test('소울 제거 시 보존된 잠재능력을 숨긴다', () => {
		const gear = createGear();
		gear.removeSoul();
		render(SoulWeapon, {
			props: { gear },
			context: new Map([['FontRenderProvider', { itemDetailFontRender: undefined }]])
		});
		expect(screen.getByText('소울 : 장착된 소울 없음')).toBeInTheDocument();
		expect(screen.queryByText('소울 전용 잠재능력')).not.toBeInTheDocument();
	});
	test('소울 옵션이 비어 있어도 상시 옵션을 표시한다', () => {
		const gear = createGear();
		gear.data.soulWeapon!.soul!.option = {};
		render(SoulWeapon, {
			props: { gear },
			context: new Map([['FontRenderProvider', { itemDetailFontRender: undefined }]])
		});
		expect(screen.getByText('마력 +20')).toBeInTheDocument();
	});
	test('여러 소울 옵션을 누락하지 않는다', () => {
		const gear = createGear();
		gear.data.soulWeapon!.soul!.option = { str: 24, magicPowerRate: 3 };
		render(SoulWeapon, {
			props: { gear },
			context: new Map([['FontRenderProvider', { itemDetailFontRender: undefined }]])
		});
		expect(screen.getByText('STR +24, 마력 +3%, 마력 +20')).toBeInTheDocument();
	});
});

test('증폭 전에는 잠재능력 부여에 증폭이 필요함을 안내한다', () => {
	const gear = createGear();
	gear.data.soulWeapon!.amplificationLevel = 0;
	render(SoulWeapon, {
		props: { gear },
		context: new Map([['FontRenderProvider', { itemDetailFontRender: undefined }]])
	});
	expect(screen.getByText('소울 증폭 후 잠재능력 부여 가능')).toBeInTheDocument();
	expect(screen.queryByText('소울 전용 잠재능력')).not.toBeInTheDocument();
});
