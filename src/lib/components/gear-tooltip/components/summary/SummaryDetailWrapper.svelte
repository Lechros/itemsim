<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<div class="flex w-[159px] flex-col items-end">
	{@render children()}
</div>
