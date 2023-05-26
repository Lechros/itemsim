<script lang="ts">
	import type { Gear } from '@malib/gear';
	import { Column, Row, SelectableTile } from 'carbon-components-svelte';
	import InventorySlot from './InventorySlot.svelte';
	import { inventory } from './stores/gear-store';

	export let mode: 'default' | 'remove' = 'default';
	export let isDragging = false;
	export let hoveringGear: Gear | undefined = undefined;
	export let selectedIndexes: Set<number> = new Set();

	export function deselectAll() {
		selectedIndexes.clear();
		selectedIndexes = selectedIndexes;
	}

	export function removeSelected() {
		for (const index of selectedIndexes) {
			inventory.remove(index);
		}
		selectedIndexes.clear();
		selectedIndexes = selectedIndexes;
	}

	let draggingIndex = -1;
	$: {
		isDragging = draggingIndex >= 0;
	}

	function addHoverEffect(target: EventTarget | null) {
		if (!target) return;
		const _target = target as HTMLDivElement;
		if (_target.classList.contains('inventory__slot--drop-zone')) {
			_target.classList.add('inventory__slot--drag-hover');
		}
	}

	function removeHoverEffect(target: EventTarget | null) {
		if (!target) return;
		const _target = target as HTMLDivElement;
		if (_target.classList.contains('inventory__slot--drop-zone')) {
			_target.classList.remove('inventory__slot--drag-hover');
		}
	}
</script>

<div class="inventory">
	<Row>
		<Column>
			<div class="inventory__slots">
				{#if mode === 'default'}
					{#each $inventory as info, i}
						<button
							class="inventory__slot inventory__slot--drop-zone bx--tile bx--tile--selectable"
							class:bx--tile--disabled={!info}
							class:inventory__slot--drag-hover={false}
							disabled={!info}
							draggable="true"
							on:click={() => {
								if (info) inventory.select(i);
							}}
							on:mouseenter={() => (hoveringGear = info?.gear)}
							on:mouseleave={() => (hoveringGear = undefined)}
							on:dragstart={(e) => {
								draggingIndex = i;
								if (e.dataTransfer) {
									e.dataTransfer.effectAllowed = 'move';
								}
							}}
							on:dragend={() => (draggingIndex = -1)}
							on:dragover={(e) => {
								if (draggingIndex !== i) {
									e.preventDefault();
								}
							}}
							on:dragenter={(e) => {
								if (draggingIndex >= 0) {
									addHoverEffect(e.target);
								}
							}}
							on:dragleave={(e) => {
								removeHoverEffect(e.target);
							}}
							on:drop={(e) => {
								removeHoverEffect(e.target);
								if (draggingIndex >= 0) {
									inventory.swap(draggingIndex, i);
									draggingIndex = -1;
								}
							}}
						>
							<InventorySlot {info} />
						</button>
					{/each}
				{:else}
					{#each $inventory as slot, i}
						<SelectableTile
							selected={selectedIndexes.has(i)}
							disabled={!slot}
							on:select={() => {
								selectedIndexes.add(i);
								selectedIndexes = selectedIndexes;
							}}
							on:deselect={() => {
								selectedIndexes.delete(i);
								selectedIndexes = selectedIndexes;
							}}
							on:mouseenter={() => (hoveringGear = slot?.gear)}
							on:mouseleave={() => (hoveringGear = undefined)}
							style="min-width: 0; padding: calc(var(--cds-spacing-05) - 1px);"
						>
							<InventorySlot info={slot} />
						</SelectableTile>
					{/each}
				{/if}
			</div>
		</Column>
	</Row>
</div>

<style>
	.inventory__slots {
		margin-top: var(--cds-spacing-05);
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: var(--cds-spacing-05);
	}

	@media (max-width: 32rem) {
		.inventory__slots {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	.inventory__slot {
		padding: calc(var(--cds-spacing-05) - 1px);
	}

	.inventory__slot--drag-hover {
		background: var(--cds-hover-ui, #e5e5e5);
		outline: 2px solid var(--cds-focus, #0f62fe);
		outline-offset: -2px;
	}
</style>
