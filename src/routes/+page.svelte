<script lang="ts">
	import GearTooltip from '$lib/gear-tooltip/GearTooltip.svelte';
	import { createGearFromId } from '@malib/create-gear';
	import type { Gear } from '@malib/gear';
	import {
		Button,
		ClickableTile,
		Column,
		Content,
		Grid,
		Modal,
		NumberInput,
		Row,
		SelectableTile,
		Tab,
		TabContent,
		Tabs
	} from 'carbon-components-svelte';
	import 'carbon-components-svelte/css/all.css';
	import '../global.css';
	import { Close, TrashCan } from 'carbon-icons-svelte';
	import Add from 'carbon-icons-svelte/lib/Add.svelte';
	import AddGear from './AddGear.svelte';
	import BonusStat from './BonusStat.svelte';
	import Enhance from './Enhance.svelte';
	import InvSlot from './InvSlotContent.svelte';
	import Manage from './Manage.svelte';
	import Potentials from './Potentials.svelte';
	import Upgrade from './Upgrade.svelte';
	import { gear, inventory, selected } from './gear-store';

	/* theme */
	let theme: 'white' | 'g10' | 'g80' | 'g90' | 'g100';
	theme = 'g10';
	$: if (typeof document !== 'undefined') {
		document.documentElement.setAttribute('theme', theme);
	}

	/* inventory */
	let addGear: AddGear;
	let addOpen = false;
	let addIds: Map<string, string> = new Map();
	let addCount = 0;

	/* inventory: add */
	function addItems(ids: Map<string, string>) {
		for (const id of ids.keys()) {
			const gear = createGearFromId(Number(id));
			if (!gear) continue;
			for (let i = 0; i < $inventory.length; i++) {
				if ($inventory[i].gear === undefined) {
					$inventory[i].gear = gear;
					break;
				}
			}
		}
	}

	function getAddMessage(ids: Map<string, string>, count: number) {
		if (count > 1) {
			return `선택한 ${count}개의 아이템 추가`;
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

	/* modal */
	let innerWidth: number, innerHeight: number;

	$: topPadding = innerWidth > 1056 ? 10 : 5;

	/* mouse cursor tooltip */
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
							{#if innerWidth > 16 * 24}
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
								disabled={!$inventory.some((slot) => slot.gear !== undefined)}
								on:click={() => (deleteMode = true)}
							/>
						{:else}
							{#if innerWidth > 16 * 24}
								<Button
									kind="danger"
									icon={TrashCan}
									disabled={toDelete.size === 0}
									on:click={() => {
										deleteItems();
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

<Modal
	passiveModal
	modalHeading="아이템 강화"
	open={$selected > -1}
	selectorPrimaryFocus="a"
	on:close={() => ($selected = -1)}
	style="align-items: start; padding-top: {topPadding}vh;"
>
	{#if $gear}
		<div class="enchant">
			<div class="tooltip-wrapper">
				<GearTooltip gear={$gear} />
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
							<Manage />
						</TabContent>
					</svelte:fragment>
				</Tabs>
			</div>
		</div>
	{/if}
</Modal>

<Modal
	bind:open={addOpen}
	size="sm"
	modalHeading="아이템 추가"
	primaryButtonText={getAddMessage(addIds, addCount)}
	primaryButtonDisabled={addCount === 0}
	secondaryButtonText="취소"
	selectorPrimaryFocus="input"
	on:click:button--secondary={() => {
		addGear.resetSearchValue();
		addGear.resetIds();
		addOpen = false;
	}}
	on:submit={() => {
		addItems(addIds);
		addGear.resetSearchValue();
		addGear.resetIds();
		addOpen = false;
	}}
	style="align-items: start; padding-top: {topPadding}vh;"
>
	<AddGear selectedIds={addIds} bind:count={addCount} bind:this={addGear} />
</Modal>

<div class="cursor-tooltip" style="top: {m.y}px; left: {m.x}px;" bind:this={cursorTooltip}>
	{#if cursorGear}
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
