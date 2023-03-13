<script lang="ts">
	import type { GearOption, GearPropType } from '@malib/gear';
	import { parseColorString } from '../graphics';
	import { getGearOptionString } from '../strings';

	export let type: GearPropType;
	export let option: GearOption;
</script>

<div class="option">
	{@html parseColorString(getGearOptionString(type, option))}
</div>

<style>
	.option {
		line-height: 15px;
		font-size: 11px;
		font-family: 돋움;
		color: var(--gear-white);
	}

	.option :global(.orange) {
		color: var(--gear-orange);
	}
	.option :global(.blue) {
		color: var(--gear-blue);
	}
	.option :global(.green) {
		color: var(--gear-green);
	}
	.option :global(.red) {
		color: var(--gear-red);
	}
</style>
