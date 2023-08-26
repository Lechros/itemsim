<script lang="ts">
	import ItemIcon from '$lib/icon/ItemIcon.svelte';
	import { ClickableTile } from 'carbon-components-svelte';
	import { createEventDispatcher } from 'svelte';

	export let type: 'single' | 'double' = 'single';
	export let primaryTitle = '';
	export let primaryDisabled = false;
	export let primaryText = '';
	export let primaryIconId: number | undefined = undefined;
	export let secondaryTitle = '';
	export let secondaryDisabled = false;
	export let secondaryText = '';

	const dispatch = createEventDispatcher();

	const handlePrimaryClick = () => {
		dispatch('click');
		dispatch('click:button--primary');
	};
	const handleSecondaryClick = () => dispatch('click:button--secondary');
</script>

<div class="icon-button">
	<div class="icon-button__primary">
		<ClickableTile
			light
			title={primaryTitle}
			on:click={handlePrimaryClick}
			disabled={primaryDisabled}
		>
			<div class="content">
				{#if primaryIconId}
					<div class="icon-wrapper" class:icon--disabled={primaryDisabled}>
						<ItemIcon iconId={primaryIconId} />
					</div>
				{/if}
				{primaryText}
			</div>
		</ClickableTile>
	</div>
	{#if type == 'double'}
		<div class="icon-button__secondary">
			<ClickableTile
				light
				title={secondaryTitle}
				on:click={handleSecondaryClick}
				disabled={secondaryDisabled}
			>
				<div class="content">
					{secondaryText}
				</div>
			</ClickableTile>
		</div>
	{/if}
</div>

<style>
	.icon-button {
		display: flex;
	}

	.icon-button__primary {
		flex: 3;
	}

	.icon-button__secondary {
		border-left: 1px solid var(--cds-border-subtle);
		flex: 1;
	}

	.content {
		display: flex;
		align-items: center;
	}

	.icon-wrapper {
		display: flex;
		height: 1rem;
		align-items: center;
		margin-right: var(--cds-spacing-03);
	}
</style>
