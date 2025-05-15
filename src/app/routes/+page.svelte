<script lang="ts">
	import GearTooltip from '$lib/entities/gear-tooltip2/ui/GearTooltip.svelte';
	import {
		addGearData,
		deleteGearData,
		updateGearData,
		useGearQuery
	} from '$lib/features/gear-inventory/model/inventory-store';
	import { Gear, type GearData } from '@malib/gear';

	const rows = useGearQuery();

	let seq = $state(0);

	const sample = {
		meta: {
			id: 1152196,
			version: 1
		},
		name: '아케인셰이드 나이트숄더',
		icon: '1152196',
		type: 115,
		req: {
			level: 200,
			job: 1
		},
		attributes: {
			trade: 2,
			cuttable: 2,
			setItemId: 617,
			bossReward: true,
			incline: {
				charm: 200
			},
			canStarforce: 1,
			canScroll: 1,
			canPotential: 1,
			canAdditionalPotential: 1
		},
		baseOption: {
			str: 35,
			dex: 35,
			int: 35,
			luk: 35,
			attackPower: 20,
			magicPower: 20,
			armor: 300
		},
		scrollUpgradeableCount: 2
	} as GearData;

	const other = structuredClone(sample);
	other.name = '앱솔랩스 나이트숄더';
</script>

<button onclick={() => addGearData(sample)}>Add gear</button>
<input type="number" bind:value={seq} />
<button onclick={() => updateGearData(seq, other)}>Update gear</button>
<button onclick={() => deleteGearData(seq)}>Delete gear</button>

<div>
	{#if $rows}
		{#each $rows as row}
			{#if row}
				<div>
					{row.seq}
					{row.gear.name}
				</div>
			{/if}
		{/each}
	{:else}
		<div>Loading...</div>
	{/if}
</div>
