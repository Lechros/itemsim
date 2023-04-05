<script lang="ts">
	import GearTooltip from '$lib/gear-tooltip/GearTooltip.svelte';
	import { createGearFromId, gearJson, ItemIndex } from '@malib/create-gear';
	import type { Gear } from '@malib/gear';
	import BonusStat from './BonusStat.svelte';
	import Enhance from './Enhance.svelte';
	import { gear, inventory, selected } from './gear-store';
	import Potentials from './Potentials.svelte';
	import Upgrade from './Upgrade.svelte';
	import {
		Button,
		Column,
		Row,
		Grid,
		Content,
		Modal,
		Tab,
		Tabs,
		TabContent
	} from 'carbon-components-svelte';
	import 'carbon-components-svelte/css/all.css';
	import Add from 'carbon-icons-svelte/lib/Add.svelte';
	import InvSlot from './InvSlot.svelte';
	import AddGear from './AddGear.svelte';

	let theme: 'white' | 'g10' | 'g80' | 'g90' | 'g100';
	theme = 'g10';
	$: if(typeof document !== "undefined") {
		document.documentElement.setAttribute('theme', theme);
	}

	let addGear: AddGear;
	let addOpen = false;
	let addIds: Map<string, string> = new Map();
	let addCount = 0;

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

	function deleteItem() {
		$inventory[$selected].gear = undefined;
		$selected = -1;
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

	let innerWidth: number;

	$: topPadding = innerWidth > 1056 ? 10 : 5;

	/* mouse cursor tooltip */
	let cursorGear: Gear | undefined;
	$: if ($selected > -1) {
		cursorGear = undefined;
	}

	function setCursorGear(gear: Gear | undefined) {
		cursorGear = gear;
	}

	let m = { x: 0, y: 0 };
	function handleMousemove(event: MouseEvent) {
		m.x = event.clientX;
		m.y = event.clientY;
	}
</script>

<svelte:window bind:innerWidth />

<div on:mousemove={handleMousemove}>
	<Content>
		<Grid noGutter style="max-width: 32rem;">
			<Row noGutter>
				<Column>
					<h2>인벤토리</h2>
				</Column>
				<Column>
					<div style="display: flex; justify-content: right">
						<Button icon={Add} on:click={() => (addOpen = true)}>아이템 추가</Button>
					</div>
				</Column>
			</Row>
			<Row noGutter>
				<Column>
					<div class="inventory">
						{#each $inventory as slot, i}
							<InvSlot
								on:click={() => {
									if (slot.gear) $selected = i;
								}}
								on:mouseenter={() => setCursorGear(slot.gear)}
								on:mouseleave={() => setCursorGear(undefined)}
								{slot}
							/>
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
			<GearTooltip gear={$gear} />
			<div>
				<Tabs autoWidth>
					<Tab>추가옵션</Tab>
					<Tab>주문서</Tab>
					<Tab>강화</Tab>
					<Tab>잠재옵션</Tab>
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

<div class="cursor-tooltip" style="top: {m.y}px; left: {m.x}px;">
	{#if cursorGear}
		<GearTooltip gear={cursorGear} />
	{/if}
</div>

<style>
	.inventory {
		margin-top: var(--cds-spacing-05);
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: var(--cds-spacing-05)
	}

	@media (max-width: 32rem) {
		.inventory {
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			gap: var(--cds-spacing-05);
		}
	}

	.cursor-tooltip {
		position: absolute;
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
			align-items: center;
		}
	}
</style>
