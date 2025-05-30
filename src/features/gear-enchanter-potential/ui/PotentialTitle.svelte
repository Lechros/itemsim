<script lang="ts">
	import { UIImage2 } from '$lib/shared/ui';
	import { PotentialGrade } from '@malib/gear';

	let { grade }: { grade: PotentialGrade } = $props();

	function getPotentialTitle(grade: PotentialGrade) {
		switch (grade) {
			case PotentialGrade.Normal:
				return 'potentialTitleNormal';
			case PotentialGrade.Rare:
				return 'potentialTitleRare';
			case PotentialGrade.Epic:
				return 'potentialTitleEpic';
			case PotentialGrade.Unique:
				return 'potentialTitleUnique';
			case PotentialGrade.Legendary:
				return 'potentialTitleLegendary';
		}
	}
</script>

<UIImage2 image={getPotentialTitle(grade)} />
