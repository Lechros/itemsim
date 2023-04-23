<script lang="ts">
	import { GearPropType, PotentialGrade } from '@malib/gear';
	import { getGradeString } from '../strings';

	export let grade: PotentialGrade;
	export let specialGrade: boolean;

	$: grade = specialGrade ? PotentialGrade.special : grade;
</script>

<div class="gt--text">{getGradeString(grade)}</div>
