<script lang="ts">
	import { GearTooltip } from '$lib/entities/gear-tooltip2';
	import {
		deleteGearData,
		GearInventoryGrid,
		GearInventoryGridDeleteItem,
		GearInventoryGridItem,
		GearInventoryGridItemContent,
		useGearDataCount,
		useGearQuery,
		type GearQuerySortTypes
	} from '$lib/features/gear-inventory';
	import { Alert, AlertTitle } from '$lib/shared/shadcn/components/ui/alert';
	import {
		AlertDialog,
		AlertDialogAction,
		AlertDialogCancel,
		AlertDialogContent,
		AlertDialogDescription,
		AlertDialogFooter,
		AlertDialogHeader,
		AlertDialogTitle,
		AlertDialogTrigger
	} from '$lib/shared/shadcn/components/ui/alert-dialog';
	import { Badge } from '$lib/shared/shadcn/components/ui/badge';
	import { Button, buttonVariants } from '$lib/shared/shadcn/components/ui/button';
	import { Input } from '$lib/shared/shadcn/components/ui/input';
	import { Label } from '$lib/shared/shadcn/components/ui/label';
	import { ScrollArea } from '$lib/shared/shadcn/components/ui/scroll-area';
	import { cn } from '$lib/shared/shadcn/utils';
	import { FollowCursor } from '$lib/shared/ui';
	import { Virtualizer } from '$lib/shared/ui/virtua-custom/svelte';
	import { chunk } from '$lib/shared/utils';
	import { MainNavbar } from '$lib/widgets/main-navbar';
	import { ReadonlyGear, type GearData } from '@malib/gear';
	import { ArrowUp, Loader2, Trash2 } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';
	import { SvelteSet } from 'svelte/reactivity';
	import LayoutButton from './LayoutButton.svelte';
	import SortButton from './SortButton.svelte';

	let nameFilter = $state('');

	let sort = $state<GearQuerySortTypes>('createdAtDesc');
	let layout = $state<'grid' | 'list'>('grid');
	let columns = $state<number | 'auto'>('auto');

	const count = $derived(useGearDataCount());
	const gears = $derived(useGearQuery({ filter: { name: nameFilter }, sort }));

	const selectedSeqs = $state(new SvelteSet<number>());
	let isDeleteMode = $state(false);
	let openDeleteDialog = $state(false);
	let viewportRef = $state<HTMLElement | null>(null);
	let scrollY = $state(0);

	let hoverGearData = $state<GearData | null>(null);

	const NAVBAR_HEIGHT = 56;
	const FLOATING_HEIGHT = 136;
	const DELETE_MODE_DIFF = 62;
	const SCROLL_THRESHOLD = 80;

	function toggleDeleteMode() {
		if (!isDeleteMode) {
			// 진입
			if (scrollY > SCROLL_THRESHOLD) {
				if (viewportRef) {
					viewportRef.scrollTop += DELETE_MODE_DIFF;
				}
			}
		} else {
			// 돌아가기
			if (viewportRef) {
				viewportRef.scrollTop -= DELETE_MODE_DIFF;
			}
			selectedSeqs.clear();
		}
		isDeleteMode = !isDeleteMode;
	}

	async function handleDelete() {
		try {
			await deleteGearData(...selectedSeqs.values());
			const count = selectedSeqs.size;
			openDeleteDialog = false;
			toggleDeleteMode();
			toast.success(`아이템 ${count}개를 삭제했어요.`);
		} catch (error) {
			toast.error('아이템 삭제에 실패했어요.');
		}
	}

	function onscroll(event: Event) {
		const target = event.target as HTMLElement;
		scrollY = target.scrollTop;
	}
</script>

<ScrollArea class="h-screen" bind:viewportRef {onscroll}>
	<MainNavbar />
	<div class="sticky top-14 z-10 mx-auto max-w-screen-md px-4 py-2">
		<div
			class={cn(
				'bg-background/95 flex flex-col gap-y-4 rounded-xl p-4 backdrop-blur',
				scrollY > SCROLL_THRESHOLD && 'shadow-lg'
			)}
		>
			<div class="flex items-center justify-between gap-x-2">
				<div>
					아이템 <span class="font-bold">{$count ?? '...'}</span>개
				</div>
				<div class="flex items-center gap-x-2">
					{#if !isDeleteMode}
						<Button variant="outline" onclick={toggleDeleteMode} disabled={!$gears?.length}
							>삭제</Button
						>
						<Button href="/gear/search">아이템 추가</Button>
					{:else}
						<Badge variant="destructive" class="mr-2">{selectedSeqs.size}개 선택됨</Badge>
						<Button variant="outline" onclick={toggleDeleteMode}>돌아가기</Button>
						<AlertDialog bind:open={openDeleteDialog}>
							<AlertDialogTrigger
								class={buttonVariants({ variant: 'destructive' })}
								disabled={selectedSeqs.size === 0}
							>
								아이템 삭제
							</AlertDialogTrigger>
							<AlertDialogContent>
								<AlertDialogHeader>
									<AlertDialogTitle>아이템 {selectedSeqs.size}개 삭제하기</AlertDialogTitle>
									<AlertDialogDescription>삭제한 아이템은 복구할 수 없어요.</AlertDialogDescription>
								</AlertDialogHeader>
								<AlertDialogFooter>
									<AlertDialogCancel>취소</AlertDialogCancel>
									<AlertDialogAction onclick={handleDelete}>삭제하기</AlertDialogAction>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>
					{/if}
				</div>
			</div>
			<div class="flex items-center justify-between gap-x-2">
				<div class="flex items-center gap-x-2">
					<Label class="whitespace-pre">필터</Label>
					<Input type="search" placeholder="아이템 이름" bind:value={nameFilter} />
					<SortButton bind:sort />
				</div>
				<div>
					<LayoutButton bind:layout bind:columns />
				</div>
			</div>
			{#if isDeleteMode}
				<Alert variant="destructive">
					<Trash2 />
					<AlertTitle>삭제할 아이템을 선택해 주세요.</AlertTitle>
				</Alert>
			{/if}
		</div>
	</div>

	{#if !$gears}
		<div class="flex h-32 items-center justify-center">
			<Loader2 class="size-8 animate-spin" />
		</div>
	{:else if $gears.length > 0}
		<GearInventoryGrid
			items={$gears}
			startMargin={NAVBAR_HEIGHT + FLOATING_HEIGHT}
			scrollRef={viewportRef}
			maxColumns={columns === 'auto' ? undefined : columns}
		>
			{#snippet children(item)}
				{#if isDeleteMode}
					<GearInventoryGridDeleteItem
						selected={selectedSeqs.has(item.seq)}
						onclick={() =>
							selectedSeqs.has(item.seq)
								? selectedSeqs.delete(item.seq)
								: selectedSeqs.add(item.seq)}
					>
						<GearInventoryGridItemContent gearData={item.gear} scale={2} />
					</GearInventoryGridDeleteItem>
				{:else}
					<GearInventoryGridItem
						href="/gear/{item.seq}"
						onmouseenter={() => (hoverGearData = item.gear)}
						onmouseleave={() => (hoverGearData = null)}
					>
						<GearInventoryGridItemContent gearData={item.gear} scale={2} />
					</GearInventoryGridItem>
				{/if}
			{/snippet}
		</GearInventoryGrid>
	{:else if $count === 0}
		<div class="flex h-32 flex-col items-center justify-center gap-y-2">
			<div>인벤토리에 아이템을 추가해 보세요.</div>
			<Button href="/gear/search">아이템 추가</Button>
		</div>
	{:else if nameFilter}
		<div class="flex h-32 flex-col items-center justify-center gap-y-2">
			<div>필터에 해당하는 결과가 없어요.</div>
		</div>
	{/if}
</ScrollArea>

{#if scrollY > SCROLL_THRESHOLD}
	<div class="fixed right-0 bottom-0 z-50 p-8">
		<Button
			variant="outline"
			size="icon"
			class="pointer-events-auto shadow-lg"
			onclick={() => {
				if (viewportRef) {
					viewportRef.scrollTo({ top: 0, behavior: 'smooth' });
				}
			}}
		>
			<ArrowUp />
		</Button>
	</div>
{/if}

{#if hoverGearData}
	<FollowCursor paddingRight={9}>
		<GearTooltip
			gear={new ReadonlyGear(hoverGearData)}
			incline={{ combat: 0 }}
			loadSetItemName={() => ''}
			loadExclusiveEquips={() => []}
		/>
	</FollowCursor>
{/if}
