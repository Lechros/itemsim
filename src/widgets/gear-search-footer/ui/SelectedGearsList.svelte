<script lang="ts">
	import GearIcon from '$lib/components/icons/GearIcon.svelte';
	import type { SearchGearSummary } from '$lib/api';
	import { Button } from '$lib/shared/shadcn/components/ui/button';
	import { ScrollArea } from '$lib/shared/shadcn/components/ui/scroll-area';
	import { X } from 'lucide-svelte';

	let {
		selectedGears: selectedItems,
		onDeselect
	}: {
		selectedGears: SearchGearSummary[];
		onDeselect: (gear: SearchGearSummary) => void;
	} = $props();

	const count = $derived(Math.max(1, Math.min(6, selectedItems.length)));
</script>

<ScrollArea type="auto" class="flex flex-col" style="height: {count * 48}px;">
	{#each selectedItems as item (item.id)}
		<div class="flex h-12 items-center not-last:border-b">
			<div class="flex items-center gap-3">
				<GearIcon icon={item.icon} />
				<div class="text-sm font-medium">{item.name}</div>
			</div>
			<Button variant="ghost" size="icon" class="mr-2 ml-auto" onclick={() => onDeselect(item)}>
				<X />
			</Button>
		</div>
	{:else}
		<div class="flex items-center h-12 text-muted-foreground text-sm">
			검색된 아이템을 클릭해서 선택할 수 있어요.
		</div>
	{/each}
</ScrollArea>
