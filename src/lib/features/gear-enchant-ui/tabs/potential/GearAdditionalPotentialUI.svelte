<script lang="ts">
	import { Gear, PotentialGrade, type PotentialData } from '@malib/gear';
	import { getGradeAdditionalPotentialDatas } from './model/potential';
	import GearPotentialUiBase from './components/GearPotentialUIBase.svelte';

	let { gear }: { gear: Gear } = $props();
</script>

<GearPotentialUiBase
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
