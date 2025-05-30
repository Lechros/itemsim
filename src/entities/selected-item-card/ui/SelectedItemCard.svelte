<script lang="ts">
	import { ItemRawIcon } from '$lib/entities/item-icon';
	import { Button } from '$lib/shared/shadcn/components/ui/button';
	import { Card, CardContent, CardFooter, CardHeader } from '$lib/shared/shadcn/components/ui/card';
	import { Separator } from '$lib/shared/shadcn/components/ui/separator';
	import { cn } from '$lib/shared/shadcn/utils';
	import { splitHalf } from '$lib/shared/utils';
	import { X } from 'lucide-svelte';
	import type { Snippet } from 'svelte';

	let {
		selectedItem,
		optionStrings,
		clearable,
		onClear,
		footer,
		placeholder
	}: {
		selectedItem: {
			name: string;
			icon: string;
		} | null;
		optionStrings?: [string, string][];
		clearable?: boolean;
		onClear?: () => void;
		footer?: Snippet;
		placeholder?: string;
	} = $props();
</script>

<Card class="gap-4 py-4">
	<CardHeader class="flex items-center gap-x-2 px-4">
		{#if selectedItem}
			<div class="flex h-9 items-center gap-x-2">
				<ItemRawIcon icon={selectedItem.icon} />
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
	<CardContent class="px-4">
		{#if optionStrings}
			{@const [leftStrings, rightStrings] = splitHalf(optionStrings)}
			<div
				class={cn(
					'-mx-4 grid auto-rows-min sm:h-30',
					optionStrings.length > 6 && 'sm:grid-cols-[1fr_1px_1fr]'
				)}
			>
				<div class="px-4">
					{#each leftStrings as strings}
						{@render optionItem(strings)}
					{/each}
				</div>
				{#if optionStrings.length > 6}
					<Separator orientation="vertical" />
				{/if}
				<div class="px-4">
					{#each rightStrings as strings}
						{@render optionItem(strings)}
					{/each}
				</div>
			</div>
		{:else}
			<div class="sm:h-30"></div>
		{/if}
	</CardContent>
	<CardFooter class="px-4">
		{#if selectedItem}
			{@render footer?.()}
		{:else}
			<div class="sm:h-9"></div>
		{/if}
	</CardFooter>
</Card>

{#snippet optionItem(strings: [string, string])}
	<div class="text-sm">
		<span>{strings[0]}</span>
		<span class="font-semibold">{strings[1]}</span>
	</div>
{/snippet}
