import { Gear, GearType, PotentialGrade } from '@malib/gear';
import { describe, expect, test } from 'vitest';
import { setSoulAmplification } from './soul-amplification';

function createGear() {
	return new Gear({
		version: 4,
		id: 1212145,
		name: '무기',
		icon: '1212145',
		type: GearType.shiningRod,
		req: { level: 250 },
		attributes: {},
		baseOption: { magicPower: 439 },
		soulWeapon: { enchanted: true, soul: { name: '위대한 소울', magnificent: true, option: {} } }
	});
}

describe('소울 증폭 단계 설정', () => {
	test('0단계에서 4단계로 증폭하고 잠재능력을 초기화한다', () => {
		const gear = createGear();
		setSoulAmplification(gear, 4);
		expect(gear.soulAmplificationLevel).toBe(4);
		expect(gear.soulPotentialGrade).toBe(PotentialGrade.Rare);
	});
	test('0단계에서도 잠재능력 등급과 옵션을 보존한다', () => {
		const gear = createGear();
		setSoulAmplification(gear, 4);
		gear.data.soulWeapon!.potentialGrade = PotentialGrade.Unique;
		setSoulAmplification(gear, 2);
		expect(gear.soulAmplificationLevel).toBe(2);
		expect(gear.soulPotentialGrade).toBe(PotentialGrade.Unique);
		setSoulAmplification(gear, 0);
		expect(gear.soulAmplificationLevel).toBe(0);
		expect(gear.soulPotentialGrade).toBe(PotentialGrade.Unique);
		expect(gear.soulPotentials).toHaveLength(3);
		expect(gear.soulEnchanted).toBe(true);
		expect(gear.soul?.magnificent).toBe(true);
	});
	test.each([-1, 5, 1.5, NaN, Infinity])('잘못된 단계 %s는 적용하지 않는다', (level) => {
		const gear = createGear();
		setSoulAmplification(gear, level);
		expect(gear.soulAmplificationLevel).toBe(0);
	});
	test('일반 소울은 증폭하지 않는다', () => {
		const gear = createGear();
		gear.data.soulWeapon!.soul!.magnificent = false;
		setSoulAmplification(gear, 4);
		expect(gear.soulAmplificationLevel).toBe(0);
	});
	test('요구 레벨 200 미만인 무기는 증폭하지 않는다', () => {
		const gear = createGear();
		gear.data.req.level = 199;
		setSoulAmplification(gear, 4);
		expect(gear.soulAmplificationLevel).toBe(0);
	});
	test.each(['enchant', 'soul'] as const)(
		'비활성화 후에는 증폭과 잠재능력을 변경하지 않는다: %s',
		(target) => {
			const gear = createGear();
			setSoulAmplification(gear, 4);
			if (target === 'enchant') gear.removeSoulEnchant();
			else gear.removeSoul();
			const previous = structuredClone(gear.data.soulWeapon);
			for (const level of [3, 0, 1, 4]) {
				setSoulAmplification(gear, level);
				expect(gear.data.soulWeapon).toEqual(previous);
			}
		}
	);
});

test('첫 증폭은 왼쪽 드롭다운의 첫 옵션으로 세 줄을 초기화한다', () => {
	const gear = createGear();
	setSoulAmplification(gear, 1);
	expect(gear.soulPotentials.map(({ id, summary }) => ({ id, summary }))).toEqual([
		{ id: 15001, summary: 'STR +2' },
		{ id: 15001, summary: 'STR +2' },
		{ id: 15001, summary: 'STR +2' }
	]);
});

test('증폭 단계를 변경하면 선택된 옵션과 등급을 유지하며 수치를 갱신한다', () => {
	const gear = createGear();
	setSoulAmplification(gear, 1);
	gear.data.soulWeapon!.potentialGrade = PotentialGrade.Unique;
	gear.data.soulWeapon!.potentials = Array.from({ length: 3 }, () => ({
		id: 35001,
		grade: PotentialGrade.Unique,
		summary: 'STR +8',
		option: { str: 8 }
	}));
	setSoulAmplification(gear, 4);
	expect(gear.soulPotentialGrade).toBe(PotentialGrade.Unique);
	expect(gear.soulPotentials.map((p) => [p.id, p.option.str])).toEqual([
		[35001, 32],
		[35001, 32],
		[35001, 32]
	]);
	setSoulAmplification(gear, 2);
	expect(gear.soulPotentials.map((p) => p.option.str)).toEqual([16, 16, 16]);
});

test('옵션이 비어 있는 기존 증폭 장비도 다음 증폭 시 세 옵션을 채운다', () => {
	const gear = createGear();
	gear.data.soulWeapon!.amplificationLevel = 1;
	gear.data.soulWeapon!.potentialGrade = PotentialGrade.Epic;
	setSoulAmplification(gear, 2);
	expect(gear.soulPotentials.map((p) => p.id)).toEqual([25041, 25041, 25041]);
	expect(gear.soulPotentials[0].option.strRate).toBe(2);
});

test('증폭을 0으로 내렸다가 다시 올려도 선택한 등급과 옵션을 복원한다', () => {
	const gear = createGear();
	setSoulAmplification(gear, 4);
	gear.setSoulPotential(PotentialGrade.Unique, [
		{ id: 35002, grade: PotentialGrade.Unique, summary: 'DEX +32', option: { dex: 32 } },
		{ id: 25041, grade: PotentialGrade.Epic, summary: 'STR +4%', option: { strRate: 4 } },
		{ id: 15003, grade: PotentialGrade.Rare, summary: 'INT +8', option: { int: 8 } }
	]);
	const before = gear.soulPotentials;
	setSoulAmplification(gear, 0);
	expect(gear.soulPotentialGrade).toBe(PotentialGrade.Unique);
	expect(gear.soulPotentials).toEqual(before);
	expect(gear.soulAmplificationActive).toBe(false);
	setSoulAmplification(gear, 1);
	expect(gear.soulPotentialGrade).toBe(PotentialGrade.Unique);
	expect(gear.soulPotentials.map((p) => [p.id, p.grade, p.summary])).toEqual([
		[35002, PotentialGrade.Unique, 'DEX +8'],
		[25041, PotentialGrade.Epic, 'STR +1%'],
		[15003, PotentialGrade.Rare, 'INT +2']
	]);
	setSoulAmplification(gear, 0);
	setSoulAmplification(gear, 4);
	expect(gear.soulPotentials).toEqual(before);
});
