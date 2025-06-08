<script lang="ts">
	import { UIImage2 } from '$lib/shared/ui';
	import type { SoulData, SoulOption } from '@malib/gear';
	import { convertGearOptionToSummaries } from '../../../model/option';
	import Spacer from '../Spacer.svelte';
	import Text from '../text/Text.svelte';

	let {
		enchanted,
		soul
	}: {
		enchanted: boolean;
		soul?: SoulData;
	} = $props();

	function getFirstSoulOptionString(option: Partial<SoulOption>) {
		const summaries = convertGearOptionToSummaries(option);

		return summaries[0];
	}
</script>

{#if enchanted}
	{#if soul}
		<div class="flex items-center">
			<UIImage2 image="soulNormal" />
			<Spacer width={4} />
			<Text value="소울 : {soul.name}" />
		</div>
		<Text value={getFirstSoulOptionString(soul.option)} />
		<Text value="[{soul.skill}] 스킬 사용 가능" />
	{:else}
		<div class="flex items-center">
			<UIImage2 image="soulNormal" />
			<Spacer width={4} />
			<Text value="소울 : 장착된 소울 없음" />
		</div>
	{/if}
{:else}
	<div class="flex items-center">
		<UIImage2 image="soulNormal" />
		<Spacer width={4} />
		<Text value="소울 : 소울 웨폰으로 변환 필요" />
	</div>
{/if}
