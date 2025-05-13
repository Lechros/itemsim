<script lang="ts">
	import Text from './Text.svelte';

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
	<Text class="flex">
		Lv. {level + increase - decrease}
		<Text color="gray" class="flex">
			({level}{#if increase > 0}
				<Text color="bonusStat">{' '}+ {increase}</Text>{/if}
			{#if decrease > 0}
				<Text color="bonusStat">{' '}- {decrease}</Text>{/if})
		</Text>
	</Text>
{:else}
	<Text>Lv. {level}</Text>
{/if}
