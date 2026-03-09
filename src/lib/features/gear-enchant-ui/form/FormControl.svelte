<script lang="ts">
	import type { Snippet } from 'svelte';

	const { children }: { children?: Snippet } = $props();
</script>

<div class="flex shrink-0 flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
	{@render children?.()}
</div>
