<script lang="ts">
	import { getCorrectedGearOptionString } from '$lib/entities/gear-tooltip/model/strings';
	import type { SoulOption } from '@malib/gear';

	let { soulOption: option }: { soulOption?: SoulOption } = $props();

	function getSoulOptionString(option: SoulOption) {
		const [type, value] = Object.entries(option)[0] as [keyof SoulOption, number];

		return getCorrectedGearOptionString(type, value);
	}
</script>

{#if option}
	<div class="gt--soul gt--white">{getSoulOptionString(option)}</div>
{/if}
