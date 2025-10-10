<script lang="ts">
	import { getGearSearch } from '$lib/api';
	import { Highlight } from '$lib/components/highlight';
	import { GearIcon } from '$lib/components/icons';
	import { SelectListItem, SelectListVirtualizer } from '$lib/components/select-list';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import {
		GearSearchFooter,
		GearSearchNavbar,
		createSearchSelectState
	} from '$lib/features/search';
	import { createQuery } from '@tanstack/svelte-query';

	let searchQuery = $state('');

	const query = createQuery(() => ({
		queryKey: ['gear-search', searchQuery],
		queryFn: () => getGearSearch(searchQuery),
		staleTime: 60 * 60 * 1000 // 1 hour
	}));

	let results = $state(query.data);

	$effect(() => {
		if (query.data) {
			results = query.data;
		}
	});

	const selected = createSearchSelectState();

	let scrollTop = $state(0);
	let viewportRef = $state<HTMLDivElement | null>(null);

	function onscroll(event: Event) {
		scrollTop = (event.target as HTMLElement).scrollTop;
	}
</script>

<svelte:head>
	<title>아이템 추가 - 아이템 시뮬레이터</title>
</svelte:head>

<ScrollArea class="h-dvh" bind:viewportRef {onscroll}>
	<GearSearchNavbar
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
			{#if viewportRef}
				<SelectListVirtualizer
					multiple
					allowDeselect
					selectedSet={selected.ids}
					items={results}
					getKey={(item) => String(item.id)}
					startMargin={102}
					scrollRef={viewportRef}
				>
					{#snippet children(item)}
						<SelectListItem
							value={String(item.id)}
							onSelect={() => selected.add(item)}
							onDeselect={() => selected.delete(item)}
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
			{/if}
		{:else}
			<div class="flex pt-4">검색된 아이템이 없어요.</div>
		{/if}
	</div>

	<!-- Bottom Section -->
	<GearSearchFooter {selected} />
</ScrollArea>
