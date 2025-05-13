<script lang="ts">
	import { parseColorString } from '../../model/parser';

	let { raw }: { raw: string } = $props();
</script>

<div class="text">
	{@html parseColorString(raw, { c: 'emphasis', $r: 'red', $g: 'gray' })}
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
	.text :global(.red) {
		color: #ff6633;
	}
	.text :global(.gray) {
		color: #b7bfc5;
	}
</style>
