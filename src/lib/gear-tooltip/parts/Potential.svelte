<script lang="ts">
	import { GearPropType, PotentialGrade, type Gear } from '@malib/gear';

	export let gear: Gear;
	export let additional: boolean = false;

    $: grade = additional ? gear.additionalGrade : gear.grade;
    $: potentials = additional ? gear.additionalPotentials : gear.potentials;

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
</script>

{#if gear.canPotential && potentials.length > 0}
	<slot />
	<div class="text {getGradeName(grade)}">
		<span class="icon" />
		{#if additional}
			에디셔널 잠재옵션
		{:else}
			잠재옵션
		{/if}
	</div>
    {#each potentials as potential}
        <div class="text">
			{#if additional}
				+ {potential.convertSummary}
			{:else}
				{potential.convertSummary}
			{/if}
		</div>
    {/each}
{/if}

<style>
	.text {
		display: flex;
		line-height: 15px;
		font-size: 11px;
		font-family: 돋움;
        color: var(--gear-white);
	}

	.rare {
		color: var(--gear-blue);
	}
	.epic {
		color: var(--gear-purple);
	}
	.unique {
		color: var(--gear-orange2);
	}
	.legendary {
		color: var(--gear-green);
	}

	.icon {
		width: 13px;
		height: 13px;
		margin-left: -4px;
		margin-right: 5px;
	}
	.rare .icon {
		background-image: url(../images/potential/rare.png);
	}
	.epic .icon {
		background-image: url(../images/potential/epic.png);
	}
	.unique .icon {
		background-image: url(../images/potential/unique.png);
	}
	.legendary .icon {
		background-image: url(../images/potential/legendary.png);
	}
</style>
