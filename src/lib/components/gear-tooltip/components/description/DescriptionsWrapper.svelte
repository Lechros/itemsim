<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<div class="flex flex-col items-start self-start pr-[12px] pl-[9px]">
	{@render children()}
</div>
