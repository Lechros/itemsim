<script lang="ts">
	import { GearTooltip } from '$lib/components/gear-tooltip2';
	import { Tabs, TabsContent } from '$lib/components/ui/tabs';
	import TabSelectorDrawer from '$lib/features/gear-enchant-ui/tab-selector/TabSelectorDrawer.svelte';
	import TabSelectorList from '$lib/features/gear-enchant-ui/tab-selector/TabSelectorList.svelte';
	import { createTabStore } from '$lib/features/gear-enchant-ui/tab-selector/TabStore.svelte';
	import GearAddOptionUI from '$lib/features/gear-enchant-ui/tabs/add-option/GearAddOptionUI.svelte';
	import GearAttributeUI from '$lib/features/gear-enchant-ui/tabs/attributes/GearAttributeUI.svelte';
	import GearExceptionalUI from '$lib/features/gear-enchant-ui/tabs/exceptional/GearExceptionalUI.svelte';
	import GearAdditionalPotentialUI from '$lib/features/gear-enchant-ui/tabs/potential/GearAdditionalPotentialUI.svelte';
	import GearPotentialUI from '$lib/features/gear-enchant-ui/tabs/potential/GearPotentialUI.svelte';
	import GearSoulWeaponUI from '$lib/features/gear-enchant-ui/tabs/soul-weapon/GearSoulWeaponUI.svelte';
	import GearStarforceUI from '$lib/features/gear-enchant-ui/tabs/starforce/GearStarforceUI.svelte';
	import GearUpgradeUI from '$lib/features/gear-enchant-ui/tabs/upgrade/GearUpgradeUI.svelte';
	import GearTooltipButton from '$lib/features/gear-enchant-ui/tooltip/GearTooltipButton.svelte';
	import type { Gear } from '@malib/gear';
	import GearManageUI from './tabs/manage/GearManageUI.svelte';
	import { tabs } from './tabs/tabs';
	import { useSetItems } from '$lib/hooks/set-item';
	import { useExclusiveEquips } from '$lib/hooks/exclusive-equip';
	import { createSetItemNameLoader } from '$lib/stores/set-item.svelte';
	import { createExclusiveEquipsLoader } from '$lib/stores/exclusive-equip.svelte';

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

	// Load set item and exclusive equip data
	const setItems = useSetItems();
	const exclusiveEquips = useExclusiveEquips();
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
					<TabsContent value="default">
						<GearManageUI {gear} />
					</TabsContent>
					<TabsContent value="props">
						<GearAttributeUI {gear} />
					</TabsContent>
					<TabsContent value="starforce">
						<GearStarforceUI {gear} />
					</TabsContent>
					<TabsContent value="scroll">
						<GearUpgradeUI {gear} />
					</TabsContent>
					<TabsContent value="bonus">
						<GearAddOptionUI {gear} />
					</TabsContent>
					<TabsContent value="pot">
						<GearPotentialUI {gear} />
					</TabsContent>
					<TabsContent value="addiPot">
						<GearAdditionalPotentialUI {gear} />
					</TabsContent>
					<TabsContent value="exceptional">
						<GearExceptionalUI {gear} />
					</TabsContent>
					<TabsContent value="soul">
						<GearSoulWeaponUI {gear} />
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
				expand
				loadSetItemName={createSetItemNameLoader(setItems.data)}
				loadExclusiveEquips={createExclusiveEquipsLoader(exclusiveEquips.data)}
			/>
		</div>
	</div>
</div>
