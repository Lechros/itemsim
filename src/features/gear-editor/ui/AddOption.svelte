<script lang="ts">
	import { ButtonGroup } from '$lib/shared/ui';
	import { getOptionStrings } from '$lib/entities/gear-tooltip2';
	import { Button } from '$lib/shared/shadcn/components/ui/button';
	import { Label } from '$lib/shared/shadcn/components/ui/label';
	import {
		Select,
		SelectContent,
		SelectItem,
		SelectTrigger
	} from '$lib/shared/shadcn/components/ui/select';
	import { Separator } from '$lib/shared/shadcn/components/ui/separator';
	import { AddOptionType, getAddOptionValue, type AddOptionGrade, type Gear } from '@malib/gear';
	import { untrack } from 'svelte';

	let { gear }: { gear: Gear } = $props();

	type AddOptionTypeOrEmpty = AddOptionType | '';
	type AddOptionGradeOrEmpty = AddOptionGrade | 0;

	const types = [
		{
			label: '-',
			value: ''
		},
		{
			label: 'STR',
			value: AddOptionType.str
		},
		{
			label: 'DEX',
			value: AddOptionType.dex
		},
		{
			label: 'INT',
			value: AddOptionType.int
		},
		{
			label: 'LUK',
			value: AddOptionType.luk
		},
		{
			label: 'STR, DEX',
			value: AddOptionType.str_dex
		},
		{
			label: 'STR, INT',
			value: AddOptionType.str_int
		},
		{
			label: 'STR, LUK',
			value: AddOptionType.str_luk
		},
		{
			label: 'DEX, INT',
			value: AddOptionType.dex_int
		},
		{
			label: 'DEX, LUK',
			value: AddOptionType.dex_luk
		},
		{
			label: 'INT, LUK',
			value: AddOptionType.int_luk
		},
		{
			label: '최대 HP',
			value: AddOptionType.maxHp
		},
		{
			label: '최대 MP',
			value: AddOptionType.maxMp
		},
		{
			label: '공격력',
			value: AddOptionType.attackPower
		},
		{
			label: '마력',
			value: AddOptionType.magicPower
		},
		{
			label: '방어력',
			value: AddOptionType.armor
		},
		{
			label: '이동속도',
			value: AddOptionType.speed
		},
		{
			label: '점프력',
			value: AddOptionType.jump
		},
		{
			label: '보스 몬스터 데미지',
			value: AddOptionType.bossDamage
		},
		{
			label: '데미지',
			value: AddOptionType.damage
		},
		{
			label: '올스탯',
			value: AddOptionType.allStat
		},
		{
			label: '착용 레벨 감소',
			value: AddOptionType.reqLevelDecrease
		}
	] as const;
	const grades = [1, 2, 3, 4, 5, 6, 7] as const;

	const filteredTypes = $derived(getFilteredTypes(gear));

	const selecteds: {
		type: AddOptionTypeOrEmpty;
		grade: AddOptionGradeOrEmpty;
	}[] = $state(getInitialSelecteds(gear));

	$effect(() => {
		untrack(() => gear.resetAddOption());
		for (const selected of selecteds) {
			if (!selected.type || !selected.grade) {
				continue;
			}
			untrack(() =>
				gear.applyAddOption(selected.type as AddOptionType, selected.grade as AddOptionGrade)
			);
		}
	});

	function getFilteredTypes(gear: Gear) {
		const filteredTypes: ReturnType<typeof types.slice> = [];
		for (const type of types) {
			if (!type.value) {
				filteredTypes.push(type);
				continue;
			}
			try {
				getAddOptionValue(gear, type.value, 1);
				filteredTypes.push(type);
			} catch {}
		}
		return filteredTypes;
	}

	function getFilteredGrades(gear: Gear, type: AddOptionType) {
		const filteredGrades: ReturnType<typeof grades.slice> = [];
		for (const grade of grades) {
			if (gear.attributes.bossReward && grade <= 2) {
				continue;
			}
			try {
				getAddOptionValue(gear, type, grade);
				filteredGrades.push(grade);
			} catch {}
		}
		return filteredGrades;
	}

	function getInitialSelecteds(gear: Gear) {
		const initialSelecteds: { type: AddOptionTypeOrEmpty; grade: AddOptionGradeOrEmpty }[] = [
			{ type: '', grade: 0 },
			{ type: '', grade: 0 },
			{ type: '', grade: 0 },
			{ type: '', grade: 0 }
		];
		for (let i = 0; i < gear.addOptions.length; i++) {
			initialSelecteds[i] = { ...gear.addOptions[i] };
		}
		return initialSelecteds;
	}

	function getStatString(type: AddOptionType, value: number) {
		switch (type) {
			case AddOptionType.allStat:
				return `+${value}%`;
			case AddOptionType.reqLevelDecrease:
				return `-${value}`;
			default:
				return `+${value}`;
		}
	}
</script>

<div class="flex flex-col gap-y-4">
	<div class="flex flex-col gap-y-2">
		<div class="grid grid-cols-2 gap-4">
			<Label>스탯</Label>
			<Label>단계</Label>
		</div>
		{#each selecteds as selected}
			<div class="grid grid-cols-2 gap-4">
				<Select
					type="single"
					bind:value={
						() => selected.type,
						(v) => {
							selected.type = v;
							if (!v) {
								selected.grade = 0;
							}
						}
					}
				>
					<SelectTrigger class="w-full">
						{types.find((type) => type.value === selected.type)?.label}
					</SelectTrigger>
					<SelectContent>
						{#each filteredTypes as type}
							<SelectItem value={type.value}>{type.label}</SelectItem>
						{/each}
					</SelectContent>
				</Select>
				<Select
					type="single"
					bind:value={
						() => String(selected.grade), (v) => (selected.grade = Number(v) as AddOptionGrade | 0)
					}
					disabled={!selected.type}
				>
					<SelectTrigger class="w-full">
						{#if !selected.type || !selected.grade}
							-
						{:else}
							{getStatString(selected.type, getAddOptionValue(gear, selected.type, selected.grade))}
							({selected.grade}단계)
						{/if}
					</SelectTrigger>
					<SelectContent>
						<SelectItem value={'0'}>-</SelectItem>
						{#if selected.type}
							{#each getFilteredGrades(gear, selected.type) as grade}
								<SelectItem value={grade.toString()}>
									{getStatString(selected.type, getAddOptionValue(gear, selected.type, grade))} ({grade}단계)
								</SelectItem>
							{/each}
						{/if}
					</SelectContent>
				</Select>
			</div>
		{/each}
	</div>

	<Separator />

	<ButtonGroup>
		<Button variant="destructive" onclick={() => gear.resetAddOption()}>추가 옵션 초기화</Button>
	</ButtonGroup>
</div>
