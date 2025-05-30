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
	import { TabSelector } from '$lib/features/tab-selector';
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

	let tab = $state(getTab(initialTab));

	function getTab(initialTab?: string) {
		const activeTabs = tabs.filter((tab) => !tab.disabled?.(gear));
		if (activeTabs.some((tab) => tab.value === initialTab)) {
			return initialTab;
		}
		if (initialTab) {
			goto('?');
		}
		return activeTabs[0].value;
	}
</script>

<div class="mt-4 flex w-full flex-col gap-y-2">
	<TabSelector
		bind:tab
		tabs={tabs.map((tab) => ({
			label: tab.label,
			value: tab.value,
			disabled: tab.disabled?.(gear)
		}))}
	/>
	<GearEnchanterPreview {gear} />
</div>

<Separator class="my-4" />

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
