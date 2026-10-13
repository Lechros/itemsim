<script lang="ts">
	import { Separator } from '#lib/components/ui/separator/index.ts';
	import { cn } from '#lib/utils/index.ts';
	import type { ComponentProps } from 'svelte';

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: ComponentProps<typeof Separator> = $props();
</script>

<Separator
	bind:ref
	data-slot="item-separator"
	orientation="horizontal"
	class={cn('my-0', className)}
	{...restProps}
/>
