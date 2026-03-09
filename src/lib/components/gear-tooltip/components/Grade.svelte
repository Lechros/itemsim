<script lang="ts">
	import { PotentialGrade } from '@malib/gear';

	let { grade, specialGrade }: { grade: PotentialGrade; specialGrade: boolean } = $props();

	function getGradeString(grade: PotentialGrade, specialGrade: boolean) {
		if (specialGrade) {
			return '(스페셜 아이템)';
		}
		switch (grade) {
			case PotentialGrade.Rare:
				return '(레어 아이템)';
			case PotentialGrade.Epic:
				return '(에픽 아이템)';
			case PotentialGrade.Unique:
				return '(유니크 아이템)';
			case PotentialGrade.Legendary:
				return '(레전드리 아이템)';
			default:
				return '';
		}
	}
</script>

{#if grade !== PotentialGrade.Normal}
	<div class="gt--detail gt--white">
		{getGradeString(grade, specialGrade)}
	</div>
{/if}
