<script lang="ts">
	import GearPreview from '$lib/features/gear-editor/ui/GearPreview.svelte';
	import SoulWeapon from '$lib/features/gear-editor/ui/SoulWeapon.svelte';
	import { GearEnchanterAttributes } from '$lib/features/gear-enchanter-attributes';
	import { GearEnchanterExceptional } from '$lib/features/gear-enchanter-exceptional';
	import {
		GearEnchanterAdditionalPotential,
		GearEnchanterPotential
	} from '$lib/features/gear-enchanter-potential';
	import { GearEnchanterStarforce } from '$lib/features/gear-enchanter-starforce';
	import { GearEnchanterUpgrade } from '$lib/features/gear-enchanter-upgrade';
	import { TabSelector } from '$lib/features/tab-selector';
	import { Separator } from '$lib/shared/shadcn/components/ui/separator';
	import { Tabs } from '$lib/shared/shadcn/components/ui/tabs';
	import TabsContent from '$lib/shared/shadcn/components/ui/tabs/tabs-content.svelte';
	import type { Gear } from '@malib/gear';
	import { tabs } from '../model/tabs';
	import { GearEnchanterAddOption } from '$lib/features/gear-enchanter-addoption';

	let {
		gear,
		initialTab
	}: {
		gear: Gear;
		initialTab?: string;
	} = $props();

	let tab = $state(initialTab ?? tabs[0].value);
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
	<GearPreview {gear} />
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
		<SoulWeapon {gear} />
	</TabsContent>
</Tabs>
