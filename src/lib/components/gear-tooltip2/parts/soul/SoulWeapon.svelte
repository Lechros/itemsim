<script lang="ts">
	import { UIImage2 } from '$lib/components/ui-image';
	import {
		GearCapability,
		supportsSoulAmplification,
		type ReadonlyGear,
		type SoulOption
	} from '@malib/gear';
	import { getGearOptionGroupedStrings } from '../../model/option';
	import PotentialDetail from '../potential/PotentialDetail.svelte';
	import PotentialTitle from '../potential/PotentialTitle.svelte';
	import Spacer from '../Spacer.svelte';
	import DetailText from '../text/DetailText.svelte';

	let { gear }: { gear: ReadonlyGear } = $props();

	function getSoulOptionString(option: Partial<SoulOption>, baseOption: Partial<SoulOption>) {
		const summaries = getGearOptionGroupedStrings(option);

		return [...summaries, ...getGearOptionGroupedStrings(baseOption)]
			.map((summary) => summary.join(' '))
			.join(', ');
	}
</script>

{#if gear.soulEnchanted}
	{#if gear.soul}
		<div class="flex items-center">
			<UIImage2 image="soulNormal" />
			<Spacer width={4} />
			<DetailText value="소울 : {gear.soul.name}" />
		</div>
		<DetailText value={getSoulOptionString(gear.soul.option, gear.soulBaseOption)} class="-ml-px" />
		<Spacer height={4} />
		{#if gear.soulAmplificationActive}
			<div class="flex items-center">
				<PotentialTitle
					can={GearCapability.Can}
					grade={gear.soulPotentialGrade}
					label="소울 잠재능력"
				/>
				<DetailText value="  (증폭 {gear.soulAmplificationLevel}단계)" />
			</div>
			{#if gear.soulPotentials.length > 0}
				{#each gear.soulPotentials as potential, index (index)}
					<PotentialDetail {potential} />
				{/each}
				<Spacer height={4} />
			{/if}
		{:else if supportsSoulAmplification(gear)}
			<DetailText value="소울 증폭 후 잠재능력 부여 가능" />
		{:else}
			<DetailText value="소울 잠재능력 부여 불가" />
		{/if}
	{:else}
		<div class="flex items-center">
			<UIImage2 image="soulNormal" />
			<Spacer width={4} />
			<DetailText value="소울 : 장착된 소울 없음" />
		</div>
	{/if}
{:else}
	<div class="flex items-center">
		<UIImage2 image="soulNormal" />
		<Spacer width={4} />
		<DetailText value="소울 : 소울 웨폰으로 변환 필요" />
	</div>
{/if}
