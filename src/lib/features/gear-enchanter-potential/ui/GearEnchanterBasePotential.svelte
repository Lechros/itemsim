<script lang="ts">
	import { Button } from '$lib/shared/shadcn/components/ui/button';
	import {
		Select,
		SelectContent,
		SelectItem,
		SelectTrigger
	} from '$lib/shared/shadcn/components/ui/select';
	import { ButtonGroup } from '$lib/shared/ui';
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

<div class="flex flex-col gap-y-4">
	<div class="flex flex-col gap-y-2">
		<h4 class="text-lg font-semibold">{gradeLabel}</h4>
		<ButtonGroup class="flex-wrap">
			{#each grades as { label, value }}
				<Button
					variant={grade === value ? 'default' : 'outline'}
					class={[grade === value && 'border-primary border']}
					onclick={() => (grade = value)}
				>
					<PotentialTitle grade={value} />
					{label}
				</Button>
			{/each}
		</ButtonGroup>
	</div>

	<div class="flex flex-col gap-y-2">
		<h4 class="text-lg font-semibold">{optionLabel}</h4>
		{#each potentials as potential, index}
			{@const options = index === 0 ? gradePotentials : concatPotentials}
			<Select
				type="single"
				bind:value={
					() => potential?.summary ?? defaultValue,
					(v) => (potentials[index] = options.find((p) => p.summary === v) ?? null)
				}
				disabled={grade === PotentialGrade.Normal}
			>
				<SelectTrigger class="w-full max-w-sm">
					{#if potential}
						<PotentialSummary {potential} />
					{:else}
						{defaultLabel}
					{/if}
				</SelectTrigger>
				<SelectContent avoidCollisions={false}>
					<SelectItem value={defaultValue}>{defaultLabel}</SelectItem>
					{#each options as option}
						<SelectItem value={option.summary}>
							<PotentialSummary potential={option} />
						</SelectItem>
					{/each}
				</SelectContent>
			</Select>
		{/each}
	</div>
</div>
