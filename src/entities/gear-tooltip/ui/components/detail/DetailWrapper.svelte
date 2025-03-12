<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<div class="flex w-full flex-col items-start pr-[13px] pl-[13px]">
	{@render children()}
</div>
