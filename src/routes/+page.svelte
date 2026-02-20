<script lang="ts">
	import { goto } from '$app/navigation';
	import { FollowCursor } from '$lib/components/follow-cursor';
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import * as Empty from '$lib/components/ui/empty';
	import * as InputGroup from '$lib/components/ui/input-group';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { Skeleton } from '$lib/components/ui/skeleton';
	import { Spinner } from '$lib/components/ui/spinner';
	import BackupDialogContent from '$lib/features/backup-ui/BackupDialogContent.svelte';
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
		createGearLiveQuery
	} from '$lib/features/gear-inventory/header';
	import DeleteButton from '$lib/features/gear-inventory/header/components/DeleteButton.svelte';
	import SortButton from '$lib/features/gear-inventory/header/components/SortButton.svelte';
	import { GearTooltipRenderer } from '$lib/features/gear-tooltip-renderer';
	import { MainNavbar } from '$lib/features/navigation/main-navbar';
	import { ScrollTopButton } from '$lib/features/scroll-top-button';
	import { extractGearData } from '$lib/stores/gear-inventory';
	import type { SettingsStore } from '$lib/stores/settings.svelte';
	import { cn, createPointerDetection } from '$lib/utils';
	import { type GearData, ReadonlyGear } from '@malib/gear';
	import { EllipsisVerticalIcon, Folder, SearchIcon, XIcon } from 'lucide-svelte';
	import { getContext } from 'svelte';

	const gearQuery = createGearLiveQuery();
	const countQuery = createGearCountLiveQuery();
	const deleter = createDeleter();
	const pointerDetection = createPointerDetection();

	let mode = $state<'default' | 'delete'>('default');

	const settingsStore = getContext<SettingsStore>('settingsStore')!;

	let viewportRef = $state<HTMLElement | null>(null);
	let scrollY = $state(0);

	let hoverGearData = $state<GearData | null>(null);
	let popupGearData = $state<GearData | null>(null);
	let popupSeq = $state<number | null>(null);
	let showPopup = $state(false);

	let openBackupDialog = $state(false);

	$effect(() => {
		gearQuery.value;
		hoverGearData = null;
	});

	function toggleDeleteMode() {
		mode = mode === 'delete' ? 'default' : 'delete';
		deleter.clear();
	}

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

	function onscroll(event: Event) {
		const target = event.target as HTMLElement;
		scrollY = target.scrollTop;
	}

	const columnItems = [
		{ value: 4, label: '4' },
		{ value: 5, label: '5' },
		{ value: 8, label: '8' }
	];
</script>

<svelte:head>
	<title>아이템 시뮬레이터</title>
</svelte:head>

<ScrollArea class={cn('h-dvh', mode === 'delete' && 'bg-muted')} bind:viewportRef {onscroll}>
	<MainNavbar />

	<!-- Inventory Header -->
	<div class="bg-background sticky top-14 z-50 border-b">
		<div class="mx-auto box-content max-w-screen-sm sm:border-l">
			<nav class="flex flex-col gap-3 px-4 py-3 sm:border-r">
				<!-- Top Row -->
				<div class="flex items-center justify-between gap-x-2">
					<!-- Count Display -->
					<div class="flex items-center gap-x-2">
						{#if countQuery.isLoading}
							<Skeleton class="h-5 w-20" />
						{:else if mode === 'delete'}
							<div>
								선택된 아이템 <span
									class={cn('font-semibold', deleter.count === 0 && 'text-muted-foreground')}
									>{deleter.count}</span
								>/{countQuery.value}개
							</div>
						{:else if countQuery.value}
							<div>아이템 <span class="font-semibold">{countQuery.value}</span>개</div>
						{:else}
							<div class="text-muted-foreground">아이템 없음</div>
						{/if}
					</div>
					<!-- Manage Buttons -->
					<div class="flex items-center gap-x-2">
						{#if mode === 'default'}
							<Button href="/gear/search">아이템 추가</Button>
							<DropdownMenu.Root>
								<DropdownMenu.Trigger>
									{#snippet child({ props })}
										<Button {...props} variant="ghost" size="icon">
											<EllipsisVerticalIcon />
										</Button>
									{/snippet}
								</DropdownMenu.Trigger>
								<DropdownMenu.Content align="end">
									<DropdownMenu.Label>아이템 관리</DropdownMenu.Label>
									<DropdownMenu.Group>
										<DropdownMenu.Item onclick={toggleDeleteMode}>삭제하기</DropdownMenu.Item>
										<DropdownMenu.Item onclick={() => (openBackupDialog = true)}>
											아이템 백업
										</DropdownMenu.Item>
									</DropdownMenu.Group>
									<DropdownMenu.Separator />
									<DropdownMenu.Group>
										<DropdownMenu.GroupHeading>보기 설정</DropdownMenu.GroupHeading>
										{#if settingsStore.layout === 'grid'}
											<DropdownMenu.Sub>
												<DropdownMenu.SubTrigger>열 개수</DropdownMenu.SubTrigger>
												<DropdownMenu.SubContent>
													<DropdownMenu.RadioGroup
														bind:value={
															() => String(settingsStore.columns),
															(v) => (settingsStore.columns = v === 'auto' ? 'auto' : Number(v))
														}
													>
														{#each columnItems as item}
															<DropdownMenu.RadioItem value={String(item.value)}>
																{item.label}
															</DropdownMenu.RadioItem>
														{/each}
														<DropdownMenu.Separator />
														<DropdownMenu.RadioItem value="auto">최대</DropdownMenu.RadioItem>
													</DropdownMenu.RadioGroup>
												</DropdownMenu.SubContent>
											</DropdownMenu.Sub>
										{/if}
									</DropdownMenu.Group>
								</DropdownMenu.Content>
							</DropdownMenu.Root>
						{:else}
							<DeleteButton {deleter} postDelete={() => (mode = 'default')} />
							<Button
								variant="outline"
								onclick={toggleDeleteMode}
								disabled={gearQuery.isLoadedAndEmpty}
							>
								취소
							</Button>
						{/if}
					</div>
				</div>
				<!-- Bottom Row -->
				<div class="flex items-center justify-between gap-x-2">
					<div class="flex items-center gap-x-2">
						<InputGroup.Root class="max-w-60">
							<InputGroup.Addon align="inline-start">
								<SearchIcon />
							</InputGroup.Addon>
							<InputGroup.Input placeholder="아이템 이름" bind:value={gearQuery.search} />
							<InputGroup.Addon align="inline-end">
								{#if gearQuery.search}
									<InputGroup.Button
										variant="ghost"
										size="icon-xs"
										onclick={() => (gearQuery.search = '')}
									>
										<XIcon />
									</InputGroup.Button>
								{/if}
							</InputGroup.Addon>
						</InputGroup.Root>
						<SortButton bind:sort={gearQuery.sort} />
					</div>
				</div>
			</nav>
		</div>
	</div>

	{#if gearQuery.isLoading}
		<div class="flex h-32 items-center justify-center">
			<Spinner class="size-8" />
		</div>
	{:else if gearQuery.error}
		<div class="flex h-32 items-center justify-center">
			<div>아이템을 불러오는 중 오류가 발생했어요.</div>
		</div>
	{:else if gearQuery.isLoadedAndNotEmpty && gearQuery.value}
		{#if viewportRef}
			<GearInventoryGrid
				items={gearQuery.value}
				startMargin={56 + 110}
				scrollRef={viewportRef}
				maxColumns={settingsStore.columns === 'auto' ? undefined : settingsStore.columns}
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
			<div class="text-muted-foreground text-sm">필터에 해당하는 결과가 없어요.</div>
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

{#if scrollY > 8}
	<ScrollTopButton scrollRef={viewportRef ?? undefined} />
{/if}

<!-- Pointer fine 장치에서만 호버 툴팁 표시 -->
{#if hoverGearData && pointerDetection.isPointerFine}
	<FollowCursor paddingRight={9}>
		<GearTooltipRenderer
			gear={new ReadonlyGear(hoverGearData)}
			tooltipVersion={settingsStore.tooltipVersion}
			tooltip1Options={settingsStore.tooltip1Options}
			tooltip2Options={settingsStore.tooltip2Options}
		/>
	</FollowCursor>
{/if}

<!-- 터치 장치에서는 클릭 팝업 표시 -->
{#if popupGearData && popupSeq && !pointerDetection.isPointerFine}
	<GearDialog
		gear={new ReadonlyGear(popupGearData)}
		bind:open={showPopup}
		onAccept={() => goto(`/gear/${popupSeq}`)}
	/>
{/if}

<BackupDialogContent bind:open={openBackupDialog} />
