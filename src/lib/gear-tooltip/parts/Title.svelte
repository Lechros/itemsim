<script lang="ts">
	import type { getGearNameColor } from '../graphics';

	type GearNameColor = ReturnType<typeof getGearNameColor>;

	export let text: string;
	export let color: GearNameColor;
</script>

<div class="title {color}">
	{text}
</div>

<style>
	.title {
		line-height: 19px;
		font-size: 14px;
		font-family: 돋움;
		font-weight: bold;
		white-space: pre;
	}

	.gray {
		color: var(--gear-gray);
	}
	.orange2 {
		color: var(--gear-orange2);
	}
	.white {
		color: var(--gear-white);
	}
	.blue {
		color: var(--gear-blue);
	}
	.purple {
		color: var(--gear-purple);
	}
	.orange2 {
		color: var(--gear-orange2);
	}
	.green {
		color: var(--gear-green);
	}
	.red {
		color: var(--gear-red);
	}
</style>
