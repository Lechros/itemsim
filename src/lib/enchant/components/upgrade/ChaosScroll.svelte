<script lang="ts">
	import type { Gear } from '@malib/gear';
	import { Button, Checkbox, Column, NumberInput, Row } from 'carbon-components-svelte';
	import {
		doApplyScrollFullSupplier,
		getChaosScroll,
		getDefaultChaosScrollOption,
		getPropTypeWeight,
		getRandomChaosScroll,
		incredibleChaosScrollOfGoodnessSupplier,
		type ChaosScrollOption
	} from '../../domains/upgrade/chaos-scroll';
	import { canApplyScroll, doApplyScroll } from '../../domains/upgrade/common';
	import { resultOrFalse } from '../../domains/util';

	export let gear: Gear | undefined;

	let randomChaos = false;

	$: can = resultOrFalse(canApplyScroll, gear);

	const options = getDefaultChaosScrollOption();

	function apply() {
		if (!gear) return;
		gear = doApplyScroll(gear, getChaosScrollWithRandom());
	}

	function applyFull() {
		if (!gear) return;
		gear = doApplyScrollFullSupplier(gear, getChaosScrollWithRandom);
	}

	function getChaosScrollWithRandom() {
		return randomChaos
			? getRandomChaosScroll(options, incredibleChaosScrollOfGoodnessSupplier)
			: getChaosScroll(options);
	}

	function getChaosStatsName(options: ChaosScrollOption, randomChaos: boolean) {
		const total = options.reduce((cnt, stat) => (stat.value ? cnt + 1 : cnt), 0);
		if (total === 0) {
			return randomChaos ? '랜덤 적용' : '적용';
		} else {
			let count = 0;
			let str = '';
			for (const option of options) {
				if (!option.value) continue;
				if (count >= 2) {
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
			return str + (randomChaos ? ', 나머지 랜덤 적용' : ' 적용');
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
							allowEmpty
							invalid={!Number.isInteger((option.value ?? 0) / getPropTypeWeight(option.type))}
							style="min-width: 120px; padding-right: var(--cds-spacing-11);"
						/>
					</Column>
				{/each}
				<!-- Placeholder (12th column) -->
				<Column />
			</Row>
		</div>
		<div class="chaos-scroll__options">
			<Row>
				<Column>
					<Checkbox
						labelText="빈 스탯을 임의의 놀긍혼 수치로 적용"
						bind:checked={randomChaos}
					/>
				</Column>
			</Row>
		</div>
		<div class="chaos-scroll__buttons">
			<Row>
				<Column>
					<Button disabled={!can} on:click={apply}>
						{getChaosStatsName(options, randomChaos)}
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

	.chaos-scroll__options {
		margin-top: var(--cds-spacing-05);
	}

	.chaos-scroll__buttons {
		margin-top: var(--cds-spacing-03);
	}
</style>
