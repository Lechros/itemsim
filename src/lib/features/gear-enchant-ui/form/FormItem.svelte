<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';

	const { children, class: className }: { children?: Snippet; class?: string } = $props();
</script>

<div class={cn('flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between', className)}>
	{@render children?.()}
</div>
