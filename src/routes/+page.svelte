<script lang="ts">
	import { goto } from '$app/navigation';
	import { FollowCursor } from '$lib/components/follow-cursor';
	import { Button } from '$lib/components/ui/button';
	import * as Empty from '$lib/components/ui/empty';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { GearDialog } from '$lib/features/gear-inventory/dialog';
	import {
		GearInventoryGrid,
		GearInventoryGridDeleteItem,
		GearInventoryGridItem,
		GearInventoryGridItemContent
	} from '$lib/features/gear-inventory/grid';
	import {
		createDeleter,
		createGearCountLiveQuery,
		createGearLiveQuery,
		GearInventoryHeader
	} from '$lib/features/gear-inventory/header';
	import { createLayoutStore } from '$lib/features/gear-inventory/header/model/LayoutStore.svelte.js';
	import { GearTooltipRenderer } from '$lib/features/gear-tooltip-renderer';
	import { MainNavbar } from '$lib/features/navigation/main-navbar';
	import { ScrollTopButton } from '$lib/features/scroll-top-button';
	import { extractGearData } from '$lib/stores/gear-inventory';
	import { createPointerDetection } from '$lib/utils';
	import { type GearData, ReadonlyGear } from '@malib/gear';
	import { Folder, Loader2 } from 'lucide-svelte';

	const NAVBAR_HEIGHT = 56;
	const FLOATING_HEIGHT = 136;
	const DELETE_MODE_DIFF = 62;
	const SCROLL_THRESHOLD = 8;

	const gearQuery = createGearLiveQuery();
	const countQuery = createGearCountLiveQuery();
	const deleter = createDeleter();
	const pointerDetection = createPointerDetection();

	let mode = $state<'default' | 'delete'>('default');

	const layoutStore = createLayoutStore();

	let viewportRef = $state<HTMLElement | null>(null);
	let scrollY = $state(0);

	let hoverGearData = $state<GearData | null>(null);
	let popupGearData = $state<GearData | null>(null);
	let popupSeq = $state<number | null>(null);
	let showPopup = $state(false);

	$effect(() => {
		gearQuery.value;
		hoverGearData = null;
	});

	function handleItemClick(seq: number, gearData: GearData) {
		if (!pointerDetection.isPointerFine) {
			popupGearData = gearData;
			popupSeq = seq;
			showPopup = true;
		}
	}

	function handleItemHover(gearData: GearData | null) {
		if (pointerDetection.isPointerFine) {
			hoverGearData = gearData;
		}
	}

	function onModeChange(mode: 'default' | 'delete') {
		if (mode === 'delete') {
			if (scrollY > SCROLL_THRESHOLD) {
				if (viewportRef) {
					viewportRef.scrollTop += DELETE_MODE_DIFF;
				}
			}
		} else {
			if (viewportRef) {
				viewportRef.scrollTop -= DELETE_MODE_DIFF;
			}
		}
	}

	function onscroll(event: Event) {
		const target = event.target as HTMLElement;
		scrollY = target.scrollTop;
	}
</script>

<svelte:head>
	<title>아이템 시뮬레이터</title>
</svelte:head>

<ScrollArea class="h-dvh" bind:viewportRef {onscroll}>
	<MainNavbar />
	<GearInventoryHeader
		{gearQuery}
		{countQuery}
		{deleter}
		{scrollY}
		bind:mode
		{layoutStore}
		top={NAVBAR_HEIGHT}
		{onModeChange}
	/>

	{#if gearQuery.isLoading}
		<div class="flex h-32 items-center justify-center">
			<Loader2 class="size-8 animate-spin" />
		</div>
	{:else if gearQuery.error}
		<div class="flex h-32 items-center justify-center">
			<div>아이템을 불러오는 중 오류가 발생했어요.</div>
		</div>
	{:else if gearQuery.isLoadedAndNotEmpty && gearQuery.value}
		{#if viewportRef}
			<GearInventoryGrid
				items={gearQuery.value}
				startMargin={NAVBAR_HEIGHT + FLOATING_HEIGHT}
				scrollRef={viewportRef}
				maxColumns={layoutStore.columns === 'auto' ? undefined : layoutStore.columns}
			>
				{#snippet children(item)}
					{#if mode === 'delete'}
						<GearInventoryGridDeleteItem
							selected={deleter.has(item.seq)}
							onclick={() =>
								deleter.has(item.seq) ? deleter.delete(item.seq) : deleter.add(item.seq)}
							onmouseenter={() => handleItemHover(extractGearData(item))}
							onmouseleave={() => handleItemHover(null)}
						>
							<GearInventoryGridItemContent gearData={extractGearData(item)} scale={2} />
						</GearInventoryGridDeleteItem>
					{:else}
						<GearInventoryGridItem
							href={pointerDetection.isPointerFine ? `/gear/${item.seq}` : undefined}
							onmouseenter={() => handleItemHover(extractGearData(item))}
							onmouseleave={() => handleItemHover(null)}
							onclick={!pointerDetection.isPointerFine
								? () => handleItemClick(item.seq, extractGearData(item))
								: undefined}
						>
							<GearInventoryGridItemContent gearData={extractGearData(item)} scale={2} />
						</GearInventoryGridItem>
					{/if}
				{/snippet}
			</GearInventoryGrid>
		{/if}
	{:else if gearQuery.search}
		<div class="flex h-32 flex-col items-center justify-center gap-y-2">
			<div>필터에 해당하는 결과가 없어요.</div>
		</div>
	{:else if countQuery.value === 0}
		<Empty.Root>
			<Empty.Header>
				<Empty.Media variant="icon">
					<Folder />
				</Empty.Media>
				<Empty.Title>인벤토리가 비어있어요</Empty.Title>
				<Empty.Description>
					아이템을 검색하여 추가할 수 있어요. <br /> 불러오기 기능은 아직 준비 중이에요.
				</Empty.Description>
			</Empty.Header>
			<Empty.Content>
				<div class="flex gap-2">
					<Button href="/gear/search">아이템 추가</Button>
					<Button variant="outline" disabled>불러오기</Button>
				</div>
			</Empty.Content>
		</Empty.Root>
	{/if}
</ScrollArea>

{#if scrollY > SCROLL_THRESHOLD}
	<ScrollTopButton scrollRef={viewportRef ?? undefined} />
{/if}

<!-- Pointer fine 장치에서만 호버 툴팁 표시 -->
{#if hoverGearData && pointerDetection.isPointerFine}
	<FollowCursor paddingRight={9}>
		<GearTooltipRenderer gear={new ReadonlyGear(hoverGearData)} incline={{ combat: 0 }} />
	</FollowCursor>
{/if}

<!-- 터치 장치에서는 클릭 팝업 표시 -->
{#if popupGearData && popupSeq && !pointerDetection.isPointerFine}
	<GearDialog
		gear={new ReadonlyGear(popupGearData)}
		bind:open={showPopup}
		onAccept={() => goto(`/gear/${popupSeq}`)}
		onClose={() => (showPopup = false)}
	/>
{/if}
