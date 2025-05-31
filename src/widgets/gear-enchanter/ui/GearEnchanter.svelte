<script lang="ts">
	import { goto } from '$app/navigation';
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
	import { TabSelectorDrawer } from '$lib/features/tab-selector';
	import { Separator } from '$lib/shared/shadcn/components/ui/separator';
	import { Tabs, TabsContent } from '$lib/shared/shadcn/components/ui/tabs';
	import type { Gear } from '@malib/gear';
	import { tabs } from '../model/tabs';
	import TabSelectorList from '$lib/features/tab-selector/ui/TabSelectorList.svelte';
	import { GearTooltip } from '$lib/entities/gear-tooltip2';

	let {
		gear,
		initialTab
	}: {
		gear: Gear;
		initialTab?: string;
	} = $props();

	const tabInfos = $derived(
		tabs.map((tab) => ({
			label: tab.label,
			value: tab.value,
			disabled: tab.disabled?.(gear)
		}))
	);

	let tab = $state(getTab(initialTab));

	function getTab(initialTab?: string) {
		const activeTabs = tabInfos.filter((tab) => !tab.disabled);
		if (activeTabs.some((tab) => tab.value === initialTab)) {
			return initialTab;
		}
		if (initialTab) {
			goto('?');
		}
		return activeTabs[0].value;
	}
</script>

<div class="mx-auto w-full max-w-screen-md px-4 lg:max-w-none">
	<div class="flex w-full flex-col gap-y-2 lg:hidden">
		<TabSelectorDrawer bind:tab tabs={tabInfos} />
		<GearEnchanterPreview {gear} />
		<Separator class="mt-4" />
	</div>

	<div class="flex justify-center gap-x-8">
		<div class="hidden w-56 lg:block">
			<TabSelectorList bind:tab tabs={tabInfos} />
		</div>
		<div class="w-full max-w-screen-sm">
			<Tabs bind:value={tab}>
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
		<div class="sticky top-0 hidden h-full lg:block">
			<GearTooltip
				{gear}
				incline={{ combat: 0 }}
				loadSetItemName={() => ''}
				loadExclusiveEquips={() => []}
			/>
		</div>
	</div>
</div>
