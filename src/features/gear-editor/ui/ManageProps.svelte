<script lang="ts">
	import { ButtonGroup } from '$lib/entities/button-group';
	import { Button } from '$lib/shared/shadcn/components/ui/button';
	import { Input } from '$lib/shared/shadcn/components/ui/input';
	import { Label } from '$lib/shared/shadcn/components/ui/label';
	import { RadioGroup, RadioGroupItem } from '$lib/shared/shadcn/components/ui/radio-group';
	import { Gear, GearCuttable, GearTrade } from '@malib/gear';

	let { gear }: { gear: Gear } = $props();

	let trade = $state(gear.attributes.trade.toString());
	let cuttable = $state(gear.attributes.cuttable.toString());

	$effect(() => {
		if (gear.attributes.trade !== Number(trade)) {
			gear.data.attributes.trade = Number(trade);
		}
	});

	$effect(() => {
		if (gear.attributes.cuttable !== Number(cuttable)) {
			gear.data.attributes.cuttable = Number(cuttable);
		}
	});

	function setTotalCuttableCount(gear: Gear, count: number) {
		gear.data.attributes.cuttableCount = count;
		gear.data.attributes.totalCuttableCount = count;
	}

	function removeCuttableCount(gear: Gear) {
		gear.data.attributes.cuttableCount = undefined;
		gear.data.attributes.totalCuttableCount = undefined;
	}
</script>

<div class="flex flex-col gap-8">
	<div class="flex flex-col gap-2">
		<h4 class="text-lg font-semibold">교환 가능 여부</h4>
		<RadioGroup bind:value={trade}>
			<div class="flex items-center gap-2">
				<RadioGroupItem value={String(GearTrade.Tradeable)} id="tradeable" />
				<Label for="tradeable">교환 가능</Label>
			</div>
			<div class="flex items-center gap-2">
				<RadioGroupItem value={String(GearTrade.TradeBlock)} id="tradeblock" />
				<Label for="tradeblock">교환 불가</Label>
			</div>
			<div class="flex items-center gap-2">
				<RadioGroupItem value={String(GearTrade.EquipTradeBlock)} id="equipblock" />
				<Label for="equipblock">장착 시 교환 불가</Label>
			</div>
			<div class="flex items-center gap-2">
				<RadioGroupItem value={String(GearTrade.TradeOnce)} id="tradeonce" />
				<Label for="tradeonce">1회 교환 가능</Label>
			</div>
		</RadioGroup>
	</div>

	<div class="flex flex-col gap-2">
		<h4 class="text-lg font-semibold">카르마의 가위</h4>
		<RadioGroup bind:value={cuttable}>
			<div class="flex items-center gap-2">
				<RadioGroupItem value={String(GearCuttable.None)} id="none" />
				<Label for="none">사용 불가</Label>
			</div>
			<div class="flex items-center gap-2">
				<RadioGroupItem value={String(GearCuttable.Silver)} id="silver" />
				<Label for="silver">카르마의 가위</Label>
			</div>
			<div class="flex items-center gap-2">
				<RadioGroupItem value={String(GearCuttable.Platinum)} id="platinum" />
				<Label for="platinum">플래티넘 카르마의 가위</Label>
			</div>
		</RadioGroup>
		<div class="flex flex-col gap-1">
			<h5 class="mt-2 text-sm font-medium">최대 가위 사용 횟수</h5>
			<ButtonGroup>
				<Button
					variant={gear.attributes.totalCuttableCount === undefined ? 'default' : 'outline'}
					class={[gear.attributes.totalCuttableCount === undefined && 'border-primary border']}
					onclick={() => removeCuttableCount(gear)}
					disabled={!gear.attributes.cuttable}
				>
					없음
				</Button>
				{#each [5, 10, 20] as count}
					<Button
						variant={gear.attributes.totalCuttableCount === count ? 'default' : 'outline'}
						class={[gear.attributes.totalCuttableCount === count && 'border-primary border']}
						onclick={() => setTotalCuttableCount(gear, 5)}
						disabled={!gear.attributes.cuttable}
					>
						{count}회
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
					bind:value={gear.data.attributes.cuttableCount}
					disabled={gear.attributes.totalCuttableCount === undefined}
					id="cuttableCount"
				/>
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
				<Button
					variant={gear.req.levelIncrease === 0 ? 'default' : 'outline'}
					class={[gear.req.levelIncrease === 0 && 'border-primary border']}
					onclick={() => (gear.data.req.levelIncrease = 0)}
				>
					없음
				</Button>
				{#each [10, 20, 30] as value}
					<Button
						variant={gear.req.levelIncrease === value ? 'default' : 'outline'}
						class={[gear.req.levelIncrease === value && 'border-primary border']}
						onclick={() => (gear.data.req.levelIncrease = value)}
					>
						+{value}
					</Button>
				{/each}
			</ButtonGroup>
		</div>
	{/if}
</div>
