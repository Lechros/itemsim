<script lang="ts">
	import { gearTabs } from '$lib/features/gear-editor/model/gear-tabs';
	import GearHeader from '$lib/features/gear-editor/ui/GearHeader.svelte';
	import GearPreview from '$lib/features/gear-editor/ui/GearPreview.svelte';
	import GearTabSelector from '$lib/features/gear-editor/ui/GearTabSelector.svelte';
	import ManageProps from '$lib/features/gear-editor/ui/ManageProps.svelte';
	import { getGearData, updateGearData } from '$lib/features/gear-inventory';
	import { Button } from '$lib/shared/shadcn/components/ui/button';
	import ScrollArea from '$lib/shared/shadcn/components/ui/scroll-area/scroll-area.svelte';
	import { Separator } from '$lib/shared/shadcn/components/ui/separator';
	import { Gear, type GearData } from '@malib/gear';
	import type { PageProps } from './$types';
	import { untrack } from 'svelte';
	import { toast } from 'svelte-sonner';

	let { data }: PageProps = $props();

	let isLoading = $state(true);
	let gearData = $state<GearData | undefined>(undefined);
	const gear = $derived(gearData ? new Gear(gearData) : undefined);

	$effect(() => {
		getGearData(Number(data.seq))
			.then((d) => {
				gearData = d;
			})
			.finally(() => {
				isLoading = false;
			});
	});

	$effect(() => {
		if (gearData) {
			updateGearData(Number(data.seq), $state.snapshot(gearData)).catch((e) => {
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
			<div class="mt-4 flex w-full flex-col">
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
				스타포스 탭
			{:else if currentTab.value === 'scroll'}
				주문서 탭
			{:else if currentTab.value === 'bonus'}
				추가옵션 탭
			{:else if currentTab.value === 'pot'}
				잠재능력 탭
			{:else if currentTab.value === 'addiPot'}
				에디셔널 잠재능력 탭
			{:else if currentTab.value === 'exceptional'}
				익셉셔널 탭
			{:else if currentTab.value === 'soul'}
				소울웨폰 탭
			{/if}
		{/if}
	</div>
</ScrollArea>
