<script lang="ts">
	import { goto } from '$app/navigation';
	import { FollowCursor } from '$lib/components/follow-cursor';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { Button } from '$lib/components/ui/button';
	import * as ButtonGroup from '$lib/components/ui/button-group';
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
		GearInventoryGridItem,
		GearInventoryGridItemContent,
		GearInventoryGridSelectItem
	} from '$lib/features/gear-inventory/grid';
	import {
		createGearCountLiveQuery,
		createGearLiveQuery,
		createSelector
	} from '$lib/features/gear-inventory/header';
	import SortButton from '$lib/features/gear-inventory/header/components/SortButton.svelte';
	import { GearTooltipRenderer } from '$lib/features/gear-tooltip-renderer';
	import { MainNavbar } from '$lib/features/navigation/main-navbar';
	import { ScrollTopButton } from '$lib/features/scroll-top-button';
	import { exportGears } from '$lib/gear/export-helper';
	import { extractGearData, getGearRows, type GearRow } from '$lib/stores/gear-inventory';
	import type { SettingsStore } from '$lib/stores/settings.svelte';
	import { buildDownloadFilename, cn, createPointerDetection } from '$lib/utils';
	import { ReadonlyGear, type GearData } from '@malib/gear';
	import {
		ChevronDownIcon,
		DownloadIcon,
		EllipsisVerticalIcon,
		Folder,
		SearchIcon,
		Trash2Icon,
		XIcon
	} from 'lucide-svelte';
	import { getContext } from 'svelte';
	import { toast } from 'svelte-sonner';

	const gearQuery = createGearLiveQuery();
	const countQuery = createGearCountLiveQuery();
	const selector = createSelector();
	const pointerDetection = createPointerDetection();

	let mode = $state<'default' | 'select'>('default');

	const settingsStore = getContext<SettingsStore>('settingsStore')!;

	let viewportRef = $state<HTMLElement | null>(null);
	let scrollY = $state(0);

	let hoverGearData = $state<GearData | null>(null);
	let popupGearData = $state<GearData | null>(null);
	let popupSeq = $state<number | null>(null);
	let showPopup = $state(false);

	let openBackupDialog = $state(false);
	let deleteConfirmOpen = $state(false);

	$effect(() => {
		gearQuery.value;
		hoverGearData = null;
	});

	function toggleSelectMode() {
		mode = mode === 'select' ? 'default' : 'select';
		selector.clear();
	}

	function runBatchAction() {
		if (selector.isEmpty) {
			toast.info('아이템을 선택해주세요.', { position: 'top-center' });
			return;
		}
		if (settingsStore.batchAction === 'export') handleExportSelected();
		else if (settingsStore.batchAction === 'delete') deleteConfirmOpen = true;
	}

	async function handleExportSelected() {
		if (selector.isEmpty) return;
		try {
			const seqs = Array.from(selector.seqs);
			const results = await getGearRows(seqs);
			const rows = results.filter((r): r is GearRow => r != null);
			if (rows.length === 0) return;
			const bytes = exportGears(rows);
			const blob = new Blob([bytes], { type: 'application/octet-stream' });
			const url = URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = await buildDownloadFilename(bytes, 'simexport');
			a.click();
			URL.revokeObjectURL(url);
			toast.success(`아이템 ${rows.length}개를 내보냈어요.`, { position: 'top-center' });
		} catch (e) {
			toast.error('내보내기에 실패했어요.', {
				description: e instanceof Error ? e.message : String(e),
				position: 'top-center'
			});
		}
	}

	async function handleDeleteSelected() {
		try {
			const count = await selector.deleteSelected();
			toast.success(`아이템 ${count}개가 삭제되었어요.`, { position: 'top-center' });
			deleteConfirmOpen = false;
		} catch (e) {
			toast.error('아이템 삭제에 실패했어요.', {
				description: e instanceof Error ? e.message : String(e),
				position: 'top-center'
			});
		}
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

<ScrollArea class={cn('h-dvh', mode === 'select' && 'bg-muted')} bind:viewportRef {onscroll}>
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
						{:else if mode === 'select'}
							<div>
								선택된 아이템 <span
									class={cn('font-semibold', selector.count === 0 && 'text-muted-foreground')}
									>{selector.count}</span
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
										<Button {...props} variant="outline" size="icon">
											<EllipsisVerticalIcon />
										</Button>
									{/snippet}
								</DropdownMenu.Trigger>
								<DropdownMenu.Content align="end">
									<DropdownMenu.Label>아이템 관리</DropdownMenu.Label>
									<DropdownMenu.Group>
										<DropdownMenu.Item onclick={toggleSelectMode}>일괄 작업</DropdownMenu.Item>
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
							<ButtonGroup.Root>
								<Button
									variant={settingsStore.batchAction === 'delete' ? 'destructive' : 'default'}
									onclick={runBatchAction}
								>
									{#if settingsStore.batchAction === 'export'}
										<DownloadIcon />
										내보내기
									{:else}
										<Trash2Icon />
										삭제하기
									{/if}
								</Button>
								<DropdownMenu.Root>
									<DropdownMenu.Trigger>
										{#snippet child({ props })}
											<Button
												{...props}
												variant={settingsStore.batchAction === 'delete' ? 'destructive' : 'default'}
												aria-label="선택 항목 작업 더보기"
											>
												<ChevronDownIcon />
											</Button>
										{/snippet}
									</DropdownMenu.Trigger>
									<DropdownMenu.Content align="end">
										<DropdownMenu.Group>
											<DropdownMenu.Item onclick={() => (settingsStore.batchAction = 'export')}>
												<DownloadIcon />
												내보내기
											</DropdownMenu.Item>
										</DropdownMenu.Group>
										<DropdownMenu.Separator />
										<DropdownMenu.Group>
											<DropdownMenu.Item
												variant="destructive"
												onclick={() => (settingsStore.batchAction = 'delete')}
											>
												<Trash2Icon />
												삭제하기
											</DropdownMenu.Item>
										</DropdownMenu.Group>
									</DropdownMenu.Content>
								</DropdownMenu.Root>
							</ButtonGroup.Root>
							<Button
								variant="outline"
								size="icon"
								title="일괄 작업 종료"
								onclick={toggleSelectMode}
								disabled={gearQuery.isLoadedAndEmpty}
							>
								<XIcon />
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
					{#if mode === 'select'}
						<GearInventoryGridSelectItem
							selected={selector.has(item.seq)}
							onclick={() =>
								selector.has(item.seq) ? selector.delete(item.seq) : selector.add(item.seq)}
							onmouseenter={() => handleItemHover(extractGearData(item))}
							onmouseleave={() => handleItemHover(null)}
						>
							<GearInventoryGridItemContent gearData={extractGearData(item)} scale={2} />
						</GearInventoryGridSelectItem>
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

<AlertDialog.Root bind:open={deleteConfirmOpen}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>아이템 {selector.count}개를 삭제할까요?</AlertDialog.Title>
			<AlertDialog.Description>삭제된 아이템은 복구할 수 없어요.</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>취소</AlertDialog.Cancel>
			<AlertDialog.Action onclick={handleDeleteSelected}>삭제하기</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>

<BackupDialogContent bind:open={openBackupDialog} />
