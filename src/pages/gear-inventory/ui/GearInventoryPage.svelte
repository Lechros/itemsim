<script lang="ts">
	import { goto } from '$app/navigation';
	import { GearTooltip } from '$lib/components/gear-tooltip2';
	import {
		GearDialog,
		GearInventoryGrid,
		GearInventoryGridDeleteItem,
		GearInventoryGridItem,
		GearInventoryGridItemContent
	} from '$lib/features/gear-inventory';
	import { ScrollTopButton } from '$lib/features/scroll-top-button';
	import { createPointerDetection } from '$lib/shared/lib/device-detection.svelte';
	import { Button } from '$lib/shared/shadcn/components/ui/button';
	import { ScrollArea } from '$lib/shared/shadcn/components/ui/scroll-area';
	import { FollowCursor } from '$lib/shared/ui';
	import {
		createDeleter,
		createGearCountLiveQuery,
		createGearLiveQuery,
		GearInventoryHeader
	} from '$lib/widgets/gear-inventory-header';
	import { createLayoutStore } from '$lib/widgets/gear-inventory-header/model/LayoutStore.svelte';
	import { MainNavbar } from '$lib/widgets/main-navbar';
	import { ReadonlyGear, type GearData } from '@malib/gear';
	import { Loader2, Plus } from 'lucide-svelte';

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
						onmouseenter={() => handleItemHover(item.gear)}
						onmouseleave={() => handleItemHover(null)}
					>
						<GearInventoryGridItemContent gearData={item.gear} scale={2} />
					</GearInventoryGridDeleteItem>
				{:else}
					<GearInventoryGridItem
						href={pointerDetection.isPointerFine ? `/gear/${item.seq}` : undefined}
						onmouseenter={() => handleItemHover(item.gear)}
						onmouseleave={() => handleItemHover(null)}
						onclick={!pointerDetection.isPointerFine
							? () => handleItemClick(item.seq, item.gear)
							: undefined}
					>
						<GearInventoryGridItemContent gearData={item.gear} scale={2} />
					</GearInventoryGridItem>
				{/if}
			{/snippet}
		</GearInventoryGrid>
	{:else if gearQuery.search}
		<div class="flex h-32 flex-col items-center justify-center gap-y-2">
			<div>필터에 해당하는 결과가 없어요.</div>
		</div>
	{:else if countQuery.value === 0}
		<div class="flex h-32 flex-col items-center justify-center gap-y-2">
			<div>인벤토리에 아이템을 추가해 보세요.</div>
			<Button variant="outline" size="lg" href="/gear/search">
				<Plus />
				아이템 추가
			</Button>
		</div>
	{/if}
</ScrollArea>

{#if scrollY > SCROLL_THRESHOLD}
	<ScrollTopButton scrollRef={viewportRef ?? undefined} />
{/if}

<!-- Pointer fine 장치에서만 호버 툴팁 표시 -->
{#if hoverGearData && pointerDetection.isPointerFine}
	<FollowCursor paddingRight={9}>
		<GearTooltip
			gear={new ReadonlyGear(hoverGearData)}
			incline={{ combat: 0 }}
			loadSetItemName={() => '보스 장신구 세트'}
			loadExclusiveEquips={() => []}
		/>
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
