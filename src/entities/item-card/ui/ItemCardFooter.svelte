<script lang="ts">
	import { CardFooter } from '$lib/shared/shadcn/components/ui/card';
	import type { Snippet } from 'svelte';

	let {
		children
	}: {
		children?: Snippet;
	} = $props();
</script>

<CardFooter class="px-4">
	{@render children?.()}
</CardFooter>
