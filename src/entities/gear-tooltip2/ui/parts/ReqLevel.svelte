<script lang="ts">
	import Text from './text/Text.svelte';

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
		<Text value="Lv. {level + increase - decrease} " />
		<Text color="gray" value="({level}" />
		{#if increase > 0}
			<Text color="bonusStat" value={` + ${increase}`} />
		{/if}
		{#if decrease > 0}
			<Text color="bonusStat" value={` - ${decrease}`} />
		{/if}
		<Text color="gray" value=")" />
	</div>
{:else}
	<Text value="Lv. {level}" />
{/if}
