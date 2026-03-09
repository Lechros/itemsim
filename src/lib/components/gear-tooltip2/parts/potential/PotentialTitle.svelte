<script lang="ts">
	import { UIImage2 } from '$lib/components/ui-image';
	import { GearCapability, PotentialGrade } from '@malib/gear';
	import Spacer from '../Spacer.svelte';
	import DetailText from '../text/DetailText.svelte';

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
		<DetailText color="darkGray" value="{label} : 강화 불가" />
	{:else}
		<UIImage2 image={getImage(grade)} />
		<Spacer width={4} />
		<DetailText color={getColor(grade)} value="{label} : {getText(grade)}" />
		{#if can === GearCapability.Fixed}
			<DetailText value=" (추가 강화 불가)" />
		{/if}
	{/if}
</div>
