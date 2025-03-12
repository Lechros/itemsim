<script lang="ts">
	import { UIImage } from '$lib/shared/ui';
	import { PotentialGrade } from '@malib/gear';

	let { grade, label }: { grade: PotentialGrade; label: string } = $props();

	function getGradeImage(grade: PotentialGrade) {
		switch (grade) {
			case PotentialGrade.Rare:
				return 'potentialIconRare';
			case PotentialGrade.Epic:
				return 'potentialIconEpic';
			case PotentialGrade.Unique:
				return 'potentialIconUnique';
			case PotentialGrade.Legendary:
				return 'potentialIconLegendary';
			default:
				return 'potentialIconNormal';
		}
	}

	function getGradeColor(grade: PotentialGrade) {
		switch (grade) {
			case PotentialGrade.Rare:
				return 'blue';
			case PotentialGrade.Epic:
				return 'purple';
			case PotentialGrade.Unique:
				return 'orange2';
			case PotentialGrade.Legendary:
				return 'green';
			default:
				return '';
		}
	}
</script>

{#if grade !== PotentialGrade.Normal}
	<div class="-ml-1 flex">
		<UIImage image={getGradeImage(grade)} class="mr-[5px]" />
		<span class="gt--detail gt--{getGradeColor(grade)}">{label}</span>
	</div>
{/if}
