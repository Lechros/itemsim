<script lang="ts">
	import { ItemRawIcon } from '$lib/entities/item-icon';
	import { Button } from '$lib/shared/shadcn/components/ui/button';
	import { Card, CardContent, CardFooter, CardHeader } from '$lib/shared/shadcn/components/ui/card';
	import { Separator } from '$lib/shared/shadcn/components/ui/separator';
	import { cn } from '$lib/shared/shadcn/utils';
	import type { Scroll } from '@malib/gear';
	import { X } from 'lucide-svelte';
	import type { Snippet } from 'svelte';
	import { splitHalf } from '../model/utils';

	let {
		selectedScroll,
		optionStrings,
		onClear,
		footer
	}: {
		selectedScroll: Scroll | null;
		optionStrings?: [string, string][];
		onClear?: () => void;
		footer?: Snippet;
	} = $props();
</script>

<Card class="gap-4 py-4">
	<CardHeader class="flex items-center gap-x-2 px-4">
		{#if selectedScroll}
			{#if selectedScroll.icon}
				<ItemRawIcon icon={selectedScroll.icon} />
			{/if}
			<div class="text-sm font-medium">
				{selectedScroll.name}
			</div>
			<Button variant="ghost" size="icon" class="ml-auto" onclick={() => onClear?.()}>
				<X />
			</Button>
		{:else}
			<div class="sm:h-9">
				<div class="text-muted-foreground text-sm font-medium">주문서를 선택해 주세요.</div>
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
						<div class="text-sm">
							<span>{strings[0]}</span>
							<span class="font-semibold">{strings[1]}</span>
						</div>
					{/each}
				</div>
				{#if optionStrings.length > 6}
					<Separator orientation="vertical" />
				{/if}
				<div class="px-4">
					{#each rightStrings as strings}
						<div class="text-sm">
							<span>{strings[0]}</span>
							<span class="font-semibold">{strings[1]}</span>
						</div>
					{/each}
				</div>
			</div>
		{:else}
			<div class="sm:h-30"></div>
		{/if}
	</CardContent>
	<CardFooter class="px-4">
		{#if selectedScroll}
			{@render footer?.()}
		{:else}
			<div class="sm:h-9"></div>
		{/if}
	</CardFooter>
</Card>
