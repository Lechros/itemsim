<script lang="ts">
	import { Badge } from '$lib/shared/shadcn/components/ui/badge';
	import { cn } from '$lib/shared/shadcn/utils';

	let {
		count,
		class: className
	}: {
		count: number;
		class?: string;
	} = $props();
</script>

<Badge variant="secondary" class={cn('text-destructive py-1', className)}>{count}개 선택됨</Badge>
