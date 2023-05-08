<script lang="ts">
	import {
		BonusStatType,
		Gear,
		addBonusStat,
		getBonusStatValue,
		resetBonusStat,
		type BonusStatGrade
	} from '@malib/gear';
	import { Button, Column, Row, Select, SelectItem } from 'carbon-components-svelte';
	import type { GearMeta } from '../../../routes/gear-store';
	import { canBonus, getBonusGrades, getBonusTypes } from '../domains/bonus-stat';
	import { resultOrFalse } from '../domains/util';
	import { getName } from '../strings';

	export let can = false;

	export let gear: Gear | undefined;
	export let meta: GearMeta | undefined;
	export let resetMeta: () => void;

	$: can = resultOrFalse(canBonus, gear);

	$: statTypes = gear ? getBonusTypes(gear) : [];

	function onSelectChange() {
		if (!gear || !meta) return;

		resetBonusStat(gear);
		for (const bonus of meta.bonus) {
			if (bonus.type !== -1 && bonus.grade > 0) {
				addBonusStat(gear, bonus.type, bonus.grade as BonusStatGrade);
			}
		}
		gear = gear;
	}

	function reset() {
		if (!gear || !meta) return;

		resetMeta();
		resetBonusStat(gear);
		gear = gear;
	}

	function getValueGradeString(type: BonusStatType, grade: BonusStatGrade) {
		if (!gear || !meta) return '';

		const plus = type === BonusStatType.reduceReq ? '-' : '+';
		let percent = '';
		switch (type) {
			case BonusStatType.damR:
			case BonusStatType.bdR:
			case BonusStatType.allStatR:
				percent = '%';
				break;
		}
		return `${plus}${getBonusStatValue(gear, type, grade)}${percent} (${grade}등급)`;
	}
</script>

<div class="bonus">
	{#if can && gear && meta}
		<div class="bonus__reset">
			<Row>
				<Column>
					<Button kind="danger" on:click={reset}>초기화</Button>
				</Column>
			</Row>
		</div>
		<div class="bonus__options">
			{#each meta.bonus as bonus, i}
				<Row>
					<Column>
						<Select
							labelText={i === 0 ? '종류' : ''}
							bind:selected={bonus.type}
							on:change={() => {
								bonus.grade = 0;
								onSelectChange();
							}}
						>
							<SelectItem value={-1} text="---" />
							{#each statTypes as type}
								<SelectItem value={type} text={getName(type)} />
							{/each}
						</Select>
					</Column>
					<Column>
						<Select
							labelText={i === 0 ? '등급' : ''}
							bind:selected={bonus.grade}
							on:change={onSelectChange}
						>
							<SelectItem value={0} text="---" />
							{#if bonus.type !== -1}
								{#each getBonusGrades(gear) as grade}
									<SelectItem value={grade} text={getValueGradeString(bonus.type, grade)} />
								{/each}
							{/if}
						</Select>
					</Column>
				</Row>
			{/each}
		</div>
	{:else}
		<div class="bonus__cannot">추가옵션 설정 불가</div>
	{/if}
</div>

<style>
	.bonus {
		margin-top: var(--cds-spacing-05);
	}

	.bonus__options {
		margin-top: var(--cds-spacing-05);
	}
</style>
