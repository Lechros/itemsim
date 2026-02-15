<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs';
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
	import { GearTooltipRenderer } from '$lib/features/gear-tooltip-renderer';
	import type { SettingsStore } from '$lib/stores/settings.svelte';
	import type { Gear } from '@malib/gear';
	import { getContext } from 'svelte';
	import GearManageUI from './tabs/manage/GearManageUI.svelte';
	import { tabs } from './tabs/tabs';

	let {
		gear,
		seq,
		initialTab,
		onGearUpdated
	}: {
		gear: Gear;
		seq: number;
		initialTab?: string;
		onGearUpdated?: (
			newGear: import('@malib/gear').GearData,
			newHash: string
		) => void | Promise<void>;
	} = $props();

	const tabStore = $derived(
		createTabStore(
			tabs.map((tab) => ({ ...tab, disabled: tab.disabled?.(gear) })),
			initialTab
		)
	);
	
	const settingsStore = getContext<SettingsStore>('settingsStore');
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
				<Tabs.Root value={tabStore.currentTab.value}>
					<Tabs.Content value="default">
						<GearManageUI {gear} {seq} {onGearUpdated} />
					</Tabs.Content>
					<Tabs.Content value="props">
						<GearAttributeUI {gear} />
					</Tabs.Content>
					<Tabs.Content value="starforce">
						<GearStarforceUI {gear} />
					</Tabs.Content>
					<Tabs.Content value="scroll">
						<GearUpgradeUI {gear} />
					</Tabs.Content>
					<Tabs.Content value="bonus">
						<GearAddOptionUI {gear} />
					</Tabs.Content>
					<Tabs.Content value="pot">
						<GearPotentialUI {gear} />
					</Tabs.Content>
					<Tabs.Content value="addiPot">
						<GearAdditionalPotentialUI {gear} />
					</Tabs.Content>
					<Tabs.Content value="exceptional">
						<GearExceptionalUI {gear} />
					</Tabs.Content>
					<Tabs.Content value="soul">
						<GearSoulWeaponUI {gear} />
					</Tabs.Content>
				</Tabs.Root>
			</div>
		</div>
	</div>

	<div class="sticky top-14 hidden h-[calc(100svh-56px)] md:flex">
		<div class="overflow-y-auto px-2 py-6" style="scrollbar-width: none">
			<GearTooltipRenderer
				{gear}
				tooltipVersion={settingsStore.tooltipVersion}
				tooltip1Options={settingsStore.tooltip1Options}
				tooltip2Options={settingsStore.tooltip2Options}
			/>
		</div>
	</div>
</div>
