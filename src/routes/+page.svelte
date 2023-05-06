<script lang="ts">
	import GearTooltip from '$lib/gear-tooltip/GearTooltip.svelte';
	import { plainToGear, type Gear, type GearLike } from '@malib/gear';
	import {
		Button,
		Column,
		ComposedModal,
		Content,
		Grid,
		Modal,
		ModalBody,
		ModalFooter,
		ModalHeader,
		Row,
		SelectableTile,
		Tab,
		TabContent,
		Tabs
	} from 'carbon-components-svelte';
	import Add from 'carbon-icons-svelte/lib/Add.svelte';
	import Close from 'carbon-icons-svelte/lib/Close.svelte';
	import TrashCan from 'carbon-icons-svelte/lib/TrashCan.svelte';
	import Upload from 'carbon-icons-svelte/lib/Upload.svelte';
	import AddGear from './AddGear.svelte';
	import ImportGear from './ImportGear.svelte';
	import InvSlot from './InvSlotContent.svelte';
	import { gear, inventory, lastAdd, selected, type GearSlot } from './gear-store';
	import Enchant from '$lib/enchant/Enchant.svelte';

	const TRANSLATION_DURATION = 240;

	/* inventory */
	$: gearCount = $inventory.reduce((count, slot) => (slot ? count + 1 : count), 0);

	let neverSelected = false;
	$: if (neverSelected) neverSelected = false;

	/* inventory: drag */
	let dragIndex = -1;

	$: if (dragIndex > -1) setCursorGear(undefined);

	let imgRefs: (HTMLImageElement | undefined)[] = [];

	const addHover = (target: EventTarget | null) => {
		if (!target) return;
		const _target = target as HTMLDivElement;
		if (_target.classList.contains('dropzone')) {
			_target.classList.add('inv-draghover');
		}
	};
	const removeHover = (target: EventTarget | null) => {
		if (!target) return;
		const _target = target as HTMLDivElement;
		if (_target.classList.contains('dropzone')) {
			_target.classList.remove('inv-draghover');
		}
	};

	/* inventory: upload */
	let importGear: ImportGear;
	let importOpen = false;
	let strGear: GearSlot | null;
	let uploadGears: Map<string, GearSlot> = new Map();

	function canUpload(slot: GearSlot | null, slots: Map<string, GearSlot>) {
		return slot || slots.size > 0;
	}

	function getUploadMessage(slot: GearSlot | null, slots: Map<string, GearSlot>) {
		if (slot) {
			return `'${slot.gear.name}' 추가`;
		} else if (slots.size > 0) {
			if (slots.size > 1) {
				return `아이템 ${slots.size}개 추가`;
			} else {
				return `'${slots.values().next().value.gear.name}' 추가`;
			}
		} else {
			return `아이템이 없습니다`;
		}
	}

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

	/* inventory: delete */
	let deleteMode = false;
	let toDelete = new Set<number>();
	let lastDeleted = 0;

	function deleteItems() {
		lastDeleted = toDelete.size;
		for (const idx of toDelete) {
			inventory.remove(idx);
		}
	}

	/* mouse cursor tooltip */
	let innerWidth = 0,
		innerHeight = 0;
	let cursorTooltip: HTMLDivElement;

	let cursorGear: Gear | undefined;

	function setCursorGear(gear: Gear | undefined) {
		cursorGear = gear;
	}

	let m = { x: 0, y: 0 };

	function handleMousemove(event: MouseEvent) {
		if (cursorTooltip) {
			m.x = Math.max(0, Math.min(event.clientX, innerWidth - cursorTooltip.clientWidth));
			m.y = Math.max(0, Math.min(event.clientY, innerHeight - cursorTooltip.clientHeight));
		}
	}
</script>

<svelte:window bind:innerHeight />

<div on:mousemove={handleMousemove} bind:clientWidth={innerWidth}>
	<Content>
		<Grid noGutter style="max-width: 32rem;">
			<Row noGutter>
				<Column>
					<h2>인벤토리</h2>
				</Column>
				<Column>
					{#if deleteMode}
						<div class="inv-buttons md">
							<Button
								kind="danger"
								icon={TrashCan}
								disabled={toDelete.size === 0}
								on:click={() => {
									deleteItems();
									if (gearCount === toDelete.size) {
										deleteMode = false;
									}
									toDelete.clear();
									toDelete = toDelete;
								}}
							>
								아이템 {toDelete.size}개 삭제
							</Button>
							<Button
								kind="secondary"
								icon={Close}
								iconDescription="취소"
								on:click={() => {
									deleteMode = false;
									toDelete.clear();
									toDelete = toDelete;
								}}
							/>
						</div>
						<div class="inv-buttons sm">
							<Button
								kind="danger"
								icon={TrashCan}
								iconDescription="아이템 삭제"
								disabled={toDelete.size === 0}
								on:click={() => {
									deleteItems();
									if (gearCount === toDelete.size) {
										deleteMode = false;
									}
									toDelete.clear();
									toDelete = toDelete;
								}}
							/>
							<Button
								kind="secondary"
								icon={Close}
								iconDescription="취소"
								on:click={() => {
									deleteMode = false;
									toDelete.clear();
									toDelete = toDelete;
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
								on:click={() => (deleteMode = true)}
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
								on:click={() => (deleteMode = true)}
							/>
						</div>
					{/if}
				</Column>
			</Row>
			<Row noGutter>
				<Column>
					<div class="inventory">
						{#each $inventory as slot, i}
							{#if !deleteMode}
								<button
									class="dropzone bx--tile bx--tile--selectable"
									class:bx--tile--disabled={!slot}
									disabled={!slot}
									on:click={() => {
										if (slot) inventory.select(i);
									}}
									on:mouseenter={() => setCursorGear(slot?.gear)}
									on:mouseleave={() => setCursorGear(undefined)}
									draggable="true"
									on:dragstart={(e) => {
										dragIndex = i;
										const ref = imgRefs[i];
										if (e.dataTransfer) {
											e.dataTransfer.effectAllowed = 'move';
											if (ref) e.dataTransfer.setDragImage(ref, 16, 16);
										}
									}}
									on:dragend={() => (dragIndex = -1)}
									on:dragover={(e) => {
										if (dragIndex !== i) e.preventDefault();
									}}
									on:dragenter={(e) => {
										addHover(e.target);
										if (dragIndex !== i) e.preventDefault();
									}}
									on:dragleave={(e) => {
										removeHover(e.target);
										e.preventDefault();
									}}
									on:drop={(e) => {
										removeHover(e.target);
										inventory.swap(dragIndex, i);
										dragIndex = -1;
									}}
									style="min-width: 0; padding: calc(var(--cds-spacing-05) - 1px);"
								>
									<InvSlot _slot={slot} bind:imgRef={imgRefs[i]} />
								</button>
							{:else}
								<SelectableTile
									draggable="false"
									disabled={!slot}
									selected={toDelete.has(i)}
									on:select={() => {
										toDelete.add(i);
										toDelete = toDelete;
									}}
									on:deselect={() => {
										toDelete.delete(i);
										toDelete = toDelete;
									}}
									on:mouseenter={() => setCursorGear(slot?.gear)}
									on:mouseleave={() => setCursorGear(undefined)}
									style="min-width: 0; padding: calc(var(--cds-spacing-05) - 1px);"
								>
									<InvSlot _slot={slot} />
								</SelectableTile>
							{/if}
						{/each}
					</div>
				</Column>
			</Row>
		</Grid>
	</Content>
</div>

<!-- upload modal -->
<Modal
	bind:open={importOpen}
	size="sm"
	modalHeading="가져오기"
	primaryButtonText={getUploadMessage(strGear, uploadGears)}
	primaryButtonDisabled={!canUpload(strGear, uploadGears)}
	on:submit={() => {
		if (strGear) {
			inventory.addSlot(strGear);
		} else if (uploadGears.size > 0) {
			for (const gear of uploadGears.values()) {
				inventory.addSlot(gear);
			}
		}
		importOpen = false;
		setTimeout(importGear.reset, TRANSLATION_DURATION);
	}}
	on:close={() => {
		setTimeout(importGear.reset, TRANSLATION_DURATION);
	}}
>
	<ImportGear bind:strGear bind:fileSlots={uploadGears} bind:this={importGear} />
</Modal>

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

<Enchant gear={$gear} deselectGear={inventory.deselect} removeGear={() => inventory.remove($selected)}/>

<!-- image modal -->
<!-- <Modal bind:open={imageOpen} passiveModal size="xs" modalHeading="이미지">
	<div bind:this={display} />
</Modal> -->

<div class="cursor-tooltip" style="top: {m.y}px; left: {m.x}px;" bind:this={cursorTooltip}>
	{#if cursorGear && cursorGear.itemID > 0}
		<GearTooltip gear={cursorGear} />
	{/if}
</div>

<style>
	.inventory {
		margin-top: var(--cds-spacing-05);
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: var(--cds-spacing-05);
	}

	@media (max-width: 32rem) {
		.inventory {
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			gap: var(--cds-spacing-05);
		}
	}

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
