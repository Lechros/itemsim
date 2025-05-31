<script lang="ts">
	import { Gear, PotentialGrade, type PotentialData } from '@malib/gear';
	import { getGradePotentialDatas } from '../model/potential';
	import GearEnchanterPotentialBase from './GearEnchanterBasePotential.svelte';

	let { gear }: { gear: Gear } = $props();
</script>

<GearEnchanterPotentialBase
	initialGrade={gear.potentialGrade}
	initialPotentials={gear.potentials as PotentialData[]}
	getGradePotentials={(grade) => getGradePotentialDatas(gear, grade)}
	gradeLabel="잠재능력 등급"
	optionLabel="잠재능력 옵션"
	onChange={(grade, potentials) => {
		if (!gear.supportsPotential) return;

		if (grade > PotentialGrade.Normal && potentials.length > 0) {
			gear.setPotential(grade, potentials);
		} else {
			gear.resetPotential();
		}
	}}
/>
