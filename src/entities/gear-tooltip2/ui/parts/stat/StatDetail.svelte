<script lang="ts">
	import Text from '../Text.svelte';

	let {
		rate = false,
		base,
		add,
		upgrade,
		starforce
	}: {
		rate?: boolean;
		base: number;
		add: number;
		upgrade: number;
		starforce: number;
	} = $props();

	const r = rate ? '%' : '';
</script>

<Text class="flex">
	({base}{r}{#if add !== 0}
		<Text color="bonusStat">{' '}+{add}{r}</Text>
	{/if}{#if upgrade > 0}
		<Text color="scroll">{' '}+{upgrade}{r}</Text>
	{:else if upgrade < 0}
		<Text color="red">{' '}{upgrade}{r}</Text>
	{/if}{#if starforce !== 0}
		<Text color="starforce">{' '}+{starforce}{r}</Text>
	{/if})
</Text>
