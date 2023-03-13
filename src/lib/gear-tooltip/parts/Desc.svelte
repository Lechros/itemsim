<script lang="ts">
	import { parseColorString } from '../graphics';

	export let text: string;
</script>

<div class="text">
    {@html parseColorString(text)}
</div>

<style>
	.text {
		line-height: 15px;
		font-size: 11px;
		font-family: 돋움;
		color: var(--gear-white);
		white-space: pre-wrap;
	}

	.text :global(.orange) {
		color: var(--gear-orange);
	}
    .text :global(.orange)::before {
		content: " ";
	}
    .text :global(.orange)::after {
		content: " ";
	}
</style>
