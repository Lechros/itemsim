<script lang="ts">
	import { ItemRawIcon } from '$lib/components/icons';
	import { Button } from '$lib/shared/shadcn/components/ui/button';
	import { CardHeader } from '$lib/shared/shadcn/components/ui/card';
	import { X } from 'lucide-svelte';

	let {
		selectedItem,
		clearable,
		onClear,
		placeholder
	}: {
		selectedItem: { name: string; icon?: string } | null;
		clearable?: boolean;
		onClear?: () => void;
		placeholder?: string;
	} = $props();
</script>

<CardHeader class="flex items-center gap-x-2 px-4">
	{#if selectedItem}
		<div class="flex h-9 items-center gap-x-2">
			{#if selectedItem.icon}
				<ItemRawIcon icon={selectedItem.icon} />
			{/if}
			<div class="text-sm font-medium">{selectedItem.name}</div>
		</div>
		{#if clearable}
			<Button variant="ghost" size="icon" class="ml-auto" onclick={() => onClear?.()}>
				<X />
			</Button>
		{/if}
	{:else}
		<div class="sm:h-9">
			<div class="text-muted-foreground text-sm font-medium">{placeholder}</div>
		</div>
	{/if}
</CardHeader>
