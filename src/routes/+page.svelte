<script lang="ts">
	import Enchant from '$lib/enchant/Enchant.svelte';
	import GearTooltip from '$lib/gear-tooltip/GearTooltip.svelte';
	import ImportGear from '$lib/import-gear/ImportGear.svelte';
	import Inventory from '$lib/inventory/Inventory.svelte';
	import { plainToGear, type Gear, type GearLike } from '@malib/gear';
	import {
		Button,
		Column,
		ComposedModal,
		Grid,
		ModalBody,
		ModalFooter,
		ModalHeader,
		Row
	} from 'carbon-components-svelte';
	import Add from 'carbon-icons-svelte/lib/Add.svelte';
	import Close from 'carbon-icons-svelte/lib/Close.svelte';
	import TrashCan from 'carbon-icons-svelte/lib/TrashCan.svelte';
	import Upload from 'carbon-icons-svelte/lib/Upload.svelte';
	import AddGear from '../lib/enchant/components/AddGear.svelte';
	import { gear, inventory, lastAdd, meta, selected } from '../lib/inventory/stores/gear-store';

	const TRANSLATION_DURATION = 240;

	let importOpen = false;

	/* inventory */
	let inventoryMode: 'default' | 'delete' = 'default';
	let deleteIndexes: Set<number> = new Set();
	let deleteSelected: () => void;
	let deselect: () => void;

	$: gearCount = $inventory.reduce((count, slot) => (slot ? count + 1 : count), 0);

	/* inventory: add */
	let addGear: AddGear;
	let addOpen = false;
	let addIds: Map<number, GearLike> = new Map();

	function addItems(ids: Map<number, GearLike>) {
		for (const gearLike of ids.values()) {
			const gear = plainToGear(gearLike);
			if (!gear) continue;
			inventory.add(gear);
		}
		addGear.resetSelected();
	}

	function getAddMessage(ids: Map<number, GearLike>, count: number) {
		if (count > 1) {
			return `선택한 아이템 ${count}개 추가`;
		} else if (count === 1) {
			return `'${ids.values().next().value.n}' 추가`;
		} else {
			return '선택한 아이템이 없습니다';
		}
	}

	let inventoryDragging = false;

	/* mouse hover tooltip */
	let hoverGear: Gear | undefined;
	let hoverTooltip: HTMLDivElement | undefined;
	let pageWidth = 0,
		windowHeight = 0;
	let mousePosition = { x: 0, y: 0 };

	$: hoverTooltipPos = getHoverTooltipPos(
		mousePosition.x,
		mousePosition.y,
		hoverTooltip?.clientWidth ?? 0,
		hoverTooltip?.clientHeight ?? 0,
		pageWidth,
		windowHeight
	);

	function getHoverTooltipPos(
		mouseX: number,
		mouseY: number,
		tooltipWidth: number,
		tooltipHeight: number,
		outerWidth: number,
		outerHeight: number
	) {
		return {
			x: Math.max(0, Math.min(mouseX, outerWidth - tooltipWidth)),
			y: Math.max(0, Math.min(mouseY, outerHeight - tooltipHeight))
		};
	}
</script>

<svelte:window bind:innerHeight={windowHeight} />

<div style="margin-top: 4rem;" bind:clientWidth={pageWidth}>
	<Grid style="max-width: 40rem;">
		<Row>
			<Column>
				<div style="display: flex; align-items: center; height: 100%">
					<h2>인벤토리</h2>
				</div>
			</Column>
			<Column>
				{#if inventoryMode === 'delete'}
					<div class="inv-buttons md">
						<Button
							kind="danger"
							icon={TrashCan}
							disabled={deleteIndexes.size === 0}
							on:click={deleteSelected}
						>
							아이템 {deleteIndexes.size}개 삭제
						</Button>
						<Button
							kind="secondary"
							icon={Close}
							iconDescription="취소"
							on:click={() => {
								inventoryMode = 'default'
								deselect();
							}}
						/>
					</div>
					<div class="inv-buttons sm">
						<Button
							kind="danger"
							icon={TrashCan}
							iconDescription="아이템 삭제"
							disabled={deleteIndexes.size === 0}
							on:click={deleteSelected}
						/>
						<Button
							kind="secondary"
							icon={Close}
							iconDescription="취소"
							on:click={() => {
								inventoryMode = 'default'
								deselect();
							}}
						/>
					</div>
				{:else}
					<div class="inv-buttons md">
						<Button
							kind="secondary"
							icon={Upload}
							iconDescription="가져오기"
							on:click={() => (importOpen = true)}
						/>
						<Button icon={Add} on:click={() => (addOpen = true)}>아이템 추가</Button>
						<Button
							kind="danger"
							icon={TrashCan}
							iconDescription="삭제"
							disabled={gearCount === 0}
							on:click={() => (inventoryMode = 'delete')}
						/>
					</div>
					<div class="inv-buttons sm">
						<Button
							kind="secondary"
							icon={Upload}
							iconDescription="가져오기"
							on:click={() => (importOpen = true)}
						/>
						<Button icon={Add} iconDescription="아이템 추가" on:click={() => (addOpen = true)} />
						<Button
							kind="danger"
							icon={TrashCan}
							iconDescription="삭제"
							disabled={gearCount === 0}
							on:click={() => (inventoryMode = 'delete')}
						/>
					</div>
				{/if}
			</Column>
		</Row>
		<Inventory
			bind:mode={inventoryMode}
			bind:mousePosition
			bind:hoveringGear={hoverGear}
			bind:dragging={inventoryDragging}
			bind:deleteIndexes
			bind:deleteGears={deleteSelected}
			bind:deselectAll={deselect}
		/>
	</Grid>
</div>

<ImportGear bind:open={importOpen} addGear={inventory.addSlot} />

<!-- add modal -->
<ComposedModal
	bind:open={addOpen}
	size="sm"
	selectorPrimaryFocus="input"
	on:close={() => {
		setTimeout(() => {
			addGear.resetSearchValue();
			addGear.resetSelected();
		}, TRANSLATION_DURATION);
	}}
	on:submit={() => {
		addItems(addIds);
		addOpen = false;
		if (addIds.size === 1) {
			inventory.select($lastAdd);
		}
		setTimeout(() => {
			addGear.resetSearchValue();
			addGear.resetSelected();
		}, TRANSLATION_DURATION);
	}}
>
	<ModalHeader title="아이템 추가" />
	<ModalBody hasForm hasScrollingContent tabindex={-1}>
		<AddGear bind:selectedIds={addIds} bind:this={addGear} />
	</ModalBody>
	<ModalFooter
		primaryButtonText={getAddMessage(addIds, addIds.size)}
		primaryButtonDisabled={addIds.size === 0}
		secondaryButtonText="취소"
		on:click:button--secondary={() => {
			addOpen = false;
			setTimeout(() => {
				addGear.resetSearchValue();
				addGear.resetSelected();
			}, TRANSLATION_DURATION);
		}}
	/>
</ComposedModal>

<Enchant
	bind:gear={$gear}
	bind:meta={$meta}
	deselectGear={inventory.deselect}
	removeGear={() => inventory.remove($selected)}
	resetMeta={meta.reset}
/>

<div
	class="cursor-tooltip"
	style="top: {hoverTooltipPos.y}px; left: {hoverTooltipPos.x}px;"
	bind:this={hoverTooltip}
>
	{#if hoverGear && !inventoryDragging}
		<GearTooltip gear={hoverGear} />
	{/if}
</div>

<style>
	.inv-buttons {
		display: flex;
		justify-content: right;
		gap: var(--cds-spacing-03);
	}
	.inv-buttons.sm {
		display: none;
	}
	@media (max-width: 28rem) {
		.inv-buttons.sm {
			display: flex;
		}
		.inv-buttons.md {
			display: none;
		}
	}

	.cursor-tooltip {
		position: fixed;
		pointer-events: none;
	}

	@media (hover: none) {
		.cursor-tooltip {
			display: none;
		}
	}
</style>
