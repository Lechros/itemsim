<script lang="ts">
	import { convertGearOptionToSummaries } from '../../../model/option';
	import { UIImage2 } from '$lib/shared/ui';
	import type { GearExceptionalOption } from '@malib/gear';
	import Spacer from '../Spacer.svelte';
	import Text from '../Text.svelte';

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
		<Text color="exceptional">익셉셔널 : {upgrade}회</Text>
		<Spacer width={3} />
		<Text>(최대 {total}회)</Text>
	</div>
	{#each convertGearOptionToSummaries(option) as summary}
		<Text>{summary}</Text>
	{/each}
{:else}
	<div class="flex items-center">
		<UIImage2 image="potentialTitleNormal" />
		<Spacer width={4} />
		<Text color="darkGray">익셉셔널 : 없음</Text>
		<Spacer width={3} />
		<Text>(최대 {total}회)</Text>
	</div>
{/if}
