<script lang="ts">
	import {
		canApplyScroll,
		doApplyScroll,
		doApplyScrollFull
	} from '$lib/enchant/domains/upgrade/common';
	import { resultOrFalse } from '$lib/enchant/domains/util';
	import { getOnlyScrolls } from '../../domains/upgrade/only-scroll';
	import { optionToStrings } from '../../strings';
	import type { Gear } from '@malib/gear';
	import { ClickableTile, Column, Row } from 'carbon-components-svelte';

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
									on:click={() => (gear = doApplyScroll(gear, scroll))}
									disabled={!can}
								>
									<div class="only-scroll__line-content">
										<div class="only-scroll__icon-wrapper">
											<div
												class="only-scroll__icon"
												style="background-image: url(/images/itemIcon/{scroll.icon}.png);
                                                --width: {scroll.size[0]}px; --height: {scroll.size[1]}px;
                                                --left: {1 - scroll.origin[0]}px; --top: {33 - scroll.origin[1]}px;"
											/>
										</div>
										{scroll.name}
									</div>
								</ClickableTile>
							</div>
							<div class="only-scroll__line-second">
								<ClickableTile
									light
									on:click={() => (gear = doApplyScrollFull(gear, scroll))}
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

    .only-scroll__icon {
        width: var(--width);
        height: var(--height);
        margin-left: var(--left);
        margin-top: var(--top);
    }
</style>
