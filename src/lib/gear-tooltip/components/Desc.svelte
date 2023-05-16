<script lang="ts">
	import { parseColorString } from '../graphics';

	export let text: string;
</script>

<div class="gt--text">
	{@html parseColorString(text)}
</div>

<style>
	.gt--text :global(.gt--text--orange)::before {
		content: ' ';
	}
	.gt--text :global(.gt--text--orange)::after {
		content: ' ';
	}
</style>
