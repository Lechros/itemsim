<script lang="ts">
	import { GearTooltip } from '$lib/entities/gear-tooltip2';
	import {
		deleteGearData,
		GearInventoryGrid,
		GearInventoryGridItem,
		GearInventoryGridItemContent,
		useGearDataCount,
		useGearQuery,
		type GearQuerySortTypes
	} from '$lib/features/gear-inventory';
	import GearInventoryGridDeleteItem from '$lib/features/gear-inventory/ui/GridDeleteItem.svelte';
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
	import { FollowCursor } from '$lib/shared/ui';
	import { MainNavbar } from '$lib/widgets/main-navbar';
	import { ReadonlyGear } from '@malib/gear';
	import { Trash2 } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';
	import { SvelteSet } from 'svelte/reactivity';
	import LayoutButton from './LayoutButton.svelte';
	import SortButton from './SortButton.svelte';

	let nameFilter = $state('');

	let sort = $state<GearQuerySortTypes>('createdAtDesc');
	let layout = $state<'grid' | 'list'>('grid');
	let columns = $state<number | 'auto'>('auto');

	const count = $derived(useGearDataCount());
	const rows = $derived(useGearQuery({ filter: { name: nameFilter }, sort }));

	const selectedSeqs = $state(new SvelteSet<number>());
	let isDeleteMode = $state(false);
	let openDeleteDialog = $state(false);

	let hoverIndex = $state(-1);

	function toggleDeleteMode() {
		isDeleteMode = !isDeleteMode;
		selectedSeqs.clear();
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
</script>

<GearInventoryGrid
	class="h-screen"
	items={$rows ?? []}
	maxColumns={columns === 'auto' ? undefined : columns}
	loading={$rows === undefined}
>
	{#snippet renderFixedHeader()}
		<MainNavbar />
		<div class="mx-auto flex w-full max-w-screen-md flex-col gap-y-2 px-2 pt-4 min-[450px]:px-4">
			<div class="flex items-center justify-between gap-x-2">
				<div>
					아이템 <span class="font-bold">{$count}</span>개
				</div>
				<div class="flex items-center gap-x-2">
					{#if !isDeleteMode}
						<Button variant="outline" onclick={toggleDeleteMode}>삭제</Button>
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
				<Alert variant="destructive" class="mt-2">
					<Trash2 />
					<AlertTitle>삭제할 아이템을 선택해 주세요.</AlertTitle>
				</Alert>
			{/if}
		</div>
	{/snippet}
	{#snippet renderItem(row, index)}
		{#if isDeleteMode}
			<GearInventoryGridDeleteItem
				selected={selectedSeqs.has(row.seq)}
				onclick={() =>
					selectedSeqs.has(row.seq) ? selectedSeqs.delete(row.seq) : selectedSeqs.add(row.seq)}
			>
				<GearInventoryGridItemContent gearData={row.gear} scale={2} />
			</GearInventoryGridDeleteItem>
		{:else}
			<GearInventoryGridItem
				href="/gear/{row.seq}"
				onmouseenter={() => (hoverIndex = index)}
				onmouseleave={() => (hoverIndex = -1)}
			>
				<GearInventoryGridItemContent gearData={row.gear} scale={2} />
			</GearInventoryGridItem>
		{/if}
	{/snippet}
</GearInventoryGrid>

{#if hoverIndex !== -1}
	<FollowCursor>
		<GearTooltip
			gear={new ReadonlyGear($rows[hoverIndex].gear)}
			incline={{ combat: 0 }}
			loadSetItemName={() => ''}
			loadExclusiveEquips={() => []}
		/>
	</FollowCursor>
{/if}
