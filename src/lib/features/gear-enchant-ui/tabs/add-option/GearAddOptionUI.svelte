<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import {
		Select,
		SelectContent,
		SelectItem,
		SelectTrigger
	} from '$lib/components/ui/select';
	import { Separator } from '$lib/components/ui/separator';
	import { ButtonGroup } from '$lib/components/button-group';
	import { padRight } from '$lib/utils';
	import { AddOptionType, type AddOptionGrade, type Gear } from '@malib/gear';
	import { untrack } from 'svelte';
	import { toast } from 'svelte-sonner';
	import { getAvailableGrades, getAvailableTypes } from './model/addOption';
	import type { AddOptionGradeOrEmpty, SelectedOption } from './model/types';
	import GradeItem from './components/GradeItem.svelte';

	let { gear }: { gear: Gear } = $props();

	const types = $derived(getAvailableTypes(gear));
	const selectedOptions: SelectedOption[] = $state(getInitialSelectedOptions(gear));

	$effect(() => {
		if (!gear.supportsAddOption) return;

		untrack(() => gear.resetAddOption());
		for (const option of selectedOptions) {
			if (option.type && option.grade) {
				untrack(() =>
					gear.applyAddOption(option.type as AddOptionType, option.grade as AddOptionGrade)
				);
			}
		}
	});

	function getInitialSelectedOptions(gear: Gear) {
		return padRight<SelectedOption>(
			gear.addOptions.map((o) => ({ type: o.type, grade: o.grade })),
			4,
			() => ({ type: '', grade: 0 })
		);
	}
</script>

<div class="flex flex-col gap-y-4">
	<div class="flex flex-col gap-y-2">
		<div class="grid grid-cols-2 gap-4">
			<Label>스탯</Label>
			<Label>단계</Label>
		</div>
		<div class="grid grid-cols-2 gap-x-4 gap-y-2">
			{#each selectedOptions as option}
				<Select
					type="single"
					bind:value={
						() => option.type,
						(v) => {
							option.type = v;
							if (!v) {
								option.grade = 0;
							}
						}
					}
				>
					<SelectTrigger class="w-full">
						{types.find((type) => type.value === option.type)?.label}
					</SelectTrigger>
					<SelectContent>
						{#each types as type}
							<SelectItem value={type.value}>{type.label}</SelectItem>
						{/each}
					</SelectContent>
				</Select>

				<Select
					type="single"
					bind:value={
						() => String(option.grade), (v) => (option.grade = Number(v) as AddOptionGradeOrEmpty)
					}
					disabled={!option.type}
				>
					<SelectTrigger class="w-full">
						{#if option.type && option.grade}
							<GradeItem {gear} type={option.type} grade={option.grade} />
						{:else}
							-
						{/if}
					</SelectTrigger>
					<SelectContent>
						<SelectItem value={'0'}>-</SelectItem>
						{#if option.type}
							{#each getAvailableGrades(gear, option.type) as grade}
								<SelectItem value={String(grade)}>
									<GradeItem {gear} type={option.type} {grade} />
								</SelectItem>
							{/each}
						{/if}
					</SelectContent>
				</Select>
			{/each}
		</div>
	</div>

	<Separator />

	<ButtonGroup>
		<Button
			variant="destructive"
			onclick={() => {
				gear.resetAddOption();
				toast.success('추가 옵션을 초기화했어요.', {
					position: 'top-center',
					duration: 2000
				});
			}}
		>
			추가 옵션 초기화
		</Button>
	</ButtonGroup>
</div>
