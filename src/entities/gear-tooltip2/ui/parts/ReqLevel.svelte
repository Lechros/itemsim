<script lang="ts">
	import NewText from './NewText.svelte';

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
		<NewText value="Lv. {level + increase - decrease} " />
		<NewText color="gray" value="({level}" />
		{#if increase > 0}
			<NewText color="bonusStat" value={` + ${increase}`} />
		{/if}
		{#if decrease > 0}
			<NewText color="bonusStat" value={` - ${decrease}`} />
		{/if}
		<NewText color="gray" value=")" />
	</div>
{:else}
	<NewText value="Lv. {level}" />
{/if}
