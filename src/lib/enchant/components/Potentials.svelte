<script lang="ts">
	import { createPotentialFromCode } from '@malib/create-gear';
	import { Gear, Potential, PotentialGrade } from '@malib/gear';
	import { Column, Row, Select, SelectItem, SelectItemGroup } from 'carbon-components-svelte';
	import {
		GearPotentialCache,
		canPotential,
		getDefaultAddPotentialCodes,
		getDefaultPotentialCodes,
		getGearAddPotentialCodes,
		getGearPotentialCodes
	} from '../domains/potential';
	import { resultOrFalse } from '../domains/util';

	export let can = false;

	export let gear: Gear | undefined;

	$: can = resultOrFalse(canPotential, gear);

	$: potentialLevel = gear ? Potential.getPotentialLevel(gear.req.level) : 0;
	let cache: GearPotentialCache | undefined;
	$: {
		cache = GearPotentialCache.getUpdatedInstance(gear, cache);
	}

	let gearCodes = gear ? getGearPotentialCodes(gear) : getDefaultPotentialCodes();
	let gearAddCodes = gear ? getGearAddPotentialCodes(gear) : getDefaultAddPotentialCodes();

	function onGradeChange() {
		if (!gear) return;

		if (gear.grade > PotentialGrade.normal) {
			gear.potentials = [];
		}
		gearCodes = getDefaultPotentialCodes();
	}

	function onOptionChange(index: number) {
		if (!gear) return;

		const potential = createPotentialFromCode(gearCodes[index], potentialLevel);
		if (potential) {
			gear.potentials[index] = potential;
		}
	}

	function onAddGradeChange() {
		if (!gear) return;

		if (gear.additionalGrade > PotentialGrade.normal) {
			gear.additionalPotentials = [];
		}
		gearAddCodes = getDefaultAddPotentialCodes();
	}

	function onAddOptionChange(index: number) {
		if (!gear) return;

		const potential = createPotentialFromCode(gearAddCodes[index], potentialLevel);
		if (potential) {
			gear.additionalPotentials[index] = potential;
		}
	}
</script>

<div class="potentials">
	{#if can && gear && cache}
		<div class="potentials__heading">
			<Row>
				<Column>
					<h4>잠재옵션</h4>
				</Column>
			</Row>
		</div>
		<div class="potentials__grade">
			<Row>
				<Column>
					<Select labelText="등급" bind:selected={gear.grade} on:change={onGradeChange}>
						<SelectItem value={PotentialGrade.normal} text="---" />
						<SelectItem value={PotentialGrade.rare} text="레어" />
						<SelectItem value={PotentialGrade.epic} text="에픽" />
						<SelectItem value={PotentialGrade.unique} text="유니크" />
						<SelectItem value={PotentialGrade.legendary} text="레전드리" />
					</Select>
				</Column>
			</Row>
		</div>
		<div class="potentials__options">
			<Row>
				<Column>
					{#each { length: 3 } as _, i}
						<Select
							labelText={i === 0 ? '옵션' : ''}
							bind:selected={gearCodes[i]}
							on:change={() => onOptionChange(i)}
							disabled={gear.grade === 0}
						>
							<SelectItem value={0} text="---" />
							{#if i === 0}
								{#each cache.getFirstPotentials(gear.grade) as pot}
									<SelectItem value={pot.code} text={pot.convertSummary} />
								{/each}
							{:else}
								{#each cache.getSecondPotentials(gear.grade) as pot}
									<SelectItem value={pot.code} text={pot.convertSummary} />
								{/each}
								<SelectItemGroup label="- 이탈 -" />
								{#each cache.getFirstPotentials(gear.grade) as pot}
									<SelectItem value={pot.code} text={pot.convertSummary} />
								{/each}
							{/if}
						</Select>
					{/each}
				</Column>
			</Row>
		</div>
		<div class="potentials__heading">
			<Row>
				<Column>
					<h4>에디셔널 잠재옵션</h4>
				</Column>
			</Row>
		</div>
		<div class="potentials__grade">
			<Row>
				<Column>
					<Select
						labelText="등급"
						bind:selected={gear.additionalGrade}
						on:change={onAddGradeChange}
					>
						<SelectItem value={PotentialGrade.normal} text="---" />
						<SelectItem value={PotentialGrade.rare} text="레어" />
						<SelectItem value={PotentialGrade.epic} text="에픽" />
						<SelectItem value={PotentialGrade.unique} text="유니크" />
						<SelectItem value={PotentialGrade.legendary} text="레전드리" />
					</Select>
				</Column>
			</Row>
		</div>
		<div class="potentials__options">
			<Row>
				<Column>
					{#each { length: 3 } as _, i}
						<Select
							labelText={i === 0 ? '옵션' : ''}
							bind:selected={gearAddCodes[i]}
							on:change={() => onAddOptionChange(i)}
							disabled={gear.additionalGrade === 0}
						>
							<SelectItem value={0} text="---" />
							{#if i === 0}
								{#each cache.getFirstAddPotentials(gear.additionalGrade) as pot}
									<SelectItem value={pot.code} text={pot.convertSummary} />
								{/each}
							{:else}
								{#each cache.getSecondAddPotentials(gear.additionalGrade) as pot}
									<SelectItem value={pot.code} text={pot.convertSummary} />
								{/each}
								<SelectItemGroup label="- 이탈 -" />
								{#each cache.getFirstAddPotentials(gear.additionalGrade) as pot}
									<SelectItem value={pot.code} text={pot.convertSummary} />
								{/each}
							{/if}
						</Select>
					{/each}
				</Column>
			</Row>
		</div>
	{:else}
		<div class="potential__cannot">잠재능력 설정 불가</div>
	{/if}
</div>

<style>
	.potentials {
		margin-top: var(--cds-spacing-05);
	}

	.potentials__heading:not(:first-child) {
		margin-top: var(--cds-spacing-07);
	}

	.potentials__grade {
		margin-top: var(--cds-spacing-03);
	}

	.potentials__options {
		margin-top: var(--cds-spacing-05);
	}
</style>
