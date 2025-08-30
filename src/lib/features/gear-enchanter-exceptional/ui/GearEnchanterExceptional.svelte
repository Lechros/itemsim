<script lang="ts">
	import { BalancedGrid } from '$lib/entities/balanced-grid';
	import { ItemCard, ItemCardContent, ItemCardFooter } from '$lib/entities/item-card';
	import { getGearOptionGroupedStrings } from '$lib/entities/item-string';
	import { Button } from '$lib/shared/shadcn/components/ui/button';
	import { Card } from '$lib/shared/shadcn/components/ui/card';
	import { Separator } from '$lib/shared/shadcn/components/ui/separator';
	import { ButtonGroup } from '$lib/shared/ui';
	import { Gear } from '@malib/gear';
	import { getExceptionalHammer } from '../model/exceptional';

	let { gear }: { gear: Gear } = $props();

	const exceptionalHammer = $derived(getExceptionalHammer(gear));
</script>

<div class="flex flex-col gap-y-4">
	<div class="mx-auto w-full max-w-xs lg:hidden">
		<Card class="flex flex-col gap-y-4 p-4">
			<div class="text-center">
				익셉셔널 강화 <span class="font-semibold">{gear.exceptionalUpgradeCount}</span>회 (최대
				<span class="font-semibold">{gear.exceptionalTotalUpgradeableCount}</span>회)
			</div>
		</Card>
	</div>

	<ItemCard item={exceptionalHammer} placeholder="장비에 사용할 수 있는 익셉셔널 해머가 없어요.">
		<ItemCardContent>
			{#if exceptionalHammer}
				{@const optionStrings = getGearOptionGroupedStrings(exceptionalHammer?.option)}
				<BalancedGrid items={optionStrings} size={6} class="sm:h-30">
					{#snippet itemRenderer(strings: [string, string])}
						<div class="text-sm">
							<span>{strings[0]}</span>
							<span class="font-semibold">{strings[1]}</span>
						</div>
					{/snippet}
				</BalancedGrid>
			{:else}
				<div class="sm:h-30"></div>
			{/if}
		</ItemCardContent>
		<ItemCardFooter>
			{#if exceptionalHammer}
				<ButtonGroup>
					<Button
						onclick={() => {
							if (exceptionalHammer) {
								gear.applyExceptional(exceptionalHammer);
							}
						}}
						disabled={!exceptionalHammer || !gear.canApplyExceptional}
					>
						사용하기
					</Button>
				</ButtonGroup>
			{:else}
				<div class="sm:h-9"></div>
			{/if}
		</ItemCardFooter>
	</ItemCard>

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
