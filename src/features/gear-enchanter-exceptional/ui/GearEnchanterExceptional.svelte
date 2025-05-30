<script lang="ts">
	import { getGearOptionGroupedStrings } from '$lib/entities/item-string';
	import { SelectedItemCard } from '$lib/entities/selected-item-card';
	import { Button } from '$lib/shared/shadcn/components/ui/button';
	import { Card } from '$lib/shared/shadcn/components/ui/card';
	import { Separator } from '$lib/shared/shadcn/components/ui/separator';
	import { ButtonGroup } from '$lib/shared/ui';
	import { Gear } from '@malib/gear';
	import { getExceptionalHammer } from '../model/exceptional';

	let { gear }: { gear: Gear } = $props();

	const exceptionalHammer = $derived(getExceptionalHammer(gear));
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

	<SelectedItemCard
		selectedItem={exceptionalHammer}
		optionStrings={exceptionalHammer
			? getGearOptionGroupedStrings(exceptionalHammer.option)
			: undefined}
		placeholder="장비에 사용할 수 있는 익셉셔널 해머가 없어요."
	>
		{#snippet footer()}
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
		{/snippet}
	</SelectedItemCard>

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
