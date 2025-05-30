<script lang="ts">
	import { Gear, PotentialGrade, type PotentialData } from '@malib/gear';
	import { getGradeAdditionalPotentialDatas } from '../model/potential';
	import GearEnchanterPotentialBase from './GearEnchanterBasePotential.svelte';

	let { gear }: { gear: Gear } = $props();

	const gradePotentials = $derived(
		getGradeAdditionalPotentialDatas(gear, gear.additionalPotentialGrade)
	);
	const subGradePotentials = $derived(
		getGradeAdditionalPotentialDatas(gear, gear.additionalPotentialGrade - 1)
	);
</script>

<GearEnchanterPotentialBase
	initialGrade={gear.additionalPotentialGrade}
	initialPotentials={gear.additionalPotentials as PotentialData[]}
	{gradePotentials}
	{subGradePotentials}
	gradeLabel="에디셔널 잠재능력 등급"
	optionLabel="에디셔널 잠재능력 옵션"
	onChange={(grade, potentials) => {
		if (grade === PotentialGrade.Normal) {
			gear.resetAdditionalPotential();
		} else {
			gear.setAdditionalPotential(grade, potentials);
		}
	}}
/>
