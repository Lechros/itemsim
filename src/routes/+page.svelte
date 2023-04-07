<script lang="ts">
	import GearTooltip from '$lib/gear-tooltip/GearTooltip.svelte';
	import { createGearFromId } from '@malib/create-gear';
	import type { Gear } from '@malib/gear';
	import {
		Button,
		ClickableTile,
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
	import BonusStat from './BonusStat.svelte';
	import Enhance from './Enhance.svelte';
	import ImportGear from './ImportGear.svelte';
	import InvSlot from './InvSlotContent.svelte';
	import Manage from './Manage.svelte';
	import Potentials from './Potentials.svelte';
	import Upgrade from './Upgrade.svelte';
	import { gear, inventory, selected } from './gear-store';

	const TRANSLATION_DURATION = 240;

	/* inventory */
	$: gearCount = $inventory.reduce((count, slot) => (slot.gear ? count + 1 : count), 0);

	function addToInv(gear: Gear) {
		for (let i = 0; i < $inventory.length; i++) {
			if ($inventory[i].gear === undefined) {
				$inventory[i].gear = gear;
				return true;
			}
		}
		return false;
	}

	/* inventory: upload */
	let importGear: ImportGear;
	let importOpen = false;
	let strGear: Gear | null;
	let uploadGears: Map<string, Gear> = new Map();

	function canUpload(gear: Gear | null, gears: Map<string, Gear>) {
		return gear || gears.size > 0;
	}

	function getUploadMessage(gear: Gear | null, gears: Map<string, Gear>) {
		if (gear) {
			return `'${gear.name}' 추가`;
		} else if (gears.size > 0) {
			if (gears.size > 1) {
				return `아이템 ${gears.size}개 추가`;
			} else {
				return `'${gears.values().next().value.name}' 추가`;
			}
		} else {
			return `아이템이 없습니다`;
		}
	}

	/* inventory: add */
	let addGear: AddGear;
	let addOpen = false;
	let addIds: Map<string, string> = new Map();

	function addItems(ids: Map<string, string>) {
		for (const id of ids.keys()) {
			const gear = createGearFromId(Number(id));
			if (!gear) continue;
			addToInv(gear);
		}
	}

	function getAddMessage(ids: Map<string, string>, count: number) {
		if (count > 1) {
			return `선택한 아이템 ${count}개 추가`;
		} else if (count === 1) {
			return `'${ids.values().next().value}' 추가`;
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
			$inventory[idx].gear = undefined;
		}
	}

	/* enchant tooltip */
	let enchantTooltip: HTMLDivElement;
	let display: HTMLDivElement;
	let imageOpen = false;

	/* mouse cursor tooltip */
	let innerWidth = 0,
		innerHeight = 0;
	let cursorTooltip: HTMLDivElement;

	let cursorGear: Gear | undefined;
	$: if ($selected > -1) {
		cursorGear = undefined;
	}

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

<svelte:window bind:innerWidth bind:innerHeight />

<div on:mousemove={handleMousemove}>
	<Content>
		<Grid noGutter style="max-width: 32rem;">
			<Row noGutter>
				<Column>
					<h2>인벤토리</h2>
				</Column>
				<Column>
					<div class="inv-buttons">
						{#if !deleteMode}
							<Button
								kind="secondary"
								icon={Upload}
								iconDescription="가져오기"
								on:click={() => (importOpen = true)}
							/>
							{#if innerWidth > 16 * 26}
								<Button icon={Add} on:click={() => (addOpen = true)}>아이템 추가</Button>
							{:else}
								<Button
									icon={Add}
									iconDescription="아이템 추가"
									on:click={() => (addOpen = true)}
								/>
							{/if}
							<Button
								kind="danger"
								icon={TrashCan}
								iconDescription="삭제"
								disabled={gearCount === 0}
								on:click={() => (deleteMode = true)}
							/>
						{:else}
							{#if innerWidth > 16 * 26}
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
							{:else}
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
							{/if}
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
						{/if}
					</div>
				</Column>
			</Row>
			<Row noGutter>
				<Column>
					<div class="inventory">
						{#each $inventory as slot, i}
							{#if !deleteMode}
								<ClickableTile
									href=""
									disabled={!slot.gear}
									on:click={() => {
										if (slot.gear) $selected = i;
									}}
									on:mouseenter={() => setCursorGear(slot.gear)}
									on:mouseleave={() => setCursorGear(undefined)}
									style="min-width: 0;"
								>
									<InvSlot _slot={slot} />
								</ClickableTile>
							{:else}
								<SelectableTile
									href=""
									disabled={!slot.gear}
									selected={toDelete.has(i)}
									on:select={() => {
										toDelete.add(i);
										toDelete = toDelete;
									}}
									on:deselect={() => {
										toDelete.delete(i);
										toDelete = toDelete;
									}}
									on:mouseenter={() => setCursorGear(slot.gear)}
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
			addToInv(strGear);
		} else if (uploadGears.size > 0) {
			for (const gear of uploadGears.values()) {
				addToInv(gear);
			}
		}
		importOpen = false;
		setTimeout(importGear.reset, TRANSLATION_DURATION);
	}}
	on:close={() => {
		setTimeout(importGear.reset, TRANSLATION_DURATION);
	}}
>
	<ImportGear bind:strGear bind:fileGears={uploadGears} bind:this={importGear} />
</Modal>

<!-- add modal -->
<ComposedModal
	bind:open={addOpen}
	size="sm"
	selectorPrimaryFocus="input"
	on:submit={() => {
		addItems(addIds);
		addOpen = false;
		setTimeout(() => {
			addGear.resetSearchValue();
			addGear.resetIds();
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
				addGear.resetIds();
			}, TRANSLATION_DURATION);
		}}
	/>
</ComposedModal>

<!-- enchant modal -->
<ComposedModal
	open={$selected > -1}
	selectorPrimaryFocus="ul"
	on:close={() => ($selected = -1)}
>
	<ModalHeader title="아이템 강화" />
	<ModalBody hasForm hasScrollingContent tabindex={-1}>
		{#if $gear && $gear.itemID > 0}
			<div class="enchant">
				<div class="tooltip-wrapper">
					<GearTooltip gear={$gear} bind:ref={enchantTooltip} />
				</div>
				<div>
					<Tabs autoWidth>
						<Tab>추가옵션</Tab>
						<Tab>주문서</Tab>
						<Tab>강화</Tab>
						<Tab>잠재옵션</Tab>
						<Tab>관리</Tab>
						<svelte:fragment slot="content">
							<TabContent>
								<BonusStat />
							</TabContent>
							<TabContent>
								<Upgrade />
							</TabContent>
							<TabContent>
								<Enhance />
							</TabContent>
							<TabContent>
								<Potentials />
							</TabContent>
							<TabContent>
								<Manage
									bind:tooltipRef={enchantTooltip}
									bind:display
									on:delete={() => {
										$inventory[$selected].gear = undefined;
										$selected = -1;
									}}
								/>
							</TabContent>
						</svelte:fragment>
					</Tabs>
				</div>
			</div>
		{/if}
	</ModalBody>
	<ModalFooter />
</ComposedModal>

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

	.cursor-tooltip {
		position: fixed;
		pointer-events: none;
	}

	@media (hover: none) {
		.cursor-tooltip {
			display: none;
		}
	}

	.enchant {
		display: grid;
		grid-template-columns: 261px 1fr;
		gap: var(--cds-spacing-05);
	}

	@media (max-width: 50rem) {
		.enchant {
			display: flex;
			flex-direction: column;
		}

		.enchant > .tooltip-wrapper {
			align-self: center;
		}
	}
</style>
