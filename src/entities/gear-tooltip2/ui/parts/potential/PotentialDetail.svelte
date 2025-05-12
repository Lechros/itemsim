<script lang="ts">
	import { UIImage2 } from '$lib/shared/ui';
	import {
		GearCapability,
		PotentialGrade,
		type PotentialData,
		type ReadonlyPotential
	} from '@malib/gear';
	import Text from '../Text.svelte';
	import Spacer from '../Spacer.svelte';

	let { potential }: { potential: PotentialData | ReadonlyPotential } = $props();

	function getImage(grade: PotentialGrade) {
		switch (grade) {
			case PotentialGrade.Normal:
				return 'potentialDetailRare';
			case PotentialGrade.Rare:
				return 'potentialDetailRare';
			case PotentialGrade.Epic:
				return 'potentialDetailEpic';
			case PotentialGrade.Unique:
				return 'potentialDetailUnique';
			case PotentialGrade.Legendary:
				return 'potentialDetailLegendary';
		}
	}
</script>

<div class="flex items-center">
	<UIImage2 image={getImage(potential.grade)} />
	<Spacer width={4} />
	<Text>{potential.summary}</Text>
</div>
