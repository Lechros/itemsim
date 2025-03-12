<script lang="ts">
	import { getGearOptionString } from '$lib/entities/gear-tooltip/model/strings';
	import type { GearOption } from '@malib/gear';

	let {
		type,
		base,
		add = 0,
		upgrade = 0,
		starforce: star = 0,
		isPercent = false
	}: {
		type: keyof GearOption;
		base: number;
		add?: number;
		upgrade?: number;
		starforce?: number;
		isPercent?: boolean;
	} = $props();

	const sum = $derived(base + add + upgrade + star);
	const p = $derived(isPercent ? '%' : '');
</script>

{#if sum !== 0}
	{#if add > 0 || upgrade + star > 0}
		<div class="gt--detail gt--white">
			<span class="gt--blue">
				{getGearOptionString(type, sum)}
			</span>
			({base}{p}{#if add !== 0}
				<span class="gt--green">{' '}+{add}{p}</span>
			{/if}{#if upgrade !== 0}
				<span class={upgrade > 0 ? 'gt--purple2' : 'gt--red'}>{' '}+{upgrade}{p}</span>
			{/if}{#if star !== 0}
				<span class="gt--orange2">{' '}+{star}{p}</span>
			{/if})
		</div>
	{:else}
		<div class="gt--detail gt--white">
			{getGearOptionString(type, sum)}
		</div>
	{/if}
{/if}
