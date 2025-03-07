<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<div class="flex w-[156px] flex-col pr-[5px]">
	{@render children()}
</div>
