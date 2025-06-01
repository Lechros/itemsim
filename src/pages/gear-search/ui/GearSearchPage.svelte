<script lang="ts">
	import GearIcon from '$lib/entities/gear-icon/ui/GearIcon.svelte';
	import Highlight from '$lib/entities/highlight/ui/Highlight.svelte';
	import { SelectList, SelectListItem } from '$lib/entities/select-list';
	import SearchNavbar from '$lib/features/search-navbar/ui/SearchNavbar.svelte';
	import { getGearSearch, type SearchGearSummary } from '$lib/shared/api';
	import { ScrollArea } from '$lib/shared/shadcn/components/ui/scroll-area';
	import { GearSearchFooter } from '$lib/widgets/gear-search-footer';
	import { createQuery } from '@tanstack/svelte-query';
	import { SvelteMap } from 'svelte/reactivity';

	let searchQuery = $state('');
	let selectedItems = $state<Map<number, SearchGearSummary>>(new SvelteMap());

	const query = createQuery(() => ({
		queryKey: ['gear-search', searchQuery],
		queryFn: () => getGearSearch(searchQuery),
		staleTime: 5000 // 5 seconds
	}));

	let results = $state(query.data);

	$effect(() => {
		if (query.data) {
			results = query.data;
		}
	});
</script>

<ScrollArea class="flex h-screen flex-col">
	<SearchNavbar
		backHref="/"
		title="아이템 추가"
		bind:query={searchQuery}
		placeholder="예) 창세의 뱃지"
	/>

	<!-- Search Results -->
	<div class="mx-auto w-full max-w-screen-md px-2">
		{#if !searchQuery}
			<div class="flex pt-4">아이템 이름을 입력해 주세요.</div>
		{:else if results && results.length > 0}
			<SelectList multiple items={results} size={results.length}>
				{#snippet renderItem(item)}
					<SelectListItem
						value={String(item.id)}
						onSelect={() => selectedItems.set(item.id, item)}
						onDeselect={() => selectedItems.delete(item.id)}
					>
						<GearIcon icon={item.icon} />
						<div>
							<Highlight text={item.name} highlight={item.highlight} />
						</div>
					</SelectListItem>
				{/snippet}
			</SelectList>
		{:else}
			<div class="flex pt-4">검색된 아이템이 없어요.</div>
		{/if}
	</div>
	<div class="h-[89px]"></div>

	<!-- Bottom Section -->
	<GearSearchFooter selectedGears={selectedItems} />
</ScrollArea>
