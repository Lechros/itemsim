<script lang="ts">
	import { Button } from '$lib/shared/shadcn/components/ui/button';
	import {
		Select,
		SelectContent,
		SelectItem,
		SelectTrigger
	} from '$lib/shared/shadcn/components/ui/select';
	import { UIImage2 } from '$lib/shared/ui';
	import { Gear, PotentialGrade, type PotentialData } from '@malib/gear';
	import { untrack } from 'svelte';
	import { getPotentialDatas } from '../model/potential';

	let { gear }: { gear: Gear } = $props();

	let grade = $state(gear.potentialGrade);
	let selecteds = $state(getInitialPotentialOptions(gear));

	const grades = [
		{
			label: '없음',
			value: PotentialGrade.Normal
		},
		{
			label: '레어',
			value: PotentialGrade.Rare
		},
		{
			label: '에픽',
			value: PotentialGrade.Epic
		},
		{
			label: '유니크',
			value: PotentialGrade.Unique
		},
		{
			label: '레전드리',
			value: PotentialGrade.Legendary
		}
	] as const;

	const gradePotentialDatas = $derived(getPotentialDatas(gear, grade));
	const subgradePotentialDatas = $derived(
		getPotentialDatas(gear, grade - 1).concat(gradePotentialDatas)
	);

	$effect(() => {
		if (grade === PotentialGrade.Normal) {
			untrack(() => gear.resetPotential());
		} else {
			// Save to variable to run effect
			const potentials = selecteds.filter((p) => p !== null);
			if (potentials.length > 0) {
				untrack(() => gear.setPotential(grade, potentials));
			}
		}
	});

	function getPotentialTitle(grade: PotentialGrade) {
		switch (grade) {
			case PotentialGrade.Normal:
				return 'potentialTitleNormal';
			case PotentialGrade.Rare:
				return 'potentialTitleRare';
			case PotentialGrade.Epic:
				return 'potentialTitleEpic';
			case PotentialGrade.Unique:
				return 'potentialTitleUnique';
			case PotentialGrade.Legendary:
				return 'potentialTitleLegendary';
		}
	}

	function getInitialPotentialOptions(gear: Gear): (PotentialData | null)[] {
		const length = 3;
		return gear.potentials.concat(Array(length - gear.potentials.length).fill(null));
	}
</script>

<div class="mt-6 flex flex-col gap-y-8">
	<div class="flex flex-col gap-y-2">
		<h4 class="text-lg leading-none font-semibold">잠재능력 등급</h4>
		<div class="flex flex-col gap-2 sm:flex-row">
			{#each grades as { label, value }}
				<Button
					variant={grade === value ? 'default' : 'outline'}
					class={[grade === value && 'border-primary border']}
					onclick={() => (grade = value)}
				>
					<UIImage2 image={getPotentialTitle(value)} />
					{label}
				</Button>
			{/each}
		</div>
	</div>

	<div class="flex flex-col gap-y-2">
		<h4 class="text-lg leading-none font-semibold">잠재능력 옵션</h4>
		{#each selecteds as selected, index}
			{@const options = index === 0 ? gradePotentialDatas : subgradePotentialDatas}
			<Select
				type="single"
				bind:value={
					() => String(selected?.id ?? -1),
					(v) => (selecteds[index] = options.find((p) => p.id === Number(v)) ?? null)
				}
				disabled={grade === PotentialGrade.Normal}
			>
				<SelectTrigger class="w-full">
					<div class="flex items-center gap-x-2">
						{#if selected}
							{@render potential(selected)}
						{:else}
							-
						{/if}
					</div>
				</SelectTrigger>
				<SelectContent avoidCollisions={false}>
					<SelectItem value="-1">-</SelectItem>
					{#each options as option}
						<SelectItem value={String(option.id)}>
							{@render potential(option)}
						</SelectItem>
					{/each}
				</SelectContent>
			</Select>
		{/each}
	</div>
</div>

{#snippet potential(option: PotentialData)}
	<div class="flex items-center gap-x-2">
		<UIImage2 image={getPotentialTitle(Math.max(option.grade, PotentialGrade.Rare))} />
		{option.summary}
	</div>
{/snippet}
