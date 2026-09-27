<script lang="ts" generics="T">
	import type { Snippet } from 'svelte';
	let { data, children }: { data: T[]; children: Snippet<[T, number]> } = $props();
</script>

{#each data as item, index (index)}
	{@render children(item, index)}
{/each}
