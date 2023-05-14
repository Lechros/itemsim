<script lang="ts">
	import Enchant from '$lib/enchant/Enchant.svelte';
	import FollowBoundary from '$lib/follow-cursor/FollowBoundary.svelte';
	import FollowCursor from '$lib/follow-cursor/FollowCursor.svelte';
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
	let inventoryComponent: Inventory;

	let inventoryMode: 'default' | 'delete' = 'default';
	let deleteIndexes: Set<number> = new Set();

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

	// TODO: seperate file for add gear component
	// TODO: follow mouse utility component (with slot)

	let inventoryDragging = false;

	/* mouse hover tooltip */
	let hoverGear: Gear | undefined;
</script>

<Grid style="max-width: 40rem; margin-top: 2rem">
	<Row>
		<Column>
			<div class="top-part">
				<div class="top-part__heading">
					<h2>인벤토리</h2>
				</div>
				<div class="top-part__buttons">
					{#if inventoryMode === 'default'}
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
					{:else if inventoryMode === 'delete'}
						<Button
							kind="danger"
							icon={TrashCan}
							disabled={deleteIndexes.size === 0}
							on:click={inventoryComponent.deleteGears}
						>
							아이템 {deleteIndexes.size}개 삭제
						</Button>
						<Button
							kind="secondary"
							icon={Close}
							iconDescription="취소"
							on:click={() => {
								inventoryMode = 'default';
								inventoryComponent.deselectAll;
							}}
						/>
					{/if}
				</div>
			</div>
		</Column>
	</Row>
	<FollowBoundary>
		<Inventory
			bind:mode={inventoryMode}
			bind:hoveringGear={hoverGear}
			bind:dragging={inventoryDragging}
			bind:deleteIndexes
			bind:this={inventoryComponent}
		/>
	</FollowBoundary>
</Grid>

<FollowCursor bound="viewport">
	{#if hoverGear && !inventoryDragging}
		<GearTooltip gear={hoverGear} />
	{/if}
</FollowCursor>

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

<style>
	.top-part {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	@media (max-width: 28rem) {
		.top-part {
			align-items: normal;
			flex-direction: column;
			gap: var(--cds-spacing-03);
		}
	}

	.top-part__buttons {
		display: flex;
		align-self: flex-end;
		gap: var(--cds-spacing-03);
	}
</style>
