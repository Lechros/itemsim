<script lang="ts">
	import { Button } from '$lib/shared/shadcn/components/ui/button';
	import { Checkbox } from '$lib/shared/shadcn/components/ui/checkbox';
	import { Label } from '$lib/shared/shadcn/components/ui/label';
	import { Switch } from '$lib/shared/shadcn/components/ui/switch';
	import type { Gear } from '@malib/gear';
	import {
		addStarScroll,
		canAddStarScroll,
		canSetStarScroll,
		setStarScroll,
		showStarScrollIgnoreMaxStar
	} from '../model/starScroll';

	let {
		gear,
		ignoreMaxStar = $bindable(false)
	}: {
		gear: Gear;
		ignoreMaxStar?: boolean;
	} = $props();

	let bonus = $state(false);
</script>

<div class="flex flex-col gap-y-4">
	{#if showStarScrollIgnoreMaxStar(gear)}
		<div class="flex items-center gap-x-2">
			<Switch bind:checked={ignoreMaxStar} id="ignoreMaxStar" />
			<Label for="ignoreMaxStar">최대 강화 단계 초과</Label>
		</div>
	{/if}

	<div class="flex flex-col gap-y-2">
		<h4 class="text-lg font-semibold">놀라운 장비 강화</h4>
		<div class="flex items-center gap-x-2">
			<Checkbox id="add-bonus" bind:checked={bonus} aria-labelledby="add-bonus-label" />
			<Label id="add-bonus-label" for="add-bonus">보너스 스탯 적용</Label>
		</div>
		<div class="flex gap-x-2">
			{#each [1, 5] as star}
				<Button
					variant="outline"
					class="text-blue-500 hover:text-blue-500/90"
					onclick={() => addStarScroll(gear, star, bonus, ignoreMaxStar)}
					disabled={!canAddStarScroll(gear, star, ignoreMaxStar)}
				>
					+{star}성
				</Button>
			{/each}
		</div>
	</div>
	<div class="flex flex-col gap-y-2">
		<h4 class="text-lg font-semibold">일괄 강화</h4>
		<div class="flex items-center gap-x-2">
			<Checkbox id="set-bonus" bind:checked={bonus} aria-labelledby="set-bonus-label" />
			<Label id="set-bonus-label" for="set-bonus">보너스 스탯 적용</Label>
		</div>
		<div class="flex gap-x-2">
			{#each [12] as star}
				<Button
					variant="outline"
					class="text-blue-500 hover:text-blue-500/90"
					onclick={() => setStarScroll(gear, star, bonus, ignoreMaxStar)}
					disabled={!canSetStarScroll(gear, star, ignoreMaxStar)}
				>
					{star}성
				</Button>
			{/each}
		</div>
	</div>
</div>
