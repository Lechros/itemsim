<script lang="ts">
	import { parseColorString } from '../parser';

	let { raw }: { raw: string } = $props();
</script>

<div class="text">
	{@html parseColorString(raw, { c: 'emphasis' })}
</div>

<style>
	.text {
		white-space: pre-wrap;
		font-family: 'Morris';
		font-size: 12px;
		line-height: 16px;
		color: #ffffff;
	}
	.text :global(.emphasis) {
		color: #ffcc00;
	}
</style>
