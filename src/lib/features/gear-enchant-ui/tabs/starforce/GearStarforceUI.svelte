<script lang="ts">
	import { ButtonGroup } from '$lib/components/button-group';
	import { Button } from '$lib/components/ui/button';
	import { Card } from '$lib/components/ui/card';
	import { Separator } from '$lib/components/ui/separator';
	import * as Tabs from '$lib/components/ui/tabs';
	import { Gear } from '@malib/gear';
	import { getDisplayMaxStar } from './model/star';
	import { showStarScrollTab } from './model/starScroll';
	import StarDisplay from '$lib/features/gear-enchant-ui/tabs/starforce/components/StarDisplay.svelte';
	import StarforceTab from '$lib/features/gear-enchant-ui/tabs/starforce/tabs/StarforceTab.svelte';
	import StarScrollTab from '$lib/features/gear-enchant-ui/tabs/starforce/tabs/StarScrollTab.svelte';
	import { toast } from 'svelte-sonner';

	let { gear }: { gear: Gear } = $props();

	let ignoreMaxStar = $state(false);

	function handleReset(gear: Gear) {
		gear.resetStarforce();
		toast.success('스타포스 강화를 초기화했어요.', {
			position: 'top-center',
			duration: 2000
		});
	}
</script>

<div class="flex flex-col gap-y-4">
	<div class="mx-auto w-full max-w-xs lg:hidden">
		<Card class="p-4">
			<StarDisplay
				star={gear.star}
				maxStar={getDisplayMaxStar(gear)}
				color={gear.starScroll ? 'blue' : 'yellow'}
			/>
		</Card>
	</div>

	<Tabs.Root value="starforce" class="gap-y-4">
		{#if showStarScrollTab(gear)}
			<Tabs.List class="grid w-full grid-cols-2">
				<Tabs.Trigger value="starforce">스타포스</Tabs.Trigger>
				<Tabs.Trigger value="starScroll">놀장강</Tabs.Trigger>
			</Tabs.List>
		{/if}
		<Tabs.Content value="starforce" class="flex flex-col gap-y-4">
			<StarforceTab {gear} bind:ignoreMaxStar />
		</Tabs.Content>
		<Tabs.Content value="starScroll" class="flex flex-col gap-y-4">
			<StarScrollTab {gear} bind:ignoreMaxStar />
		</Tabs.Content>
	</Tabs.Root>

	<Separator />

	<ButtonGroup>
		<Button
			variant="destructive"
			onclick={() => handleReset(gear)}
			disabled={!gear.canResetStarforce}
		>
			스타포스 강화 초기화
		</Button>
	</ButtonGroup>
</div>
