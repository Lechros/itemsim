<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';

	let { children, class: className }: { children: Snippet; class?: string } = $props();
</script>

<div class={cn('flex w-full flex-col gap-2 sm:flex-row', className)}>
	{@render children()}
</div>
