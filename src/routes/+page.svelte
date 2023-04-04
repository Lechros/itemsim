<script lang="ts">
	import GearTooltip from '$lib/gear-tooltip/GearTooltip.svelte';
	import { createGearFromId, gearJson, ItemIndex } from '@malib/create-gear';
	import type { Gear } from '@malib/gear';
	import BonusStat from './BonusStat.svelte';
	import Enhance from './Enhance.svelte';
	import { gear, inventory, selected } from './gear-store';
	import Potentials from './Potentials.svelte';
	import Tab from './Tab.svelte';
	import TabList from './TabList.svelte';
	import TabPanel from './TabPanel.svelte';
	import Tabs from './Tabs.svelte';
	import Upgrade from './Upgrade.svelte';
	import 'carbon-components-svelte/css/white.css';
	import { Button, Column, Row, Grid, Content, Modal } from 'carbon-components-svelte';
	import Add from 'carbon-icons-svelte/lib/Add.svelte';
	import InvSlot from './InvSlot.svelte';
	import AddGear from './AddGear.svelte';

	let addGear: AddGear;
	let addOpen = false;
	let addIds: Set<string> = new Set();
	let addCount = 0;

	function addItems(ids: Set<string>) {
		for (const id of ids) {
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

<div on:mousemove={handleMousemove}>
	<Content>
		<Grid noGutter style="max-width: 32rem;">
			<Row noGutter style="margin-bottom: 1rem;">
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
								on:click={() => ($selected = i)}
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

<div class="enchant">
	<Content>
		asdfasdf
	</Content>
</div>

<Modal
	bind:open={addOpen}
	size="sm"
	modalHeading="아이템 추가"
	primaryButtonText={addCount > 0 ? `선택한 ${addCount}개의 아이템 추가` : "선택한 아이템이 없습니다"}
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
>
	<AddGear selectedIds={addIds} bind:count={addCount} bind:this={addGear}/>
</Modal>

<div class="cursor-tooltip" style="top: {m.y}px; left: {m.x}px;">
	{#if cursorGear}
		<GearTooltip gear={cursorGear} />
	{/if}
</div>

<div>
	{#if $selected > -1}
		<div class="ui">
			<Tabs>
				<TabList>
					<Tab>아이템 관리</Tab>
					<Tab>추가옵션</Tab>
					<Tab>주문서</Tab>
					<Tab>강화</Tab>
					<Tab>잠재옵션</Tab>
				</TabList>

				<TabPanel>
					<button on:click={() => ($selected = -1)}>돌아가기</button>
					<button on:click={deleteItem}>삭제</button>
				</TabPanel>
				<TabPanel>
					<BonusStat />
				</TabPanel>
				<TabPanel>
					<Upgrade />
				</TabPanel>
				<TabPanel>
					<Enhance />
				</TabPanel>
				<TabPanel>
					<Potentials />
				</TabPanel>
			</Tabs>
		</div>
	{/if}
</div>

<style>
	.inventory {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 1rem;
	}

	@media (max-width: 32rem) {
		.inventory {
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			gap: 1rem;
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
</style>
