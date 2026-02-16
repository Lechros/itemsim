<script lang="ts">
	import { Label } from '$lib/components/ui/label';
	import { cn } from '$lib/utils';

	const {
		title,
		description,
		for: controlId,
		variant = 'default',
		disabled = false
	}: {
		title: string;
		description?: string;
		for?: string;
		variant?: 'default' | 'nested';
		disabled?: boolean;
	} = $props();
</script>

<div class="flex min-w-0 flex-col">
	{#if variant === 'default'}
		<Label for={controlId} class={cn('text-base font-medium', disabled && 'text-muted-foreground')}
			>{title}</Label
		>
		{#if description}
			<p class="text-muted-foreground text-xs">{description}</p>
		{/if}
	{:else}
		<h4 class={cn('text-sm', disabled && 'text-muted-foreground')}>{title}</h4>
	{/if}
</div>
