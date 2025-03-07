<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<div class="grid w-full grid-cols-[57px_57px_53px] gap-[5px] pl-3">
	{@render children()}
</div>
