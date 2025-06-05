<script lang="ts">
	import { Skeleton } from '$lib/shared/shadcn/components/ui/skeleton';

	let { count }: { count?: number } = $props();
</script>

<div>
	{#if count !== undefined}
		아이템 <span class="font-bold">{count}</span>개
	{:else}
		<Skeleton class="h-5 w-20" />
	{/if}
</div>
