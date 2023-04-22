<script lang="ts">
	import { Potential, PotentialGrade } from '@malib/gear';

	export let additional: boolean = false;
	export let grade: PotentialGrade;
	export let potentials: (Potential | null)[];

	function getGradeName(grade: PotentialGrade) {
		switch (grade) {
			case PotentialGrade.rare:
				return 'rare';
			case PotentialGrade.epic:
				return 'epic';
			case PotentialGrade.unique:
				return 'unique';
			case PotentialGrade.legendary:
				return 'legendary';
			default:
				return '';
		}
	}

	function getGradeColor(grade: PotentialGrade) {
		switch (grade) {
			case PotentialGrade.rare:
				return 'blue';
			case PotentialGrade.epic:
				return 'purple';
			case PotentialGrade.unique:
				return 'orange2';
			case PotentialGrade.legendary:
				return 'green';
			default:
				return '';
		}
	}
</script>

<div class="potential__label">
	<span class="{getGradeName(grade)} icon" />
	<span class="gt--text gt--text--{getGradeColor(grade)}">
		{#if additional}
			에디셔널 잠재옵션
		{:else}
			잠재옵션
		{/if}
	</span>
</div>
{#each potentials as potential}
	{#if potential && potential.summary.length > 0}
		<div class="gt--text">
			{#if additional}
				+ {potential.convertSummary}
			{:else}
				{potential.convertSummary}
			{/if}
		</div>
	{/if}
{/each}

<style lang="scss">
	.potential__label {
		display: flex;
	}

	.icon {
		width: 13px;
		height: 13px;
		margin-left: -4px;
		margin-right: 5px;
	}
	.rare.icon {
		background-image: url(../images/potential/rare.png);
	}
	.epic.icon {
		background-image: url(../images/potential/epic.png);
	}
	.unique.icon {
		background-image: url(../images/potential/unique.png);
	}
	.legendary.icon {
		background-image: url(../images/potential/legendary.png);
	}
</style>
