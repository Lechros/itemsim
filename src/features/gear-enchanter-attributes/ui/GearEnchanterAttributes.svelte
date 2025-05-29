<script lang="ts">
	import { ButtonGroup } from '$lib/entities/button-group';
	import { Button } from '$lib/shared/shadcn/components/ui/button';
	import { Input } from '$lib/shared/shadcn/components/ui/input';
	import { Label } from '$lib/shared/shadcn/components/ui/label';
	import { RadioGroup, RadioGroupItem } from '$lib/shared/shadcn/components/ui/radio-group';
	import { Gear } from '@malib/gear';
	import {
		cuttableTypes,
		setCuttableCount,
		setTotalCuttableCount,
		totalCuttableCounts,
		validateCuttableCount
	} from '../model/cuttable';
	import { reqLevelIncreases } from '../model/req';
	import { tradeTypes } from '../model/trade';

	let { gear }: { gear: Gear } = $props();

	let cuttableCount = $state(gear.data.attributes.cuttableCount);
	let cuttableCountError = $derived(validateCuttableCount(gear, cuttableCount));

	$effect(() => {
		setCuttableCount(gear, cuttableCount);
	});
</script>

<div class="flex flex-col gap-8">
	<div class="flex flex-col gap-2">
		<h4 class="text-lg font-semibold">교환 가능 여부</h4>
		<RadioGroup
			bind:value={
				() => String(gear.attributes.trade),
				(v) => {
					gear.data.attributes.trade = Number(v);
				}
			}
		>
			{#each tradeTypes as tradeType}
				<div class="flex items-center gap-2">
					<RadioGroupItem value={String(tradeType.value)} id={`GearTrade.${tradeType.value}`} />
					<Label for={`GearTrade.${tradeType.value}`}>{tradeType.label}</Label>
				</div>
			{/each}
		</RadioGroup>
	</div>

	<div class="flex flex-col gap-2">
		<h4 class="text-lg font-semibold">카르마의 가위</h4>
		<RadioGroup
			bind:value={
				() => String(gear.attributes.cuttable),
				(v) => {
					gear.data.attributes.cuttable = Number(v);
				}
			}
		>
			{#each cuttableTypes as cuttableType}
				<div class="flex items-center gap-2">
					<RadioGroupItem
						value={String(cuttableType.value)}
						id={`GearCuttable.${cuttableType.value}`}
					/>
					<Label for={`GearCuttable.${cuttableType.value}`}>{cuttableType.label}</Label>
				</div>
			{/each}
		</RadioGroup>
		<div class="flex flex-col gap-1">
			<h5 class="mt-2 text-sm font-medium">최대 가위 사용 횟수</h5>
			<ButtonGroup>
				{#each totalCuttableCounts as count}
					<Button
						variant={gear.attributes.totalCuttableCount === count.value ? 'default' : 'outline'}
						class={[gear.attributes.totalCuttableCount === count.value && 'border-primary border']}
						onclick={() => setTotalCuttableCount(gear, count.value)}
						disabled={!gear.attributes.cuttable}
					>
						{count.label}
					</Button>
				{/each}
			</ButtonGroup>
		</div>
		<div class="mt-2 flex flex-col gap-1">
			<div class="flex flex-col gap-1.5">
				<Label for="cuttableCount">가위 사용 잔여 횟수</Label>
				<Input
					type="number"
					min={0}
					max={gear.attributes.totalCuttableCount}
					bind:value={cuttableCount}
					disabled={gear.attributes.totalCuttableCount === undefined}
					aria-invalid={cuttableCountError !== undefined}
					id="cuttableCount"
				/>
				{#if cuttableCountError}
					<p class="text-destructive text-sm">{cuttableCountError}</p>
				{/if}
			</div>
		</div>
	</div>

	{#if 80 <= gear.req.level && gear.req.level <= 110}
		<div class="flex flex-col gap-2">
			<div>
				<h4 class="text-lg font-semibold">착용 레벨 증가</h4>
				<p class="text-muted-foreground text-sm">
					잠재능력과 에디셔널 잠재능력 수치는 자동으로 업데이트되지 않아요.
				</p>
			</div>
			<ButtonGroup>
				{#each reqLevelIncreases as reqLevelIncrease}
					<Button
						variant={gear.req.levelIncrease === reqLevelIncrease.value ? 'default' : 'outline'}
						class={[gear.req.levelIncrease === reqLevelIncrease.value && 'border-primary border']}
						onclick={() => (gear.data.req.levelIncrease = reqLevelIncrease.value)}
					>
						{reqLevelIncrease.label}
					</Button>
				{/each}
			</ButtonGroup>
		</div>
	{/if}
</div>
