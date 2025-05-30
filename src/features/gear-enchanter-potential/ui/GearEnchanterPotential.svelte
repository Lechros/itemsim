<script lang="ts">
	import { Gear, PotentialGrade, type PotentialData } from '@malib/gear';
	import { getGradePotentialDatas } from '../model/potential';
	import GearEnchanterPotentialBase from './GearEnchanterBasePotential.svelte';

	let { gear }: { gear: Gear } = $props();

	const gradePotentials = $derived(getGradePotentialDatas(gear, gear.potentialGrade));
	const subGradePotentials = $derived(getGradePotentialDatas(gear, gear.potentialGrade - 1));
</script>

<GearEnchanterPotentialBase
	initialGrade={gear.potentialGrade}
	initialPotentials={gear.potentials as PotentialData[]}
	{gradePotentials}
	{subGradePotentials}
	gradeLabel="잠재능력 등급"
	optionLabel="잠재능력 옵션"
	onChange={(grade, potentials) => {
		if (grade === PotentialGrade.Normal) {
			gear.resetPotential();
		} else {
			gear.setPotential(grade, potentials);
		}
	}}
/>
