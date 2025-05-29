<script lang="ts">
	import { gearTabs } from '$lib/features/gear-editor/model/gear-tabs';
	import AdditionalPotential from '$lib/features/gear-editor/ui/AdditionalPotential.svelte';
	import AddOption from '$lib/features/gear-editor/ui/AddOption.svelte';
	import Exceptional from '$lib/features/gear-editor/ui/Exceptional.svelte';
	import GearHeader from '$lib/features/gear-editor/ui/GearHeader.svelte';
	import GearPreview from '$lib/features/gear-editor/ui/GearPreview.svelte';
	import GearTabSelector from '$lib/features/gear-editor/ui/GearTabSelector.svelte';
	import ManageProps from '$lib/features/gear-editor/ui/ManageProps.svelte';
	import Potential from '$lib/features/gear-editor/ui/Potential.svelte';
	import SoulWeapon from '$lib/features/gear-editor/ui/SoulWeapon.svelte';
	import Starforce from '$lib/features/gear-editor/ui/Starforce.svelte';
	import Upgrade from '$lib/features/gear-editor/ui/Upgrade.svelte';
	import { getGearData, updateGearData } from '$lib/features/gear-inventory';
	import { Button } from '$lib/shared/shadcn/components/ui/button';
	import ScrollArea from '$lib/shared/shadcn/components/ui/scroll-area/scroll-area.svelte';
	import { Separator } from '$lib/shared/shadcn/components/ui/separator';
	import { Gear, type GearData } from '@malib/gear';
	import { toast } from 'svelte-sonner';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let isLoading = $state(true);
	let gearData = $state<GearData | undefined>(undefined);
	let lastGearData = $state<GearData | undefined>(undefined);
	const gear = $derived(gearData ? new Gear(gearData) : undefined);

	$effect(() => {
		getGearData(Number(data.seq))
			.then((d) => {
				gearData = d;
				lastGearData = structuredClone(d);
			})
			.finally(() => {
				isLoading = false;
			});
	});

	$effect(() => {
		if (gearData && JSON.stringify(gearData) !== JSON.stringify(lastGearData)) {
			const snapshot = $state.snapshot(gearData);
			updateGearData(Number(data.seq), snapshot)
				.then(() => {
					lastGearData = snapshot;
				})
				.catch((e) => {
					toast.error('아이템 저장에 실패했습니다.', {
						description: e.message
					});
				});
		}
	});

	let currentTab = $state(gearTabs.find((tab) => tab.value === data.initialTab) ?? gearTabs[0]);
</script>

<ScrollArea class="flex h-screen flex-col">
	<GearHeader />

	<div class="mx-auto w-full max-w-screen-md px-4">
		{#if isLoading}
			Loading...
		{:else if !gear}
			<div class="mt-8 flex w-full flex-col items-center justify-center gap-4">
				<h2 class="text-2xl font-semibold">잘못된 접근입니다.</h2>
				<Button variant="outline" href="/">돌아가기</Button>
			</div>
		{:else}
			<div class="mt-4 flex w-full flex-col gap-y-2">
				<GearTabSelector
					bind:currentTab
					tabs={gearTabs.map((tab) => ({
						label: tab.label,
						value: tab.value,
						disabled: tab.disabled?.(gear) ?? false
					}))}
				/>
				<GearPreview {gear} />
			</div>

			<Separator class="my-4" />

			{#if currentTab.value === 'default'}
				관리 탭
			{:else if currentTab.value === 'props'}
				<ManageProps {gear} />
			{:else if currentTab.value === 'starforce'}
				<Starforce {gear} />
			{:else if currentTab.value === 'scroll'}
				<Upgrade {gear} />
			{:else if currentTab.value === 'bonus'}
				<AddOption {gear} />
			{:else if currentTab.value === 'pot'}
				<Potential {gear} />
			{:else if currentTab.value === 'addiPot'}
				<AdditionalPotential {gear} />
			{:else if currentTab.value === 'exceptional'}
				<Exceptional {gear} />
			{:else if currentTab.value === 'soul'}
				<SoulWeapon {gear} />
			{/if}
		{/if}
	</div>
</ScrollArea>
