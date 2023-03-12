<script lang="ts">
	import type { Gear, GearOption } from '@malib/gear';
	import { parseColorString } from '../graphics';
	import { getGearOptionString } from '../strings';

	export let gear: Gear;

	$: options = gear.options

	const colorClass = {
		c: 'orange',
		$: 'blue',
		g: 'green',
		r: 'red'
	};

	function getSortedOptions(gear: Gear) {
		return [...gear.options].sort((a, b) => a[0] - b[0]);
	}
</script>

{#each getSortedOptions(gear) as kv}
	<div class="text">
		{@html parseColorString(getGearOptionString(kv[0], kv[1]), colorClass)}
	</div>
{/each}
<div class="orange blue green red" />

<style>
	.text {
		line-height: 15px;
		font-size: 11px;
		font-family: 돋움;
		color: var(--gear-white);
	}

	.text :global(.orange) {
		color: var(--gear-orange);
	}
	.text :global(.blue) {
		color: var(--gear-blue);
	}
	.text :global(.green) {
		color: var(--gear-green);
	}
	.text :global(.red) {
		color: var(--gear-red);
	}
</style>
