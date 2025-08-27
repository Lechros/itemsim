<script lang="ts">
	import { parseColorString } from '../../parser';

	let { description }: { description: string } = $props();
</script>

<div class="gt--detail gt--white">
	{@html parseColorString(description)}
</div>

<style>
	div :global(span)::before,
	div :global(span)::after {
		content: ' ';
	}
</style>
