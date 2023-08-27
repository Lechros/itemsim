<script lang="ts">
	import {
		canApplyScroll,
		doApplyScroll,
		doApplyScrollFull
	} from '$lib/enchant/domains/upgrade/common';
	import { getSpecialScrolls } from '$lib/enchant/domains/upgrade/special-scroll';
	import { resultOrFalse } from '$lib/enchant/domains/util';
	import { optionToStrings } from '$lib/gear-tooltip/strings';
	import type { Gear } from '@malib/gear';
	import { Column, Row } from 'carbon-components-svelte';
	import ItemIconButton from '../button/ItemIconButton.svelte';
	import ItemIconButtonList from '../button/ItemIconButtonList.svelte';

	export let gear: Gear | undefined;

	$: can = resultOrFalse(canApplyScroll, gear);

	$: specialScrolls = gear ? getSpecialScrolls(gear) : [];
</script>

<div class="special-scroll">
	{#if gear}
		<div class="special-scroll__list">
			<Row>
				<Column>
					<ItemIconButtonList>
						{#each specialScrolls as scroll}
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
	.special-scroll__list {
		margin-top: var(--cds-spacing-05);
	}
</style>
