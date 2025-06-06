<script lang="ts">
	import GearIcon from '$lib/entities/gear-icon/ui/GearIcon.svelte';
	import Highlight from '$lib/entities/highlight/ui/Highlight.svelte';
	import { SelectList, SelectListItem } from '$lib/entities/select-list';
	import SearchNavbar from '$lib/features/search-navbar/ui/SearchNavbar.svelte';
	import { getGearSearch, type SearchGearSummary } from '$lib/shared/api';
	import { ScrollArea } from '$lib/shared/shadcn/components/ui/scroll-area';
	import { GearSearchFooter } from '$lib/widgets/gear-search-footer';
	import { createQuery } from '@tanstack/svelte-query';
	import { SvelteMap, SvelteSet } from 'svelte/reactivity';

	let searchQuery = $state('');
	let selectedItems = $state<Map<number, SearchGearSummary>>(new SvelteMap());
	const selectedIds = $state(new SvelteSet<string>());
	const selectedGears = $derived([...selectedItems.values()]);
	let scrollTop = $state(0);

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

	function selectItem(item: SearchGearSummary) {
		selectedItems.set(item.id, item);
		selectedIds.add(String(item.id));
	}

	function deselectItem(item: SearchGearSummary) {
		selectedItems.delete(item.id);
		selectedIds.delete(String(item.id));
	}

	function onscroll(event: Event) {
		scrollTop = (event.target as HTMLElement).scrollTop;
	}
</script>

<ScrollArea class="h-screen" {onscroll}>
	<SearchNavbar
		backHref="/"
		title="아이템 추가"
		bind:query={searchQuery}
		placeholder="예) 창세의 뱃지"
		{scrollTop}
	/>

	<!-- Search Results -->
	<div class="mx-auto w-full max-w-screen-md px-4">
		{#if !searchQuery}
			<div class="flex pt-4">아이템 이름을 입력해 주세요.</div>
		{:else if results && results.length > 0}
			<SelectList multiple values={selectedIds} items={results} size={results.length}>
				{#snippet renderItem(item)}
					<SelectListItem
						value={String(item.id)}
						onSelect={() => selectItem(item)}
						onDeselect={() => deselectItem(item)}
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

	<!-- Bottom Section -->
	<GearSearchFooter {selectedGears} onDeselect={(gear) => deselectItem(gear)} />
</ScrollArea>
