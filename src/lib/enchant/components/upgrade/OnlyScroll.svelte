<script lang="ts">
	import { optionToStrings } from '$lib/gear-tooltip/strings';
	import type { Gear } from '@malib/gear';
	import { ClickableTile, Column, Row } from 'carbon-components-svelte';
	import { canApplyScroll, doApplyScroll, doApplyScrollFull } from '../../domains/upgrade/common';
	import { getOnlyScrolls } from '../../domains/upgrade/only-scroll';
	import { resultOrFalse } from '../../domains/util';
	import ItemIcon from '$lib/icon/ItemIcon.svelte';

	export let gear: Gear | undefined;

	export let has: boolean;

	$: can = resultOrFalse(canApplyScroll, gear);

	let onlyScrollGearId = 0;
	let onlyScrolls: ReturnType<typeof getOnlyScrolls> = [];

	$: {
		if (gear && onlyScrollGearId !== gear.itemID) {
			onlyScrollGearId = gear.itemID;
			onlyScrolls = getOnlyScrolls(gear);
		}
	}

	$: {
		has = onlyScrolls.length > 0;
	}
</script>

<div class="only-scroll">
	{#if gear}
		<div class="only-scroll__list">
			{#each onlyScrolls as scroll}
				<Row>
					<Column>
						<div class="only-scroll__line">
							<div class="only-scroll__line-first">
								<ClickableTile
									light
									title={optionToStrings(scroll.option).join('\n')}
									on:click={() => {
										if (gear) {
											gear = doApplyScroll(gear, scroll);
										}
									}}
									disabled={!can}
								>
									<div class="only-scroll__line-content">
										<div class="only-scroll__icon-wrapper" class:icon--disabled={!can}>
											<ItemIcon iconId={scroll.icon} />
										</div>
										{scroll.name}
									</div>
								</ClickableTile>
							</div>
							<div class="only-scroll__line-second">
								<ClickableTile
									light
									on:click={() => {
										if (gear) {
											gear = doApplyScrollFull(gear, scroll);
										}
									}}
									disabled={!can}
								>
									+{gear.upgradeCountLeft}
								</ClickableTile>
							</div>
						</div>
					</Column>
				</Row>
			{/each}
		</div>
	{/if}
</div>

<style>
	.only-scroll__list {
		margin-top: var(--cds-spacing-05);
	}

	.only-scroll__line {
		display: flex;
	}

	.only-scroll__line:not(:first-child) {
		border-top: 1px solid var(--cds-border-subtle);
	}

	.only-scroll__line-first {
		flex: 3;
	}

	.only-scroll__line-second {
		border-left: 1px solid var(--cds-border-subtle);
		flex: 1;
	}

	.only-scroll__line-content {
		display: flex;
		align-items: center;
	}

	.only-scroll__icon-wrapper {
		display: flex;
		height: 1rem;
		align-items: center;
		margin-right: var(--cds-spacing-03);
	}
</style>
