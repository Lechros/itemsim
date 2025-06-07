<script lang="ts">
	import { GearTooltip } from '$lib/entities/gear-tooltip2';
	import { GearEnchanterAddOption } from '$lib/features/gear-enchanter-addoption';
	import { GearEnchanterAttributes } from '$lib/features/gear-enchanter-attributes';
	import { GearEnchanterExceptional } from '$lib/features/gear-enchanter-exceptional';
	import {
		GearEnchanterAdditionalPotential,
		GearEnchanterPotential
	} from '$lib/features/gear-enchanter-potential';
	import { GearEnchanterSoulWeapon } from '$lib/features/gear-enchanter-soulweapon';
	import { GearEnchanterStarforce } from '$lib/features/gear-enchanter-starforce';
	import { GearEnchanterUpgrade } from '$lib/features/gear-enchanter-upgrade';
	import { TabSelectorDrawer, createTabStore } from '$lib/features/tab-selector';
	import TabSelectorList from '$lib/features/tab-selector/ui/TabSelectorList.svelte';
	import { Tabs, TabsContent } from '$lib/shared/shadcn/components/ui/tabs';
	import type { Gear } from '@malib/gear';
	import { tabs } from '../model/tabs';
	import GearTooltipButton from './GearTooltipButton.svelte';

	let {
		gear,
		initialTab
	}: {
		gear: Gear;
		initialTab?: string;
	} = $props();

	const tabStore = $derived(
		createTabStore(
			tabs.map((tab) => ({ ...tab, disabled: tab.disabled?.(gear) })),
			initialTab
		)
	);
</script>

<div class="mx-auto flex w-full px-2">
	<div class="grid flex-1 xl:grid-cols-[240px_1fr]">
		<div class="sticky top-14 hidden h-[calc(100svh-56px)] xl:flex">
			<div class="flex w-full flex-col overflow-y-auto px-2 py-6" style="scrollbar-width: none">
				<TabSelectorList {tabStore} />
			</div>
		</div>
		<div class="min-w-0 flex-1">
			<div class="mx-auto flex max-w-screen-md flex-col gap-4 px-2 py-6 sm:px-4">
				<div class="items-top relative flex justify-between">
					<div>
						<div class="-ml-4 xl:hidden">
							<TabSelectorDrawer {tabStore} />
						</div>
						<div class="hidden h-10 items-center xl:flex">
							<h1 class="text-2xl font-semibold">{tabStore.currentTab.label}</h1>
						</div>
					</div>
					<div class="absolute -top-4 right-0 md:hidden">
						<GearTooltipButton {gear} />
					</div>
				</div>
				<Tabs value={tabStore.currentTab.value}>
					<TabsContent value="default">관리 탭</TabsContent>
					<TabsContent value="props">
						<GearEnchanterAttributes {gear} />
					</TabsContent>
					<TabsContent value="starforce">
						<GearEnchanterStarforce {gear} />
					</TabsContent>
					<TabsContent value="scroll">
						<GearEnchanterUpgrade {gear} />
					</TabsContent>
					<TabsContent value="bonus">
						<GearEnchanterAddOption {gear} />
					</TabsContent>
					<TabsContent value="pot">
						<GearEnchanterPotential {gear} />
					</TabsContent>
					<TabsContent value="addiPot">
						<GearEnchanterAdditionalPotential {gear} />
					</TabsContent>
					<TabsContent value="exceptional">
						<GearEnchanterExceptional {gear} />
					</TabsContent>
					<TabsContent value="soul">
						<GearEnchanterSoulWeapon {gear} />
					</TabsContent>
				</Tabs>
			</div>
		</div>
	</div>

	<div class="sticky top-14 hidden h-[calc(100svh-56px)] md:flex">
		<div class="overflow-y-auto px-2 py-6" style="scrollbar-width: none">
			<GearTooltip
				{gear}
				incline={{ combat: 0 }}
				loadSetItemName={() => ''}
				loadExclusiveEquips={() => []}
			/>
		</div>
	</div>
</div>
