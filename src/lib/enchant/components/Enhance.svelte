<script lang="ts">
	import type { Gear } from '@malib/gear';
	import { Button, Checkbox, Column, Row } from 'carbon-components-svelte';
	import {
		canAmazingEnhancementChange,
		canEnhance,
		canResetEnhancement,
		canStarforceChange,
		doAmazingEnhancementChange,
		doResetEnhancement,
		doStarforceChange
	} from '../domains/enhance';
	import { resultOrFalse } from '../domains/util';

	export let can = false;

	export let gear: Gear | undefined;

	const diffs = [-10, -1, 1, 10];

	$: can = resultOrFalse(canEnhance, gear);

	$: canReset = resultOrFalse(canResetEnhancement, gear);

	let bonus = true;

	function reset() {
		if (!gear) return;
		gear = doResetEnhancement(gear);
	}

	function getButtonKind(diff: number) {
		if (diff >= 0) return 'tertiary';
		else return 'danger-tertiary';
	}

	function getDiffText(diff: number) {
		if (diff > 0) return `+${diff}`;
		return `${diff}`;
	}
</script>

<div class="enhance">
	{#if can && gear}
		<div class="enhance__heading">
			<Row>
				<Column>
					<h4>스타포스</h4>
				</Column>
			</Row>
		</div>
		<div class="enhance__buttons">
			<Row>
				<Column>
					<div class="enhance__button-wrapper">
						{#each diffs as diff}
							<Button
								kind={getButtonKind(diff)}
								disabled={!canStarforceChange(gear, diff)}
								on:click={() => {
									if (gear) {
										gear = doStarforceChange(gear, diff);
									}
								}}
								style="padding-right: 15px;"
							>
								{getDiffText(diff)}
							</Button>
						{/each}
					</div>
				</Column>
			</Row>
		</div>
		<div class="enhance__heading">
			<Row>
				<Column>
					<h4>놀라운 장비 강화</h4>
				</Column>
			</Row>
		</div>
		<div class="enhance__check">
			<Row>
				<Column>
					<Checkbox labelText="보너스 스탯 적용" bind:checked={bonus} />
				</Column>
			</Row>
		</div>
		<div class="enhance__buttons enhance__buttons--amazing">
			<Row>
				<Column>
					<div class="enhance__button-wrapper">
						{#each diffs as diff}
							<Button
								kind={getButtonKind(diff)}
								disabled={!canAmazingEnhancementChange(gear, diff)}
								on:click={() => {
									if (gear) {
										gear = doAmazingEnhancementChange(gear, diff, bonus);
									}
								}}
								style="padding-right: 15px;"
							>
								{getDiffText(diff)}
							</Button>
						{/each}
					</div>
				</Column>
			</Row>
		</div>
		<div class="enhance__heading">
			<Row>
				<Column>
					<h4>일괄 강화</h4>
				</Column>
			</Row>
		</div>
		<div class="enhance__buttons">
			<Row>
				<Column>
					<div class="enhance__button-wrapper enhance__button-wrapper--vertical">
						<Button
							kind="secondary"
							disabled={gear.star !== 17 && !canStarforceChange(gear, 17 - gear.star)}
							on:click={() => {
								if (gear) {
									gear = doStarforceChange(gear, 17 - gear.star);
								}
							}}
							style="padding-right: 31px;"
						>
							스타포스 17성
						</Button>
						<Button
							kind="secondary"
							disabled={gear.star !== 22 && !canStarforceChange(gear, 22 - gear.star)}
							on:click={() => {
								if (gear) {
									gear = doStarforceChange(gear, 22 - gear.star);
								}
							}}
							style="padding-right: 31px;"
						>
							스타포스 22성
						</Button>
						<Button
							kind="secondary"
							disabled={gear.star !== 12 && !canAmazingEnhancementChange(gear, 12 - gear.star)}
							on:click={() => {
								if (gear) {
									gear = doAmazingEnhancementChange(gear, 12 - gear.star, bonus);
								}
							}}
							style="padding-right: 31px;"
						>
							놀장 12성
						</Button>
					</div>
				</Column>
			</Row>
		</div>
		<div class="enhance__heading">
			<Row>
				<Column>
					<h4>관리</h4>
				</Column>
			</Row>
		</div>
		<div class="enhance__buttons">
			<Row>
				<Column>
					<Button kind="danger" disabled={!canReset} on:click={reset}>초기화</Button>
				</Column>
			</Row>
		</div>
	{:else}
		<div class="enhance__cannot">강화 불가</div>
	{/if}
</div>

<style>
	.enhance {
		margin-top: var(--cds-spacing-05);
	}

	.enhance__heading:not(:first-child) {
		margin-top: var(--cds-spacing-07);
	}

	.enhance__check {
		margin-top: var(--cds-spacing-03);
	}

	.enhance__buttons {
		margin-top: var(--cds-spacing-03);
	}

	.enhance__buttons--amazing {
		margin-top: var(--cds-spacing-03);
	}

	.enhance__button-wrapper {
		display: flex;
		gap: var(--cds-spacing-03);
	}

	@media (max-width: 32rem) {
		.enhance__button-wrapper--vertical {
			flex-direction: column;
			flex-wrap: wrap;
			gap: 0;
		}
	}
</style>
