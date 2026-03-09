<script lang="ts">
	import { parseColorString } from '../../model/parser';

	let { description }: { description: string } = $props();
</script>

<div class="gt--detail gt--white">
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html parseColorString(description)}
</div>

<style>
	div :global(span)::before,
	div :global(span)::after {
		content: ' ';
	}
</style>
