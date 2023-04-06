<script lang="ts">
	import { GearPropType, PotentialGrade } from '@malib/gear';
	import { getGradeString } from '../strings';

	export let grade: PotentialGrade;
	export let specialGrade: boolean;

	$: grade = specialGrade ? PotentialGrade.special : grade;
</script>

<div class="grade-text">{getGradeString(grade)}</div>

<style>
	.grade-text {
		margin-top: 4px;
		line-height: 15px;
		font-size: 11px;
		letter-spacing: normal;
		font-family: 돋움;
		color: var(--gear-white);
	}
</style>
