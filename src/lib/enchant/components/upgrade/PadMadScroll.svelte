<script lang="ts">
	import { canApplyScroll, doApplyScroll, doApplyScrollFull } from '../../domains/upgrade/common';
	import { getPadMadScroll } from '../../domains/upgrade/pad-mad-scroll';
	import { resultOrFalse } from '../../domains/util';
	import type { Gear } from '@malib/gear';
	import { Button, Column, Row, Select, SelectItem } from 'carbon-components-svelte';

	const MAX_PAD = 5;

	export let gear: Gear | undefined;

	$: can = resultOrFalse(canApplyScroll, gear);

	let pad = 0;
	let mad = 0;

	function apply() {
		if (!gear) return;
		gear = doApplyScroll(gear, getPadMadScroll(pad, mad));
	}

	function applyFull() {
		if (!gear) return;
		gear = doApplyScrollFull(gear, getPadMadScroll(pad, mad));
	}

	function getPadName(pad: number, mad: number) {
		if (pad > 0 && mad > 0) {
			return `공격력 ${pad}, 마력 ${mad} 적용`;
		} else if (pad > 0) {
			return `공격력 ${pad} 적용`;
		} else if (mad > 0) {
			return `마력 ${mad} 적용`;
		} else {
			return `적용`;
		}
	}
</script>

<div class="pad-mad-scroll">
	{#if gear}
		<div class="pad-mad-scroll__values">
			<Row>
				<Column>
					<Select bind:selected={pad} labelText="공격력">
						{#each { length: MAX_PAD + 1 } as _, i}
							<SelectItem value={i} />
						{/each}
					</Select>
				</Column>
				<Column>
					<Select bind:selected={mad} labelText="마력">
						{#each { length: MAX_PAD + 1 } as _, i}
							<SelectItem value={i} />
						{/each}
					</Select>
				</Column>
			</Row>
		</div>
		<div class="pad-mad-scroll__buttons">
			<Row>
				<Column>
					<Button disabled={!can} on:click={apply}>
						{getPadName(pad, mad)}
					</Button>
					<Button kind="tertiary" disabled={!can} on:click={applyFull}>
						{gear.upgradeCountLeft}회 적용
					</Button>
				</Column>
			</Row>
		</div>
	{/if}
</div>

<style>
	.pad-mad-scroll__values {
		margin-top: var(--cds-spacing-05);
	}

	.pad-mad-scroll__buttons {
		margin-top: var(--cds-spacing-05);
	}
</style>
