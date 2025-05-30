<script lang="ts">
	import { getSingleGearOptionStrings } from '$lib/entities/item-string';
	import { Button } from '$lib/shared/shadcn/components/ui/button';
	import { Checkbox } from '$lib/shared/shadcn/components/ui/checkbox';
	import { Input } from '$lib/shared/shadcn/components/ui/input';
	import { Label } from '$lib/shared/shadcn/components/ui/label';
	import { ButtonGroup } from '$lib/shared/ui';
	import type { Gear, GearUpgradeOption } from '@malib/gear';
	import {
		chaosOptionTypes,
		createChaosScroll,
		createEmptyOptionRandomizedChaosScroll
	} from '../model/chaosScroll';
	import type { SelectScrollFunction } from '../model/types';
	import { splitHalf } from '../model/utils';

	let {
		gear,
		selectScroll
	}: {
		gear: Gear;
		selectScroll: SelectScrollFunction;
	} = $props();

	let option = $state<Partial<GearUpgradeOption>>({});
	let randomizeEmptyValues = $state(false);

	const [leftTypes, rightTypes] = splitHalf(chaosOptionTypes);

	function getRandomChaosScrollOptionStrings(option: Record<string, number>) {
		const strings: [string, string][] = [];
		for (const stat of chaosOptionTypes) {
			if (option[stat.value] === undefined) {
				strings.push([stat.label, '0 ~ +6']);
			} else {
				const singleStrings = getSingleGearOptionStrings(stat.value, option[stat.value], true);
				strings.push(singleStrings);
			}
		}
		return strings;
	}
</script>

<div class="flex flex-col gap-y-4">
	<div class="grid gap-y-2 sm:grid-cols-2">
		<div class="flex flex-col gap-y-2 px-2 sm:pr-4">
			{#each leftTypes as stat}
				<div class="grid grid-cols-4 items-center">
					<Label>{stat.label}</Label>
					<Input
						type="number"
						class="col-span-3"
						min={-6}
						max={6}
						bind:value={option[stat.value]}
					/>
				</div>
			{/each}
		</div>
		<div class="flex flex-col gap-y-2 px-2 sm:border-l sm:pl-4">
			{#each rightTypes as stat}
				<div class="grid grid-cols-4 items-center">
					<Label>{stat.label}</Label>
					<Input
						type="number"
						class="col-span-3"
						min={-6}
						max={6}
						bind:value={option[stat.value]}
					/>
				</div>
			{/each}
		</div>
	</div>

	<div class="flex items-center gap-x-2 px-2">
		<Checkbox id="randomChaos" bind:checked={randomizeEmptyValues} />
		<Label for="randomChaos">빈 스탯을 임의의 놀긍혼 수치로 적용</Label>
	</div>

	<ButtonGroup class="px-2">
		<Button
			variant="outline"
			onclick={() => {
				const scroll = createChaosScroll($state.snapshot(option));
				if (randomizeEmptyValues) {
					selectScroll(
						scroll,
						() => {
							gear.applyScroll(createEmptyOptionRandomizedChaosScroll(scroll, 0, 6));
						},
						() => getRandomChaosScrollOptionStrings(scroll.option)
					);
				} else {
					selectScroll(scroll);
				}
			}}
		>
			선택
		</Button>
		<Button
			variant="outline"
			class="text-destructive hover:text-destructive/90"
			onclick={() => (option = {})}
		>
			입력 수치 초기화
		</Button>
	</ButtonGroup>
</div>
