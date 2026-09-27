<script lang="ts">
	import { getGearOptionGroupedStrings } from '$lib/utils';
	import type { SoulBaseOption, SoulOption } from '@malib/gear';

	let {
		soulOption: option,
		baseOption
	}: { soulOption?: SoulOption; baseOption: Partial<SoulBaseOption> } = $props();

	function getSoulOptionString(option: SoulOption) {
		return [...getGearOptionGroupedStrings(option), ...getGearOptionGroupedStrings(baseOption)]
			.map((summary) => summary.join(' : '))
			.join(', ');
	}
</script>

{#if option}
	<div class="gt--soul gt--white">{getSoulOptionString(option)}</div>
{/if}
