<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		children,
		before,
		exceptionalTotalUpgradeCount
	}: {
		children: Snippet;
		before?: Snippet;
		exceptionalTotalUpgradeCount: number;
	} = $props();
</script>

{#if exceptionalTotalUpgradeCount > 0}
	{@render before?.()}
	<div class="flex flex-col items-start self-start pl-[13px]">
		{@render children()}
	</div>
{/if}
