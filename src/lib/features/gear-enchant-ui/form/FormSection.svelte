<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children }: { children?: Snippet } = $props();
</script>

<section class="flex flex-col gap-8 border-t p-5 pl-6 first:border-t-0">
	{@render children?.()}
</section>
