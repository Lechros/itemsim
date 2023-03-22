<script lang="ts">
	import GearTooltip from '$lib/gear-tooltip/GearTooltip.svelte';
	import { createGearFromId, gearJson, ItemIndex } from '@malib/create-gear';
	import type { Gear } from '@malib/gear';
	import BonusStat from './BonusStat.svelte';
	import Enhance from './Enhance.svelte';
	import Potentials from './Potentials.svelte';
	import Upgrade from './Upgrade.svelte';

	let inventory: (Gear | undefined)[] = Array(32).fill(null);

	let gearIndex = new ItemIndex(gearJson);
	inventory[0] = createGearFromId(gearIndex.getId('아케인셰이드 아처케이프')!);
	inventory[2] = createGearFromId(gearIndex.getId('도미네이터 펜던트')!);
	inventory[3] = createGearFromId(gearIndex.getId('아케인셰이드 보우')!);

	let gear = createGearFromId(gearIndex.getId('에테르넬 아처햇')!)!;
</script>

{#if gear}
	<div class="container">
		<div class="tooltip-area">
			<GearTooltip {gear} />
		</div>
		<div style="width: 261px"> </div>
		<div>
			<h2>추가옵션</h2>
			<BonusStat {gear} on:change={() => (gear = gear)} />
			<h2>주문서</h2>
			<Upgrade {gear} on:change={() => (gear = gear)} />
			<h2>강화</h2>
			<Enhance {gear} on:change={() => (gear = gear)} />
			<h2>잠재옵션</h2>
			<Potentials {gear} on:change={() => (gear = gear)} />
			<div style="height: 90%"> </div>
		</div>
	</div>
{:else}
	<div class="container">
		<div>
			<h2>아이템 생성</h2>
			<label>검색<input></label>
		</div>
		<div>
			<h2>인벤토리</h2>
			<div class="inventory">
				{#each inventory as item}
					<div class="cell">
						{#if item}
							{item.name}
						{/if}
					</div>
				{/each}
			</div>
		</div>
	</div>
{/if}

<style>
	.container {
		display: flex;
		gap: 1rem;
	}

	.inventory {
		display: grid;
		grid-template-columns: repeat(4, 66px);
		gap: 18px;
	}

	.cell {
		border: solid 1px black;
		aspect-ratio: 1/1;
	}

	.tooltip-area {
		position: fixed;
	}
</style>
