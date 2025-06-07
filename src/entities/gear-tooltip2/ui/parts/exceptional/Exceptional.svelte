<script lang="ts">
	import { UIImage2 } from '$lib/shared/ui';
	import type { GearExceptionalOption } from '@malib/gear';
	import { convertGearOptionToSummaries } from '../../../model/option';
	import Spacer from '../Spacer.svelte';
	import Text from '../Text.svelte';
	import NewText from '../NewText.svelte';

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
		<NewText color="exceptional" value="익셉셔널 : {upgrade}회" />
		<NewText value=" (최대 {total}회)" />
	</div>
	{#each convertGearOptionToSummaries(option) as summary}
		<NewText value={summary} />
	{/each}
{:else}
	<div class="flex items-center">
		<UIImage2 image="potentialTitleNormal" />
		<Spacer width={4} />
		<NewText color="darkGray" value="익셉셔널 : 없음" />
		<NewText color="darkGray" value=" (최대 {total}회)" />
	</div>
{/if}
