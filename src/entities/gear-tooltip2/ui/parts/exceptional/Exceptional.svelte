<script lang="ts">
	import { UIImage2 } from '$lib/shared/ui';
	import type { GearExceptionalOption } from '@malib/gear';
	import { getGearOptionGroupedStrings } from '../../../model/option';
	import Spacer from '../Spacer.svelte';
	import Text from '../text/Text.svelte';

	let {
		upgrade,
		total,
		option
	}: {
		upgrade: number;
		total: number;
		option: GearExceptionalOption;
	} = $props();
</script>

{#if upgrade > 0}
	<div class="flex items-center">
		<UIImage2 image="exceptionalNormal" />
		<Spacer width={4} />
		<Text color="exceptional" value="익셉셔널 : {upgrade}회" />
		<Text value=" (최대 {total}회)" />
	</div>
	{#each getGearOptionGroupedStrings(option) as summary}
		<Text value={summary.join(' ')} />
	{/each}
{:else}
	<div class="flex items-center">
		<UIImage2 image="potentialTitleNormal" />
		<Spacer width={4} />
		<Text color="darkGray" value="익셉셔널 : 없음" />
		<Text color="darkGray" value=" (최대 {total}회)" />
	</div>
{/if}
