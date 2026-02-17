<script lang="ts">
	import { UIImage2 } from '$lib/components/ui-image';
	import { Gear } from '@malib/gear';
	import { Tabs } from 'bits-ui';
	import LineTabsTrigger from '../../tab/LineTabsTrigger.svelte';
	import { showStarScrollTab } from './model/starScroll';
	import StarforceTab from './tabs/StarforceTab.svelte';
	import StarScrollTab from './tabs/StarScrollTab.svelte';

	let { gear }: { gear: Gear } = $props();

	let currentTab = $state('starforce');
	let ignoreMaxStar = $state(gear.star > gear.maxStar);
</script>

<div class="flex flex-col">
	<Tabs.Root bind:value={currentTab}>
		{#if showStarScrollTab(gear)}
			<Tabs.List class="grid w-full grid-cols-2">
				<LineTabsTrigger value="starforce" class="border-r">
					<UIImage2 image="star" />
					스타포스
				</LineTabsTrigger>
				<LineTabsTrigger value="starScroll" disabled={!showStarScrollTab(gear)}>
					<UIImage2 image="blueStar" />
					장비 강화
				</LineTabsTrigger>
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
