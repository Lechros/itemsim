<script lang="ts">
	import {
		canExceptional,
		canExceptionalEnchant,
		doExceptionalEnchant,
		getExceptionalParts,
		resetExceptional
	} from '$lib/enchant/domains/exceptional';
	import { resultOrFalse } from '$lib/enchant/domains/util';
	import { optionToStrings } from '$lib/gear-tooltip/strings';
	import ItemIcon from '$lib/icon/ItemIcon.svelte';
	import type { Gear } from '@malib/gear';
	import { Button, ClickableTile, Column, Row } from 'carbon-components-svelte';
	import ItemIconButton from './button/ItemIconButton.svelte';
	import ItemIconButtonList from './button/ItemIconButtonList.svelte';

	export let can = false;

	export let gear: Gear | undefined;

	$: can = resultOrFalse(canExceptional, gear);

	$: canApply = resultOrFalse(canExceptionalEnchant, gear);

	let exceptionalGearid = 0;
	let exceptionalParts: ReturnType<typeof getExceptionalParts> = [];

	$: {
		if (gear && exceptionalGearid !== gear.itemID) {
			exceptionalGearid = gear.itemID;
			exceptionalParts = getExceptionalParts(gear);
		}
	}

	function reset() {
		if (!gear) return;
		gear = resetExceptional(gear);
	}
</script>

<div class="exceptional">
	{#if can && gear}
		<div class="exceptional__heading">
			<Row>
				<Column>
					<h4>익셉셔널 강화</h4>
				</Column>
			</Row>
		</div>
		<div class="exceptional__list">
			<Row>
				<Column>
					<ItemIconButtonList>
						{#each exceptionalParts as part}
							<ItemIconButton
								primaryIconId={part.icon}
								primaryText={part.name}
								primaryDisabled={!canApply}
								primaryTitle={optionToStrings(part.option).join('\n')}
								on:click={() => {
									if (gear) {
										gear = doExceptionalEnchant(gear, part);
									}
								}}
							/>
						{/each}
					</ItemIconButtonList>
				</Column>
			</Row>
		</div>
		<div class="exceptional__heading">
			<Row>
				<Column>
					<h4>관리</h4>
				</Column>
			</Row>
		</div>
		<div class="exceptional__reset">
			<Row>
				<Column>
					<Button kind="danger" on:click={reset}>초기화</Button>
				</Column>
			</Row>
		</div>
	{/if}
</div>

<style>
	.exceptional {
		margin-top: var(--cds-spacing-05);
	}

	.exceptional__heading:not(:first-child) {
		margin-top: var(--cds-spacing-07);
	}

	.exceptional__list {
		margin-top: var(--cds-spacing-03);
	}

	.exceptional__reset {
		margin-top: var(--cds-spacing-03);
	}
</style>
