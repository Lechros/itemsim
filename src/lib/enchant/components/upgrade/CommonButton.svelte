<script lang="ts">
	import { Button } from 'carbon-components-svelte';

	export let disabled: boolean;
</script>

<Button kind="secondary" on:click bind:disabled style="padding: 0;">
	<div class="common-button__content">
		<slot />
	</div>
</Button>

<style>
	.common-button__content {
        display: flex;
        flex-direction: column;
		width: 100%;
        padding: var(--cds-spacing-03);
        gaP: var(--cds-spacing-03);
		align-items: center;
        justify-content: center;
		text-align: center;
		word-break: keep-all;
        aspect-ratio: 1 / 1;
	}
    @media(max-width: 32rem) {
        .common-button__content {
            flex-direction: row;
            padding: var(--cds-spacing-04) var(--cds-spacing-05);
            justify-content: start;
            aspect-ratio: unset;
        }
    }
</style>
