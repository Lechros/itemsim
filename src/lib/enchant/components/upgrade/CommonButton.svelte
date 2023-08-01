<script lang="ts">
	import ItemIcon from '$lib/icon/ItemIcon.svelte';
	import { Button } from 'carbon-components-svelte';

	export let iconId: number;

	export let disabled: boolean;
</script>

<Button kind="secondary" on:click {disabled} style="padding: 0;">
	<div class="common-button__content">
		<div class:icon--disabled={disabled}>
			<ItemIcon iconId={iconId} />
		</div>
		<slot />
	</div>
</Button>

<style>
	.common-button__content {
		display: flex;
		flex-direction: column;
		width: 100%;
		padding: var(--cds-spacing-03);
		gap: var(--cds-spacing-03);
		align-items: center;
		justify-content: center;
		text-align: center;
		word-break: keep-all;
		aspect-ratio: 1 / 1;
	}
	@media (max-width: 32rem) {
		.common-button__content {
			flex-direction: row;
			padding: var(--cds-spacing-04) var(--cds-spacing-05);
			justify-content: start;
			aspect-ratio: unset;
		}
	}
</style>
