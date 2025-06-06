<script lang="ts">
	import { GearTooltip } from '$lib/entities/gear-tooltip2';
	import { GearEnchanterAddOption } from '$lib/features/gear-enchanter-addoption';
	import { GearEnchanterAttributes } from '$lib/features/gear-enchanter-attributes';
	import { GearEnchanterExceptional } from '$lib/features/gear-enchanter-exceptional';
	import {
		GearEnchanterAdditionalPotential,
		GearEnchanterPotential
	} from '$lib/features/gear-enchanter-potential';
	import { GearEnchanterPreview } from '$lib/features/gear-enchanter-preview';
	import { GearEnchanterSoulWeapon } from '$lib/features/gear-enchanter-soulweapon';
	import { GearEnchanterStarforce } from '$lib/features/gear-enchanter-starforce';
	import { GearEnchanterUpgrade } from '$lib/features/gear-enchanter-upgrade';
	import { TabSelectorDrawer, createTabStore } from '$lib/features/tab-selector';
	import TabSelectorList from '$lib/features/tab-selector/ui/TabSelectorList.svelte';
	import { Separator } from '$lib/shared/shadcn/components/ui/separator';
	import { Tabs, TabsContent } from '$lib/shared/shadcn/components/ui/tabs';
	import type { Gear } from '@malib/gear';
	import { tabs } from '../model/tabs';

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

<div class="mx-auto w-full max-w-screen-md px-4 md:max-w-none">
	<div class="flex justify-center gap-x-8">
		<div class="hidden w-52 lg:block">
			<TabSelectorList {tabStore} />
		</div>

		<div class="w-full md:max-w-screen-sm">
			<div class="-mx-4 mb-2 lg:hidden">
				<TabSelectorDrawer {tabStore} />
			</div>

			<div class="md:hidden">
				<GearEnchanterPreview {gear} />
				<Separator class="my-4" />
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

		<div class="sticky top-0 hidden h-full md:block">
			<GearTooltip
				{gear}
				incline={{ combat: 0 }}
				loadSetItemName={() => ''}
				loadExclusiveEquips={() => []}
			/>
		</div>
	</div>
</div>
