<script lang="ts">
	import { convertGearOptionToSummaries } from '$lib/components/gear-tooltip/model/strings';
	import type { GearExceptionalOption } from '@malib/gear';

	let { exceptionalOption }: { exceptionalOption: GearExceptionalOption } = $props();
</script>

{#each convertGearOptionToSummaries(exceptionalOption) as summary}
	<div class="gt--detail gt--white">{summary}</div>
{/each}
