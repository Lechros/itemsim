<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';

	let { children, class: className }: { children?: Snippet; class?: string } = $props();
</script>

<section class={cn('flex flex-col gap-8 border-b p-5 pl-6', className)}>
	{@render children?.()}
</section>
