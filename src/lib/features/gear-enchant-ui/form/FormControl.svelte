<script lang="ts">
	import type { Snippet } from 'svelte';

	const { children }: { children?: Snippet } = $props();
</script>

<div class="shrink-0 sm:text-right">
	{@render children?.()}
</div>
