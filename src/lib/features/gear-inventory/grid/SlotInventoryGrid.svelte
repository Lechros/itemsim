<script lang="ts">
	import type { SlotLayoutEntry } from '$lib/stores/slot-layout';
	import { moveSlot, setSlot } from '$lib/stores/slot-layout';
	import { extractGearData } from '$lib/stores/gear-inventory';
	import type { GearRow } from '$lib/stores/gear-inventory';
	import GearInventoryGridItemContent from './GridItemContent.svelte';
	import { Button } from '$lib/components/ui/button';
	import { chunk, cn } from '$lib/utils';

	const ITEM_WIDTH = 128;
	const GAP = 0;
	const PADDING = 0;

	let {
		slotLayout,
		slotCount,
		maxColumns,
		scrollRef,
		onItemHover,
		onItemClick
	}: {
		slotLayout: SlotLayoutEntry[];
		slotCount: number;
		maxColumns?: number;
		scrollRef: HTMLElement | null;
		onItemHover?: (gear: import('@malib/gear').GearData | null) => void;
		onItemClick?: (seq: number, gear: import('@malib/gear').GearData) => void;
	} = $props();

	let width = $state<number | null>(null);

	function getGridProps(
		w: number | null,
		maxCols?: number
	): { columnCount: number; maxWidth: number | undefined } {
		if (!w || w < 320) return { columnCount: 2, maxWidth: undefined };
		if (w < 384) return { columnCount: 3, maxWidth: undefined };
		const workableWidth = w - PADDING * 2;
		const count = Math.floor((workableWidth + GAP) / (ITEM_WIDTH + GAP));
		const columnCount = maxCols ? Math.min(maxCols, count) : count;
		const maxWidth = columnCount * ITEM_WIDTH + (columnCount - 1) * GAP + PADDING * 2;
		return { columnCount, maxWidth };
	}

	const { columnCount, maxWidth } = $derived(getGridProps(width, maxColumns));
	const rows = $derived(chunk(slotLayout, columnCount));

	$effect(() => {
		if (typeof ResizeObserver === 'undefined' || !scrollRef) return;
		const observer = new ResizeObserver((entries) => {
			const entry = entries.find((e) => e.target === scrollRef);
			if (entry) {
				width = entry.contentBoxSize[0].inlineSize;
			}
		});
		observer.observe(scrollRef);
		return () => observer.disconnect();
	});

	const DRAG_TYPE = 'application/x-itemsim-slot';

	function handleDragStart(e: DragEvent, entry: SlotLayoutEntry) {
		if (!entry.gearRow) return;
		e.dataTransfer?.setData(DRAG_TYPE, JSON.stringify({ slotIndex: entry.slotIndex, seq: entry.gearRow.seq }));
		e.dataTransfer!.effectAllowed = 'move';
	}

	function handleDragOver(e: DragEvent) {
		e.preventDefault();
		e.dataTransfer!.dropEffect = 'move';
	}

	async function handleDrop(e: DragEvent, targetEntry: SlotLayoutEntry) {
		e.preventDefault();
		const raw = e.dataTransfer?.getData(DRAG_TYPE);
		if (!raw) return;
		let data: { slotIndex: number; seq: number };
		try {
			data = JSON.parse(raw);
		} catch {
			return;
		}
		const { slotIndex: fromIndex, seq } = data;
		const targetIndex = targetEntry.slotIndex;
		if (fromIndex === targetIndex) return;

		if (targetEntry.gearRow) {
			await moveSlot(fromIndex, targetIndex, slotCount);
		} else {
			await setSlot(targetIndex, seq, slotCount);
		}
	}
</script>

<div class="flex h-[calc(100%-110px-56px)] flex-col">
	<div class="flex flex-col">
		{#each rows as row}
			<div class="border-b">
				<div
					class={cn('mx-auto box-content grid', width && width >= 384 && 'border-l')}
					style:grid-template-columns={`repeat(${columnCount}, 1fr)`}
					style:max-width={maxWidth ? `${maxWidth}px` : undefined}
				>
					{#each row as entry (entry.slotIndex)}
						{#if entry.gearRow}
							<Button
								variant="ghost"
								size="icon"
								class="bg-background relative aspect-square size-full cursor-grab rounded-none border-r active:cursor-grabbing"
								draggable="true"
								ondragstart={(e) => handleDragStart(e, entry)}
								ondragover={handleDragOver}
								ondrop={(e) => handleDrop(e, entry)}
								onmouseenter={() => onItemHover?.(extractGearData(entry.gearRow as GearRow))}
								onmouseleave={() => onItemHover?.(null)}
								onclick={() => onItemClick?.(entry.gearRow!.seq, extractGearData(entry.gearRow as GearRow))}
							>
								<GearInventoryGridItemContent gearData={extractGearData(entry.gearRow)} scale={2} />
							</Button>
						{:else}
							<div
								class="bg-muted/30 aspect-square size-full border-r"
								role="region"
								aria-label="빈 슬롯"
								ondragover={handleDragOver}
								ondrop={(e) => handleDrop(e, entry)}
							></div>
						{/if}
					{/each}
					{#if row.length < columnCount}
						{#each Array(columnCount - row.length) as _}
							<div class="border-r"></div>
						{/each}
					{/if}
				</div>
			</div>
		{/each}
	</div>
	<div
		class={cn(
			'mx-auto box-content grid h-full min-h-32 w-full',
			width && width >= 384 && 'border-l'
		)}
		style:grid-template-columns={`repeat(${columnCount}, 1fr)`}
		style:max-width={maxWidth ? `${maxWidth}px` : undefined}
	>
		{#each Array(columnCount) as _}
			<div class="border-r"></div>
		{/each}
	</div>
</div>
