<script lang="ts">
	import DetailText from './text/DetailText.svelte';

	let {
		level,
		increase,
		decrease
	}: {
		level: number;
		increase: number;
		decrease: number;
	} = $props();
</script>

{#if increase > 0 || decrease > 0}
	<div class="flex">
		<DetailText value="Lv. {level + increase - decrease} " />
		<DetailText color="gray" value="({level}" />
		{#if increase > 0}
			<DetailText color="bonusStat" value={` + ${increase}`} />
		{/if}
		{#if decrease > 0}
			<DetailText color="bonusStat" value={` - ${decrease}`} />
		{/if}
		<DetailText color="gray" value=")" />
	</div>
{:else}
	<DetailText value="Lv. {level}" />
{/if}
