<script lang="ts">
	import { BalancedGrid } from '$lib/entities/balanced-grid';
	import { Button } from '$lib/components/ui/button';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { ButtonGroup } from '$lib/shared/ui';
	import type { Gear, GearUpgradeOption } from '@malib/gear';
	import {
		chaosOptionTypes,
		createChaosScroll,
		createEmptyOptionRandomizedChaosScroll
	} from '../model/chaosScroll';

	let {
		gear
	}: {
		gear: Gear;
	} = $props();

	let option = $state<Partial<GearUpgradeOption>>({});
	let randomizeEmptyValues = $state(false);

	function applyChaosScroll() {
		const scroll = createChaosScroll(option);
		if (randomizeEmptyValues) {
			gear.applyScroll(createEmptyOptionRandomizedChaosScroll(scroll, gear));
		} else {
			gear.applyScroll(scroll);
		}
	}
</script>

<div class="flex flex-col gap-y-4">
	<BalancedGrid items={chaosOptionTypes} class="gap-y-2 px-2" classes={{ column: 'gap-y-2' }}>
		{#snippet itemRenderer(stat: (typeof chaosOptionTypes)[number])}
			<div class="grid grid-cols-4 items-center">
				<Label>{stat.label}</Label>
				<Input type="number" class="col-span-3" min={-6} max={6} bind:value={option[stat.value]} />
			</div>
		{/snippet}
	</BalancedGrid>

	<div class="flex items-center gap-x-2 px-2">
		<Checkbox id="randomChaos" bind:checked={randomizeEmptyValues} />
		<Label for="randomChaos">빈 스탯을 임의의 놀긍혼 수치로 적용</Label>
	</div>

	<ButtonGroup class="px-2">
		<Button onclick={() => applyChaosScroll()} disabled={!gear.canApplyScroll}>
			혼돈의 주문서 사용하기
		</Button>
		<Button
			variant="outline"
			onclick={() => {
				const count = gear.scrollUpgradeableCount;
				for (let i = 0; i < count; i++) {
					applyChaosScroll();
				}
			}}
			disabled={!gear.canApplyScroll}
		>
			{gear.scrollUpgradeableCount}회 사용
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
