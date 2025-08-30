<script lang="ts">
	import { Gear, PotentialGrade, type PotentialData } from '@malib/gear';
	import { getGradeAdditionalPotentialDatas } from '../model/potential';
	import GearEnchanterPotentialBase from './GearEnchanterBasePotential.svelte';

	let { gear }: { gear: Gear } = $props();
</script>

<GearEnchanterPotentialBase
	initialGrade={gear.additionalPotentialGrade}
	initialPotentials={gear.additionalPotentials as PotentialData[]}
	getGradePotentials={(grade) => getGradeAdditionalPotentialDatas(gear, grade)}
	gradeLabel="에디셔널 잠재능력 등급"
	optionLabel="에디셔널 잠재능력 옵션"
	onChange={(grade, potentials) => {
		if (!gear.supportsAdditionalPotential) return;

		if (grade > PotentialGrade.Normal && potentials.length > 0) {
			gear.setAdditionalPotential(grade, potentials);
		} else {
			gear.resetAdditionalPotential();
		}
	}}
/>
