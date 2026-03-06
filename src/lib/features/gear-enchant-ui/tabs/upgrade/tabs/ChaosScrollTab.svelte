<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as InputGroup from '$lib/components/ui/input-group';
	import { Switch } from '$lib/components/ui/switch';
	import { BalancedGrid } from '$lib/features/gear-enchant-ui/balanced-grid';
	import FormControl from '$lib/features/gear-enchant-ui/form/FormControl.svelte';
	import FormItem from '$lib/features/gear-enchant-ui/form/FormItem.svelte';
	import FormLabel from '$lib/features/gear-enchant-ui/form/FormLabel.svelte';
	import FormSection from '$lib/features/gear-enchant-ui/form/FormSection.svelte';
	import type { Gear, GearUpgradeOption } from '@malib/gear';
	import { Minus, Plus, TrashIcon } from 'lucide-svelte';
	import SharedSections from '../components/SharedSections.svelte';
	import {
		chaosOptionTypes,
		createChaosScroll,
		createEmptyOptionRandomizedChaosScroll
	} from '../model/chaosScroll';

	let { gear }: { gear: Gear } = $props();

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

	function clamp(value: number, min: number, max: number): number {
		return Math.max(Math.min(value, max), min);
	}
</script>

<FormSection class="gap-5">
	<FormItem class="flex-row items-center justify-between">
		<FormLabel title="혼돈의 주문서 설정" description="주문서 1회 당 수치를 입력해주세요." />
		<FormControl>
			<Button variant="ghost" size="sm" onclick={() => (option = {})}>
				<TrashIcon />
			</Button>
		</FormControl>
	</FormItem>
	<BalancedGrid items={chaosOptionTypes} class="gap-x-8 gap-y-3" classes={{ column: 'gap-y-3' }}>
		{#snippet itemRenderer(stat: (typeof chaosOptionTypes)[number])}
			{@const min = -6 * stat.weight}
			{@const max = 6 * stat.weight}
			<FormItem class="gap-y-1">
				<FormLabel title={stat.label} variant="nested" for="chaos-scroll-{stat.value}" />
				<FormControl>
					<InputGroup.Root id="chaos-scroll-{stat.value}" class="w-full min-w-0 sm:w-30">
						<InputGroup.Addon align="inline-start">
							<InputGroup.Button
								size="icon-xs"
								disabled={(option[stat.value] ?? 0) <= min}
								onclick={() => (option[stat.value] = (option[stat.value] ?? 0) - stat.weight)}
							>
								<Minus />
							</InputGroup.Button>
						</InputGroup.Addon>
						<InputGroup.Input
							type="number"
							{min}
							{max}
							class="text-center [&::-webkit-inner-spin-button]:appearance-none"
							bind:value={
								() => option[stat.value],
								(value) =>
									(option[stat.value] =
										value == null ? value : (clamp(Number(value), min, max) ?? 0))
							}
							onblur={() => {
								const current = option[stat.value];
								if (current != null) {
									option[stat.value] =
										Math.trunc(clamp(current, min, max) / stat.weight) * stat.weight;
								}
							}}
							placeholder={randomizeEmptyValues ? `0 ~ ${6 * stat.weight}` : '0'}
						/>
						<InputGroup.Addon align="inline-end">
							<InputGroup.Button
								size="icon-xs"
								disabled={(option[stat.value] ?? 0) >= max}
								onclick={() => (option[stat.value] = (option[stat.value] ?? 0) + stat.weight)}
							>
								<Plus />
							</InputGroup.Button>
						</InputGroup.Addon>
					</InputGroup.Root>
				</FormControl>
			</FormItem>
		{/snippet}
	</BalancedGrid>

	<FormItem class="flex-row items-center justify-between">
		<FormLabel title="빈 스탯을 임의의 놀긍혼 수치로 적용" variant="nested" />
		<FormControl>
			<Switch bind:checked={randomizeEmptyValues} />
		</FormControl>
	</FormItem>

	<FormControl>
		<Button size="sm" onclick={() => applyChaosScroll()} disabled={!gear.canApplyScroll}>
			혼돈의 주문서 사용하기
		</Button>
		<Button
			variant="outline"
			size="sm"
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
	</FormControl>
</FormSection>

<SharedSections {gear} />
