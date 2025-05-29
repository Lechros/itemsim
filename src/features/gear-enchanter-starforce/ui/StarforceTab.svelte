<script lang="ts">
	import { ButtonGroup } from '$lib/entities/button-group';
	import { Button } from '$lib/shared/shadcn/components/ui/button';
	import { Label } from '$lib/shared/shadcn/components/ui/label';
	import { Switch } from '$lib/shared/shadcn/components/ui/switch';
	import type { Gear } from '@malib/gear';
	import {
		addStarforce,
		canAddStarforce,
		canRemoveStarforce,
		canSetStarforce,
		removeStarforce,
		setStarforce,
		showStarforceIgnoreMaxStar
	} from '../model/starforce';

	let {
		gear,
		ignoreMaxStar = $bindable(false)
	}: {
		gear: Gear;
		ignoreMaxStar?: boolean;
	} = $props();
</script>

<div class="flex flex-col gap-y-4">
	{#if showStarforceIgnoreMaxStar(gear)}
		<div class="flex items-center gap-x-2">
			<Switch bind:checked={ignoreMaxStar} id="ignoreMaxStar" />
			<Label for="ignoreMaxStar">최대 스타포스 강화 초과</Label>
		</div>
	{/if}

	<div class="flex flex-col gap-y-2">
		<h4 class="text-lg font-semibold">스타포스 강화</h4>
		<ButtonGroup>
			{#each [5, 1] as star}
				<Button
					variant="outline"
					class="text-destructive hover:text-destructive/90"
					onclick={() => removeStarforce(gear, star, ignoreMaxStar)}
					disabled={!canRemoveStarforce(gear, star)}
				>
					-{star}성
				</Button>
			{/each}
			{#each [1, 5] as star}
				<Button
					variant="outline"
					class="text-yellow-500 hover:text-yellow-500/90"
					onclick={() => addStarforce(gear, star, ignoreMaxStar)}
					disabled={!canAddStarforce(gear, star, ignoreMaxStar)}
				>
					+{star}성
				</Button>
			{/each}
		</ButtonGroup>
	</div>

	<div class="flex flex-col gap-y-2">
		<h4 class="text-lg font-semibold">일괄 강화</h4>
		<ButtonGroup>
			{#each [17, 18, 22] as star}
				<Button
					variant="outline"
					class="text-yellow-500 hover:text-yellow-500/90"
					onclick={() => setStarforce(gear, star)}
					disabled={!canSetStarforce(gear, star)}
				>
					{star}성
				</Button>
			{/each}
		</ButtonGroup>
	</div>
</div>
