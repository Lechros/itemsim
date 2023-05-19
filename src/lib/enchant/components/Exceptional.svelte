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
	import type { Gear } from '@malib/gear';
	import { Row, Column, ClickableTile, Button } from 'carbon-components-svelte';

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
			{#each exceptionalParts as part}
				<Row>
					<Column>
						<div class="exceptional__line">
							<ClickableTile
								light
								title={optionToStrings(part.option).join('\n')}
								on:click={() => {
									if (gear) {
										gear = doExceptionalEnchant(gear, part);
									}
								}}
								disabled={!canApply}
							>
								<div class="exceptional__line-content">
									<div class="exceptional__icon-wrapper">
										<div
											class="exceptional__icon"
											class:icon--disabled={!canApply}
											style="background-image: url(/images/itemIcon/{part.icon}.png);
													--width: {part.size[0]}px;
													--height: {part.size[1]}px;
													--left: {1 - part.origin[0]}px;
													--top: {33 - part.origin[1]}px;"
										/>
									</div>
									{part.name}
								</div>
							</ClickableTile>
						</div>
					</Column>
				</Row>
			{/each}
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

	.exceptional__line {
		display: flex;
	}

	.exceptional__line:not(:first-child) {
		border-top: 1px solid var(--cds-border-subtle);
	}

	.exceptional__line-content {
		display: flex;
		align-items: center;
	}

	.exceptional__icon-wrapper {
		display: flex;
		height: 1rem;
		align-items: center;
		margin-right: var(--cds-spacing-03);
	}

	.exceptional__icon {
		width: var(--width);
		height: var(--height);
		margin-left: var(--left);
		margin-top: var(--top);
	}

	.exceptional__reset {
		margin-top: var(--cds-spacing-03);
	}
</style>
