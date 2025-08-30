<script lang="ts">
	import GearIcon from '../../../components/icons/GearIcon.svelte';
	import Highlight from '../../../entities/highlight/ui/Highlight.svelte';
	import { SelectListItem } from '$lib/entities/select-list';
	import SelectListVirtualizer from '$lib/entities/select-list/ui/SelectListVirtualizer.svelte';
	import SearchNavbar from '$lib/features/search-navbar/ui/SearchNavbar.svelte';
	import { getGearSearch, type SearchGearSummary } from '$lib/api';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { GearSearchFooter } from '$lib/widgets/gear-search-footer';
	import { createQuery } from '@tanstack/svelte-query';
	import { SvelteMap, SvelteSet } from 'svelte/reactivity';

	let searchQuery = $state('');
	let selectedItems = $state<Map<number, SearchGearSummary>>(new SvelteMap());
	const selectedIds = $state(new SvelteSet<string>());
	const selectedGears = $derived([...selectedItems.values()]);

	const query = createQuery(() => ({
		queryKey: ['gear-search', searchQuery],
		queryFn: () => getGearSearch(searchQuery),
		staleTime: 5000 // 5 seconds
	}));

	let results = $state(query.data);

	let scrollTop = $state(0);
	let viewportRef = $state<HTMLDivElement | null>(null);

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

<ScrollArea class="h-dvh" bind:viewportRef {onscroll}>
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
			<SelectListVirtualizer
				multiple
				allowDeselect
				selectedSet={selectedIds}
				items={results}
				getKey={(item) => String(item.id)}
				startMargin={102}
				scrollRef={viewportRef ?? null}
			>
				{#snippet children(item)}
					<SelectListItem
						value={String(item.id)}
						onSelect={() => selectItem(item)}
						onDeselect={() => deselectItem(item)}
					>
						<div class="flex items-center gap-3">
							<GearIcon icon={item.icon} />
							<div>
								<Highlight text={item.name} highlight={item.highlight} />
							</div>
						</div>
					</SelectListItem>
				{/snippet}
			</SelectListVirtualizer>
		{:else}
			<div class="flex pt-4">검색된 아이템이 없어요.</div>
		{/if}
	</div>

	<!-- Bottom Section -->
	<GearSearchFooter {selectedGears} onDeselect={(gear) => deselectItem(gear)} />
</ScrollArea>
