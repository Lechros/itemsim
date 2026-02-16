<script lang="ts">
	import { cn } from '$lib/utils';
	import { Tabs } from 'bits-ui';
	import type { Snippet } from 'svelte';

	let {
		children,
		value,
		disabled,
		class: className,
		inactiveBorderBottom = true
	}: {
		children?: Snippet;
		value: string;
		disabled?: boolean;
		inactiveBorderBottom?: boolean;
		class?: string;
	} = $props();

	const base =
		"focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap text-sm font-medium outline-none transition-all focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0";
	const size = 'h-10 px-6 has-[>svg]:px-4';
	const data =
		'data-[state=inactive]:bg-secondary data-[state=inactive]:text-secondary-foreground hover:data-[state=inactive]:bg-secondary/80 data-[state=active]:transition-none';
</script>

<Tabs.Trigger
	{value}
	{disabled}
	class={cn(base, size, data, inactiveBorderBottom && 'data-[state=inactive]:border-b', className)}
>
	{@render children?.()}
</Tabs.Trigger>
