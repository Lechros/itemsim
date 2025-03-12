<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		children,
		before,
		soulEnchanted
	}: {
		children: Snippet;
		before?: Snippet;
		soulEnchanted: boolean;
	} = $props();
</script>

{#if soulEnchanted}
	{@render before?.()}
	<div class="ml-[13px] flex flex-col items-start self-start">
		{@render children()}
	</div>
{/if}
