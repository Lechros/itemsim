<script lang="ts">
	import { GearPropType, PotentialGrade, type Gear } from '@malib/gear';
	import { getGradeString } from '../strings';

	export let gear: Gear;

	$: grade = gear.getBooleanValue(GearPropType.specialGrade) ? PotentialGrade.special : gear.grade;
</script>

{#if grade > PotentialGrade.normal}
	<div class="grade-text">{getGradeString(grade)}</div>
{/if}

<style>
	.grade-text {
		margin-top: 4px;
		line-height: 15px;
		font-size: 11px;
		font-family: 돋움;
		color: var(--gear-white);
	}
</style>
