<script lang="ts">
	import { optionToStrings } from '$lib/gear-tooltip/strings';
	import type { Gear } from '@malib/gear';
	import { Column, Row } from 'carbon-components-svelte';
	import { canApplyScroll, doApplyScroll, doApplyScrollFull } from '../../domains/upgrade/common';
	import { getOnlyScrolls } from '../../domains/upgrade/only-scroll';
	import { resultOrFalse } from '../../domains/util';
	import ItemIconButton from '../button/ItemIconButton.svelte';
	import ItemIconButtonList from '../button/ItemIconButtonList.svelte';

	export let gear: Gear | undefined;

	export let has: boolean;

	$: can = resultOrFalse(canApplyScroll, gear);

	let onlyScrollGearId = 0;
	let onlyScrolls: ReturnType<typeof getOnlyScrolls> = [];

	$: if (gear && onlyScrollGearId !== gear.itemID) {
		onlyScrollGearId = gear.itemID;
		onlyScrolls = getOnlyScrolls(gear);
	}

	$: {
		has = onlyScrolls.length > 0;
	}
</script>

<div class="only-scroll">
	{#if gear}
		<div class="only-scroll__list">
			<Row>
				<Column>
					<ItemIconButtonList>
						{#each onlyScrolls as scroll}
							<ItemIconButton
								type="double"
								primaryIconId={scroll.icon}
								primaryText={scroll.name}
								primaryTitle={optionToStrings(scroll.option).join('\n')}
								primaryDisabled={!can}
								secondaryText="+{gear.upgradeCountLeft}"
								secondaryDisabled={!can}
								on:click={() => {
									if (gear) {
										gear = doApplyScroll(gear, scroll);
									}
								}}
								on:click:button--secondary={() => {
									if (gear) {
										gear = doApplyScrollFull(gear, scroll);
									}
								}}
							/>
						{/each}
					</ItemIconButtonList>
				</Column>
			</Row>
		</div>
	{/if}
</div>

<style>
	.only-scroll__list {
		margin-top: var(--cds-spacing-05);
	}
</style>
