<script lang="ts">
	import { cn } from '$lib/shared/shadcn/utils';
	import type { Snippet } from 'svelte';

	let { children, class: className }: { children: Snippet; class?: string } = $props();
</script>

<div class={cn('flex flex-col gap-2 sm:flex-row', className)}>
	{@render children()}
</div>
