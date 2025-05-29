<script lang="ts">
	import { ItemRawIcon } from '$lib/entities/item-icon';
	import { getGearOptionGroupedStrings } from '$lib/entities/item-string';
	import { Button } from '$lib/shared/shadcn/components/ui/button';
	import { Card } from '$lib/shared/shadcn/components/ui/card';
	import { cn } from '$lib/shared/shadcn/utils';
	import { Gear, GearType } from '@malib/gear';
	import { exceptionalHammers } from '../model/exceptionals';
	import { ButtonGroup } from '$lib/entities/button-group';
	import { Separator } from '$lib/shared/shadcn/components/ui/separator';

	let { gear }: { gear: Gear } = $props();

	const exceptionalHammer = $derived(getExceptionalHammer(gear));

	function getExceptionalHammer(gear: Gear) {
		switch (gear.type) {
			case GearType.belt:
				return exceptionalHammers['익셉셔널 해머 (벨트)'];
			case GearType.earrings:
				return exceptionalHammers['익셉셔널 해머 (귀고리)'];
			case GearType.faceAccessory:
				return exceptionalHammers['익셉셔널 해머 (얼굴장식)'];
			case GearType.eyeAccessory:
				return exceptionalHammers['익셉셔널 해머 (눈장식)'];
			default:
				return null;
		}
	}

	function splitHalf(summaries: [string, string][]): [any, any] {
		const half = Math.ceil(summaries.length / 2);
		return [summaries.slice(0, half), summaries.slice(half)];
	}
</script>

<div class="mt-4 flex flex-col gap-y-4">
	<div class="mx-auto w-full max-w-xs">
		<Card class="flex flex-col gap-y-4 p-4">
			<div class="text-center">
				익셉셔널 강화 <span class="font-semibold">{gear.exceptionalUpgradeCount}</span>회 (최대
				<span class="font-semibold">{gear.exceptionalTotalUpgradeableCount}</span>회)
			</div>
		</Card>
	</div>

	<Card class="p-4">
		{#if exceptionalHammer}
			{@const summaries = getGearOptionGroupedStrings(exceptionalHammer.option)}
			{@const [leftSummaries, rightSummaries] = splitHalf(summaries)}
			<div class="flex flex-col gap-y-2">
				<div class="flex items-center gap-x-2">
					<ItemRawIcon icon={exceptionalHammer.icon} />
					<div class="text-sm font-medium">{exceptionalHammer.name}</div>
				</div>
				<div
					class={cn(
						'-mx-4 grid h-30 auto-rows-min justify-start',
						summaries.length > 6 && 'md:grid-cols-2'
					)}
				>
					<div class="px-4">
						{#each leftSummaries as summary}
							<div class="text-sm">
								<span>{summary[0]}</span>
								<span class="font-semibold">{summary[1]}</span>
							</div>
						{/each}
					</div>
					<div class={cn('px-4', summaries.length > 6 && 'sm:border-l')}>
						{#each rightSummaries as summary}
							<div class="text-sm">
								<span>{summary[0]}</span>
								<span class="font-semibold">{summary[1]}</span>
							</div>
						{/each}
					</div>
				</div>
			</div>
		{:else}
			<div class="text-muted-foreground h-41 text-sm">
				장비에 사용할 수 있는 익셉셔널 해머가 없어요.
			</div>
		{/if}
	</Card>

	<ButtonGroup>
		<Button
			onclick={() => exceptionalHammer && gear.applyExceptional(exceptionalHammer)}
			disabled={!exceptionalHammer || !gear.canApplyExceptional}
		>
			사용하기
		</Button>
	</ButtonGroup>

	<Separator />

	<ButtonGroup>
		<Button
			variant="destructive"
			onclick={() => gear.resetExceptional()}
			disabled={!gear.canResetExceptional}
		>
			익셉셔널 강화 초기화
		</Button>
	</ButtonGroup>
</div>
