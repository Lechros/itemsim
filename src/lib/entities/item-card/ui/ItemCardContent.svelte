<script lang="ts">
	import { CardContent } from '$lib/shared/shadcn/components/ui/card';
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
