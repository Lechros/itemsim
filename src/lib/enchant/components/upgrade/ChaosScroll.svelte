<script lang="ts">
	import type { Gear } from '@malib/gear';
	import {
		getChaosScroll,
		getDefaultChaosScrollOption,
		type ChaosScrollOption
	} from '../../domains/upgrade/chaos-scroll';
	import { getPropTypeWeight } from '../../domains/upgrade/chaos-scroll';
	import { Row, Column, NumberInput, Button } from 'carbon-components-svelte';
	import { resultOrFalse } from '../../domains/util';
	import { canApplyScroll, doApplyScroll, doApplyScrollFull } from '../../domains/upgrade/common';

	export let gear: Gear | undefined;

	$: can = resultOrFalse(canApplyScroll, gear);

	const options = getDefaultChaosScrollOption();

	function apply() {
		if (!gear) return;
		gear = doApplyScroll(gear, getChaosScroll(options));
	}

	function applyFull() {
		if (!gear) return;
		gear = doApplyScrollFull(gear, getChaosScroll(options));
	}

	function getChaosStatsName(options: ChaosScrollOption) {
		const total = options.reduce((cnt, stat) => (stat.value !== 0 ? cnt + 1 : cnt), 0);
		if (total === 0) {
			return '적용';
		} else {
			let count = 0;
			let str = '';
			for (const option of options) {
				if (option.value === 0) continue;
				if (count >= 3) {
					str += ', ...';
					break;
				}
				const valueStr = (option.value > 0 ? '+' : '') + option.value;
				if (str !== '') {
					str += ', ';
				}
				str += `${option.name} ${valueStr}`;
				count++;
			}
			return str + ' 적용';
		}
	}
</script>

<div class="chaos-scroll">
	{#if gear}
		<div class="chaos-scroll__values">
			<Row style="row-gap: var(--cds-spacing-05);">
				{#each options as option}
					<Column>
						<NumberInput
							label={option.name}
							bind:value={option.value}
							min={-6 * getPropTypeWeight(option.type)}
							max={6 * getPropTypeWeight(option.type)}
							step={1 * getPropTypeWeight(option.type)}
							invalid={!Number.isInteger(option.value / getPropTypeWeight(option.type))}
							style="min-width: 100px; padding-right: var(--cds-spacing-11);"
						/>
					</Column>
				{/each}
				<!-- Placeholder (12th column) -->
				<Column />
			</Row>
		</div>
		<div class="chaos-scroll__buttons">
			<Row>
				<Column>
					<Button disabled={!can} on:click={apply}>
						{getChaosStatsName(options)}
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
    .chaos-scroll__values {
        margin-top: var(--cds-spacing-05);
    }
    .chaos-scroll__buttons {
        margin-top: var(--cds-spacing-05);
    }
</style>