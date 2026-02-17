<script lang="ts">
	import { Label } from '$lib/components/ui/label';
	import { cn } from '$lib/utils';

	const {
		title,
		description,
		for: controlId,
		variant = 'default',
		disabled = false,
		class: className
	}: {
		title: string;
		description?: string;
		for?: string;
		variant?: 'default' | 'nested';
		disabled?: boolean;
		class?: string;
	} = $props();
</script>

<div class={cn('flex min-w-0 flex-col gap-1', className)}>
	{#if variant === 'default'}
		<Label
			for={controlId}
			class={cn('text-base leading-snug font-medium', disabled && 'text-muted-foreground')}
		>
			{title}
		</Label>
		{#if description}
			<p class="text-muted-foreground text-xs">{description}</p>
		{/if}
	{:else}
		<Label
			for={controlId}
			class={cn('text-sm leading-snug font-normal', disabled && 'text-muted-foreground')}
		>
			{title}
		</Label>
	{/if}
</div>
