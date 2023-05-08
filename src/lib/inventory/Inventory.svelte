<script lang="ts">
	import type { Gear } from '@malib/gear';
	import { Row, Column, SelectableTile } from 'carbon-components-svelte';
	import { inventory } from './stores/gear-store';
	import InventorySlot from './InventorySlot.svelte';

	export let mode: 'default' | 'delete' = 'default';
	export let mousePosition: { x: number; y: number } = { x: 0, y: 0 };
	export let hoveringGear: Gear | undefined = undefined;
	export let dragging = false;
	export let deleteIndexes: Set<number> = new Set();

	export function deselectAll() {
		deleteIndexes.clear();
		deleteIndexes = deleteIndexes;
	}

	export function deleteGears() {
		for(const index of deleteIndexes) {
			inventory.remove(index);
		}
		deleteIndexes.clear();
		deleteIndexes = deleteIndexes;
	}

	let imgs: (HTMLImageElement | undefined)[] = [];
	let draggingIndex = -1;

	$: {
		dragging = draggingIndex >= 0;
	}


	function handleMousemove(event: MouseEvent) {
		mousePosition = { x: event.clientX, y: event.clientY };
	}

	function addHoverEffect(target: EventTarget | null) {
		if (!target) return;
		const _target = target as HTMLDivElement;
		if (_target.classList.contains('inventory__dropzone')) {
			_target.classList.add('inventory__slot--drag-hover');
		}
	}

	function removeHoverEffect(target: EventTarget | null) {
		if (!target) return;
		const _target = target as HTMLDivElement;
		if (_target.classList.contains('inventory__dropzone')) {
			_target.classList.remove('inventory__slot--drag-hover');
		}
	}
</script>

<div
	class="inventory"
	class:inventory__slot--drag-hover={false}
	class:inventory__slot--drag-reject={false}
	on:mousemove={handleMousemove}
>
	<Row>
		<Column>
			<div class="inventory__slots">
				{#if mode === 'default'}
					{#each $inventory as slot, i}
						<button
							class="inventory__slot inventory__dropzone bx--tile bx--tile--selectable"
							class:bx--tile--disabled={!slot}
							disabled={!slot}
							draggable="true"
							on:click={() => {
								if (slot) inventory.select(i);
							}}
							on:mouseenter={() => (hoveringGear = slot?.gear)}
							on:mouseleave={() => (hoveringGear = undefined)}
							on:dragstart={(e) => {
								draggingIndex = i;
								const ref = imgs[i];
								if (e.dataTransfer) {
									e.dataTransfer.effectAllowed = 'move';
									if (ref) e.dataTransfer.setDragImage(ref, 16, 16);
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
							<InventorySlot _slot={slot} bind:img={imgs[i]} />
						</button>
					{/each}
				{:else}
					{#each $inventory as slot, i}
						<SelectableTile
							selected={deleteIndexes.has(i)}
							disabled={!slot}
							on:select={() => {
								deleteIndexes.add(i);
								deleteIndexes = deleteIndexes;
							}}
							on:deselect={() => {
								deleteIndexes.delete(i);
								deleteIndexes = deleteIndexes;
							}}
							on:mouseenter={() => (hoveringGear = slot?.gear)}
							on:mouseleave={() => (hoveringGear = undefined)}
							style="min-width: 0; padding: calc(var(--cds-spacing-05) - 1px);"
						>
							<InventorySlot _slot={slot} />
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
