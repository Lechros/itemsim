<script lang="ts">
	import { CardContent } from '$lib/components/ui/card';
	import type { Snippet } from 'svelte';

	let {
		children
	}: {
		children?: Snippet;
	} = $props();
</script>

<CardContent class="px-4">
	{@render children?.()}
</CardContent>
