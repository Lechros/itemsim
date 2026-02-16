<script lang="ts">
	import { UIImage2 } from '$lib/components/ui-image';
	import { buttonVariants } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';
	import { Gear } from '@malib/gear';
	import { Tabs } from 'bits-ui';
	import { getImplicitMaxStar } from './model/starforce';
	import { showStarScrollTab } from './model/starScroll';
	import StarforceTab from './tabs/StarforceTab.svelte';
	import StarScrollTab from './tabs/StarScrollTab.svelte';

	let { gear }: { gear: Gear } = $props();

	const SELECTED = [
		buttonVariants({ variant: 'ghost', size: 'lg' }),
		'rounded-none transition-none hover:bg-transparent'
	];
	const UNSELECTED = [
		buttonVariants({ variant: 'secondary', size: 'lg' }),
		'rounded-none border-b shadow-none transition-none'
	];

	let currentTab = $state('starforce');
	let ignoreMaxStar = $state(gear.maxStar < getImplicitMaxStar(gear, true));
</script>

<div class="flex flex-col">
	<Tabs.Root bind:value={currentTab}>
		{#if showStarScrollTab(gear)}
			<Tabs.List class="grid w-full grid-cols-2">
				<Tabs.Trigger
					value="starforce"
					class={cn(currentTab === 'starforce' ? SELECTED : UNSELECTED, 'border-r')}
				>
					<UIImage2 image="star" />
					스타포스
				</Tabs.Trigger>
				<Tabs.Trigger
					value="starScroll"
					class={cn(currentTab === 'starScroll' ? SELECTED : UNSELECTED)}
					disabled={!showStarScrollTab(gear)}
				>
					<UIImage2 image="blueStar" />
					장비 강화
				</Tabs.Trigger>
			</Tabs.List>
		{/if}
		<Tabs.Content value="starforce" class="flex flex-col">
			<StarforceTab {gear} bind:currentTab bind:ignoreMaxStar />
		</Tabs.Content>
		<Tabs.Content value="starScroll" class="flex flex-col">
			<StarScrollTab {gear} bind:ignoreMaxStar />
		</Tabs.Content>
	</Tabs.Root>
</div>
