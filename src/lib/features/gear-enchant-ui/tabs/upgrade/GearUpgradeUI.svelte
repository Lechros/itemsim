<script lang="ts">
	import { ItemRawIcon } from '$lib/components/icons';
	import { cn } from '$lib/utils';
	import { Gear, ReadonlyGear } from '@malib/gear';
	import { Tabs } from 'bits-ui';
	import LineTabsTrigger from '../../tab/LineTabsTrigger.svelte';
	import { getOnlyScrolls } from './model/etcScroll';
	import { tabs } from './model/tabs';
	import ChaosScrollTab from './tabs/ChaosScrollTab.svelte';
	import EtcScrollTab from './tabs/EtcScrollTab.svelte';
	import SpellTraceTab from './tabs/SpellTraceTab.svelte';

	let { gear }: { gear: Gear } = $props();

	const activeTabs = $derived(getActiveTabs(gear));
	let currentTab = $state(activeTabs[0].value);

	function getActiveTabs(gear: ReadonlyGear) {
		if (getOnlyScrolls(gear).length > 0) {
			if (tabs[2].value !== 'etc') {
				throw new TypeError("tabs[2] must be 'etc'");
			}
			return [tabs[2]];
		}
		return tabs.filter((tab) => tab.show?.(gear));
	}
</script>

<Tabs.Root bind:value={currentTab}>
	<Tabs.List
		class={cn(
			'grid w-full border-b',
			activeTabs.length === 2 && 'grid-cols-2',
			activeTabs.length === 3 && 'grid-cols-3'
		)}
	>
		{#each activeTabs as tab, index}
			<LineTabsTrigger
				value={tab.value}
				class={cn(index === activeTabs.length - 1 ? '' : 'border-r')}
				inactiveBorderBottom={false}
			>
				<div class="item-raw-icon-wrapper flex size-4 items-center justify-center">
					<ItemRawIcon icon={tab.iconId} scale={0.6} />
				</div>
				{tab.label}
			</LineTabsTrigger>
		{/each}
	</Tabs.List>

	<Tabs.Content value="spellTrace">
		<SpellTraceTab {gear} />
	</Tabs.Content>
	<Tabs.Content value="chaos">
		<ChaosScrollTab {gear} />
	</Tabs.Content>
	<Tabs.Content value="etc">
		<EtcScrollTab {gear} />
	</Tabs.Content>
</Tabs.Root>

<style>
	.item-raw-icon-wrapper :global(img) {
		image-rendering: auto;
	}
</style>
