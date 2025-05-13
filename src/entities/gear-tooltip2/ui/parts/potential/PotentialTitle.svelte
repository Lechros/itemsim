<script lang="ts">
	import { UIImage2 } from '$lib/shared/ui';
	import { GearCapability, PotentialGrade } from '@malib/gear';
	import Spacer from '../Spacer.svelte';
	import Text from '../Text.svelte';

	let {
		can,
		grade,
		label
	}: {
		can: GearCapability;
		grade: PotentialGrade;
		label: string;
	} = $props();

	function getImage(grade: PotentialGrade) {
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

	function getColor(grade: PotentialGrade) {
		switch (grade) {
			case PotentialGrade.Normal:
				return 'darkGray';
			case PotentialGrade.Rare:
				return 'potentialRare';
			case PotentialGrade.Epic:
				return 'potentialEpic';
			case PotentialGrade.Unique:
				return 'potentialUnique';
			case PotentialGrade.Legendary:
				return 'potentialLegendary';
		}
	}

	function getText(grade: PotentialGrade) {
		switch (grade) {
			case PotentialGrade.Normal:
				return '없음';
			case PotentialGrade.Rare:
				return '레어';
			case PotentialGrade.Epic:
				return '에픽';
			case PotentialGrade.Unique:
				return '유니크';
			case PotentialGrade.Legendary:
				return '레전드리';
		}
	}
</script>

<div class="flex items-center">
	{#if can === GearCapability.Cannot}
		<UIImage2 image="potentialTitleNormal" />
		<Spacer width={4} />
		<Text color="darkGray">{label} : 강화 불가</Text>
	{:else}
		<UIImage2 image={getImage(grade)} />
		<Spacer width={4} />
		<Text color={getColor(grade)}>{label} : {getText(grade)}</Text>
		{#if can === GearCapability.Fixed}
			<Spacer width={3} />
			<Text>(추가 강화 불가)</Text>
		{/if}
	{/if}
</div>
