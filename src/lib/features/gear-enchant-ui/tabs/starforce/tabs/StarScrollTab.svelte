<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Label } from '$lib/components/ui/label';
	import { Switch } from '$lib/components/ui/switch';
	import type { Gear } from '@malib/gear';
	import FormControl from '../../../form/FormControl.svelte';
	import FormItem from '../../../form/FormItem.svelte';
	import FormLabel from '../../../form/FormLabel.svelte';
	import FormSection from '../../../form/FormSection.svelte';
	import { addStarScroll, canAddStarScroll } from '../model/starScroll';
	import { addStarforce, canAddStarforce } from '../model/starforce';

	let {
		gear,
		ignoreMaxStar = $bindable()
	}: {
		gear: Gear;
		ignoreMaxStar: boolean;
	} = $props();

	const canIgnoreMaxStarScroll = $derived(gear.maxStar < 15);

	let bonus = $state(false);
</script>

<FormSection class="gap-4">
	<FormItem>
		<FormLabel title="일반 장비 강화" />
	</FormItem>
	<FormItem>
		<FormLabel title="강화 적용" variant="nested" />
		<FormControl>
			<div class="flex w-full flex-col gap-1 sm:flex-row sm:items-center sm:justify-end">
				{#each [1, 5] as star}
					<Button
						variant="outline"
						size="sm"
						class="text-amber-500 hover:text-amber-500/90"
						disabled={gear.star >= 15 || !canAddStarforce(gear, star, ignoreMaxStar)}
						onclick={() => addStarforce(gear, Math.min(15 - gear.star, star), ignoreMaxStar)}
					>
						+{star}
					</Button>
				{/each}
			</div>
		</FormControl>
	</FormItem>
</FormSection>

<FormSection class="gap-4">
	<FormItem>
		<FormLabel title="놀라운 장비 강화" />
		<FormControl>
			<div class="flex items-center gap-x-2">
				<Checkbox bind:checked={bonus} id="bonus" />
				<Label for="bonus">보너스 스탯</Label>
			</div>
		</FormControl>
	</FormItem>
	<FormItem>
		<FormLabel title="강화 적용" variant="nested" />
		<FormControl>
			<div class="flex w-full flex-col gap-1 sm:flex-row sm:items-center sm:justify-end">
				{#each [1, 5] as star}
					<Button
						variant="outline"
						size="sm"
						class="text-sky-500 hover:text-sky-500/90"
						disabled={gear.star >= 15 || !canAddStarScroll(gear, star, ignoreMaxStar)}
						onclick={() =>
							addStarScroll(gear, Math.min(15 - gear.star, star), bonus, ignoreMaxStar)}
					>
						+{star}
					</Button>
				{/each}
			</div>
		</FormControl>
	</FormItem>
</FormSection>

<FormSection>
	<FormItem>
		<FormLabel
			title="최대 강화 단계 초과"
			description={canIgnoreMaxStarScroll
				? `설정하면 15성까지 강화할 수 있어요.`
				: '장비 강화는 15성까지만 가능해요.'}
			disabled={!canIgnoreMaxStarScroll}
			for="ignoreMaxStar"
		/>
		<FormControl>
			<Switch bind:checked={ignoreMaxStar} id="ignoreMaxStar" disabled={!canIgnoreMaxStarScroll} />
		</FormControl>
	</FormItem>
</FormSection>

<FormSection>
	<FormItem>
		<FormLabel title="장비 강화 초기화" />
		<FormControl>
			<div class="flex w-full flex-col gap-1 sm:flex-row sm:items-center sm:justify-end">
				<Button
					variant="destructive"
					size="sm"
					disabled={!gear.canResetStarforce || gear.star === 0}
					onclick={() => gear.resetStarforce()}
				>
					초기화
				</Button>
			</div>
		</FormControl>
	</FormItem>
</FormSection>