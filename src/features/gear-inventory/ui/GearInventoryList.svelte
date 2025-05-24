<script lang="ts">
	import type { Snippet } from 'svelte';

	const {
		children
	}: {
		children: Snippet;
	} = $props();
</script>

<div class="grid grid-cols-6 gap-4">
	{@render children()}
</div>
