<script lang="ts">
	import * as Select from '$lib/components/ui/select';
	import * as Tabs from '$lib/components/ui/tabs';
	import FormControl from '$lib/features/gear-enchant-ui/form/FormControl.svelte';
	import FormItem from '$lib/features/gear-enchant-ui/form/FormItem.svelte';
	import FormLabel from '$lib/features/gear-enchant-ui/form/FormLabel.svelte';
	import FormSection from '$lib/features/gear-enchant-ui/form/FormSection.svelte';
	import { PotentialGrade, type PotentialData } from '@malib/gear';
	import { grades } from '../model/grades';
	import PotentialSummary from './PotentialSummary.svelte';
	import PotentialTitle from './PotentialTitle.svelte';

	let {
		initialGrade,
		initialPotentials,
		getGradePotentials,
		gradeLabel,
		optionLabel,
		onChange
	}: {
		initialGrade?: PotentialGrade;
		initialPotentials?: PotentialData[];
		getGradePotentials: (grade: PotentialGrade) => PotentialData[];
		gradeLabel: string;
		optionLabel: string;
		onChange?: (grade: PotentialGrade, potentials: PotentialData[]) => void;
	} = $props();

	let grade = $state(initialGrade ?? PotentialGrade.Normal);
	let potentials = $state(getInitialPotentialOptions(initialPotentials ?? []));

	const gradePotentials = $derived(getGradePotentials(grade));
	const subGradePotentials = $derived(getGradePotentials(grade - 1));
	const concatPotentials = $derived([...subGradePotentials, ...gradePotentials]);

	$effect(() => {
		onChange?.(
			grade,
			potentials.filter((p) => p !== null)
		);
	});

	const defaultLabel = '-';
	const defaultValue = '-';

	function getInitialPotentialOptions(potentials: PotentialData[]): (PotentialData | null)[] {
		const length = 3;
		return potentials.concat(Array(length - potentials.length).fill(null));
	}
</script>

<FormSection>
	<FormItem>
		<FormLabel title={gradeLabel} />
		<FormControl>
			<Tabs.Root bind:value={() => String(grade), (v) => (grade = Number(v))}>
				<Tabs.List class="w-full">
					{#each grades as { label, value }}
						<Tabs.Trigger value={String(value)}>
							<PotentialTitle grade={value} />
							{label}
						</Tabs.Trigger>
					{/each}
				</Tabs.List>
			</Tabs.Root>
		</FormControl>
	</FormItem>
</FormSection>

<FormSection class="gap-3">
	<FormItem>
		<FormLabel title={optionLabel} />
	</FormItem>
	<div class="flex flex-col gap-y-3">
		{#each potentials as potential, index}
			{@const options = index === 0 ? gradePotentials : concatPotentials}
			<Select.Root
				type="single"
				bind:value={
					() => potential?.summary ?? defaultValue,
					(v) => (potentials[index] = options.find((p) => p.summary === v) ?? null)
				}
				disabled={grade === PotentialGrade.Normal}
			>
				<Select.Trigger class="w-full" size="sm">
					{#if potential}
						<PotentialSummary {potential} />
					{:else}
						{defaultLabel}
					{/if}
				</Select.Trigger>
				<Select.Content avoidCollisions={false}>
					<Select.Item value={defaultValue}>{defaultLabel}</Select.Item>
					{#each options as option}
						<Select.Item value={option.summary}>
							<PotentialSummary potential={option} />
						</Select.Item>
					{/each}
				</Select.Content>
			</Select.Root>
		{/each}
	</div>
</FormSection>
