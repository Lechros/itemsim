<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Select from '$lib/components/ui/select';
	import { padRight } from '$lib/utils';
	import { AddOptionType, type AddOptionGrade, type Gear } from '@malib/gear';
	import { untrack } from 'svelte';
	import FormControl from '../../form/FormControl.svelte';
	import FormItem from '../../form/FormItem.svelte';
	import FormLabel from '../../form/FormLabel.svelte';
	import FormSection from '../../form/FormSection.svelte';
	import GradeItem from './components/GradeItem.svelte';
	import { getAvailableGrades, getAvailableTypes } from './model/addOption';
	import type { AddOptionGradeOrEmpty, SelectedOption } from './model/types';

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

<FormSection class="gap-3">
	<div class="grid grid-cols-2 gap-x-2">
		<FormLabel title="스탯" class="pl-1" />
		<FormLabel title="단계" class="pl-1" />
	</div>
	<div class="grid grid-cols-2 gap-x-2 gap-y-4">
		{#each selectedOptions as option}
			<Select.Root
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
				<Select.Trigger class="w-full" size="sm">
					{types.find((type) => type.value === option.type)?.label}
				</Select.Trigger>
				<Select.Content>
					{#each types as type}
						<Select.Item value={type.value}>{type.label}</Select.Item>
					{/each}
				</Select.Content>
			</Select.Root>

			<Select.Root
				type="single"
				bind:value={
					() => String(option.grade), (v) => (option.grade = Number(v) as AddOptionGradeOrEmpty)
				}
				disabled={!option.type}
			>
				<Select.Trigger class="w-full" size="sm">
					{#if option.type && option.grade}
						<GradeItem {gear} type={option.type} grade={option.grade} />
					{:else}
						-
					{/if}
				</Select.Trigger>
				<Select.Content>
					<Select.Item value={'0'}>-</Select.Item>
					{#if option.type}
						{#each getAvailableGrades(gear, option.type) as grade}
							<Select.Item value={String(grade)}>
								<GradeItem {gear} type={option.type} {grade} />
							</Select.Item>
						{/each}
					{/if}
				</Select.Content>
			</Select.Root>
		{/each}
	</div>
</FormSection>

<FormSection>
	<FormItem>
		<FormLabel title="추가 옵션 초기화" />
		<FormControl>
			<Button
				variant="destructive"
				size="sm"
				disabled={!gear.canResetAddOption || gear.addOptions.length === 0}
				onclick={() => {
					gear.resetAddOption();
					for (const option of selectedOptions) {
						option.type = '';
						option.grade = 0;
					}
				}}
			>
				초기화
			</Button>
		</FormControl>
	</FormItem>
</FormSection>
