<script lang="ts">
	import GearTooltip from '$lib/gear-tooltip/GearTooltip.svelte';
	import { createGearFromId, gearJson, ItemIndex } from '@malib/create-gear';
	import type { Gear } from '@malib/gear';
	import BonusStat from './BonusStat.svelte';
	import Enhance from './Enhance.svelte';
	import { gear, inventory, selected } from './gear-store';
	import Potentials from './Potentials.svelte';
	import Search from './Search.svelte';
	import Tab from './Tab.svelte';
	import TabList from './TabList.svelte';
	import TabPanel from './TabPanel.svelte';
	import Tabs from './Tabs.svelte';
	import Upgrade from './Upgrade.svelte';

	function addItem(event: CustomEvent) {
		const gear = createGearFromId(Number(event.detail));
		if (!gear) return;
		for (let i = 0; i < $inventory.length; i++) {
			if ($inventory[i] === undefined) {
				$inventory[i] = gear;
				return;
			}
		}
	}

	function deleteItem() {
		$inventory[$selected] = undefined;
		$selected = -1;
	}

	// mouse cursor tooltip
	let cursorGear: Gear | undefined;

	let m = { x: 0, y: 0 };

	$: if ($selected > -1) {
		cursorGear = undefined;
	}

	function handleMousemove(event: MouseEvent) {
		m.x = event.clientX;
		m.y = event.clientY;
	}
</script>

<div class="container" on:mousemove={handleMousemove}>
	{#if $selected > -1}
		<GearTooltip gear={$gear} />
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
	{:else}
		<div>
			<h2>아이템 생성</h2>
			<Search
				on:click={addItem}
				onMouseEnter={(data) => (cursorGear = createGearFromId(Number(data[0])))}
				onMouseLeave={(data) => (cursorGear = undefined)}
			/>
		</div>
		<div>
			<h2>인벤토리</h2>
			<div class="inventory">
				{#each $inventory as item, i}
					<button
						class="cell"
						on:click={() => ($selected = i)}
						on:mouseenter={() => (cursorGear = item)}
						on:mouseleave={() => (cursorGear = undefined)}
						disabled={!item}
					>
						{#if item}
							<img
								src="https://maplestory.io/api/KMS/367/item/{item.icon.id}/icon"
								alt={item.name}
								class="icon"
								style="
								margin-left: {-10 + (1 - item.icon.origin[0]) * 2}px;
								margin-top: {-5 + (33 - item.icon.origin[1]) * 2}px;"
							/>
						{/if}
					</button>
				{/each}
			</div>
		</div>
	{/if}
	<div class="cursor-tooltip" style="top: {m.y}px; left: {m.x}px;">
		{#if cursorGear}
			<GearTooltip gear={cursorGear} />
		{/if}
	</div>
</div>

<style>
	.container {
		position: relative;
		display: flex;
		gap: 1rem;
		justify-content: center;
	}

	.ui {
		width: 30rem;
	}

	.inventory {
		display: grid;
		grid-template-columns: repeat(4, 66px);
		gap: 18px;
	}

	.cell {
		display: flex;
		aspect-ratio: 1/1;
	}

	.icon {
		image-rendering: pixelated;
		scale: 2;
		transform-origin: top left;
	}

	.cursor-tooltip {
		position: absolute;
	}
</style>
