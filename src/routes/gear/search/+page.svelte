<script lang="ts">
	import { goto } from '$app/navigation';
	import { getGearDatas, getGearHashes, getGearSearch } from '$lib/api';
	import { Highlight } from '$lib/components/highlight';
	import { GearIcon } from '$lib/components/icons';
	import { SelectListItem, SelectListVirtualizer } from '$lib/components/select-list';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as Drawer from '$lib/components/ui/drawer';
	import * as InputGroup from '$lib/components/ui/input-group';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { Spinner } from '$lib/components/ui/spinner';
	import FormSection from '$lib/features/gear-enchant-ui/form/FormSection.svelte';
	import MainNavbar from '$lib/features/navigation/main-navbar/MainNavbar.svelte';
	import { createSearchSelectState } from '$lib/features/search';
	import { addGearData } from '$lib/stores/gear-inventory';
	import { cn } from '$lib/utils';
	import { createQuery } from '@tanstack/svelte-query';
	import { josa } from 'es-hangul';
	import { ArrowLeft, SearchIcon, TrashIcon, XIcon } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';

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
	let open = $state(false);
	let isAdding = $state(false);

	async function handleAdd() {
		const ids = selected.gears.map((gear) => gear.id);
		if (ids.length === 0) return;
		isAdding = true;
		open = false;
		try {
			const [gears, hashes] = await Promise.all([getGearDatas(ids), getGearHashes(ids)]);
			const seq = await addGearData(gears, hashes);
			selected.clear();
			if (gears.length === 1) {
				toast.success(`${josa(gears[0].name, '을/를')} 추가했어요.`, {
					position: 'top-center',
					action: {
						label: '이동',
						onClick: () => {
							goto(`/gear/${seq}`);
						}
					}
				});
			} else {
				toast.success(`아이템 ${gears.length}개가 추가되었어요.`, {
					position: 'top-center'
				});
			}
		} catch (error) {
			toast.error('아이템을 추가하지 못했어요.', {
				description: error instanceof Error ? error.message : String(error),
				position: 'top-center'
			});
		} finally {
			isAdding = false;
		}
	}
</script>

<svelte:head>
	<title>아이템 추가 - 아이템 시뮬레이터</title>
</svelte:head>

<ScrollArea class="h-dvh" bind:viewportRef {onscroll}>
	<MainNavbar />

	<div class="mx-auto min-h-[calc(100%-3.5rem)] max-w-screen-sm sm:border-x">
		<div class="px-4 py-3">
			<Button
				variant="ghost"
				size="sm"
				class="text-muted-foreground cursor-pointer"
				onclick={() => history.back()}
			>
				<ArrowLeft />
				인벤토리
			</Button>
		</div>

		<FormSection>
			<h1 class="text-2xl">아이템 추가</h1>
		</FormSection>

		<!-- Search Input -->
		<div class="bg-background sticky top-14 z-50 border-b px-4 py-3">
			<InputGroup.Root>
				<InputGroup.Addon align="inline-start">
					<SearchIcon />
				</InputGroup.Addon>
				<InputGroup.Input placeholder="아이템 이름" bind:value={searchQuery} autofocus />
				<InputGroup.Addon align="inline-end">
					{#if searchQuery}
						<InputGroup.Button variant="ghost" size="icon-xs" onclick={() => (searchQuery = '')}>
							<XIcon />
						</InputGroup.Button>
					{/if}
				</InputGroup.Addon>
			</InputGroup.Root>
		</div>

		<!-- Search Results -->
		{#if !searchQuery}
			<div class="px-5 py-4">
				<p class="text-muted-foreground text-sm">아이템 이름을 입력해 주세요.</p>
			</div>
		{:else if results && results.length > 0}
			{#if viewportRef}
				<SelectListVirtualizer
					multiple
					allowDeselect
					selectedSet={selected.ids}
					items={results}
					getKey={(item) => String(item.id)}
					startMargin={237}
					bufferSize={96}
					scrollRef={viewportRef}
				>
					{#snippet children(item)}
						<SelectListItem
							class="rounded-none pl-4"
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
			<div class="px-5 py-4">
				<p class="text-muted-foreground text-sm">검색된 아이템이 없어요.</p>
			</div>
		{/if}

		<!-- Bottom Spacer -->
		<div class="h-[70px]"></div>
		<!-- Bottom Footer -->
		<footer class="fixed inset-x-0 bottom-0">
			<div class="bg-background mx-auto flex max-w-screen-sm flex-col border-t sm:border-x">
				<div class="flex flex-col justify-between gap-4 px-4 py-3 sm:flex-row sm:items-center">
					{#if selected.count > 0}
						<div class="text-sm">
							선택된 아이템 <span class="font-semibold">{selected.count}</span>개
						</div>
					{:else}
						<div class="text-muted-foreground text-sm">선택된 아이템 없음</div>
					{/if}
					<div class="flex items-center gap-2">
						<Drawer.Root bind:open>
							<Drawer.Trigger class={cn(buttonVariants({ variant: 'outline' }), 'group flex-1')}>
								확인하기
							</Drawer.Trigger>
							<Drawer.Content>
								<div class="mx-auto w-full max-w-screen-sm">
									<Drawer.Header>
										<Drawer.Title>선택된 아이템</Drawer.Title>
										<Drawer.Description>
											{#if selected.count > 0}
												아이템을 제외하거나 추가할 수 있어요.
											{:else}
												선택된 아이템이 없어요.
											{/if}
										</Drawer.Description>
									</Drawer.Header>
									<ScrollArea
										class="flex flex-col px-4"
										style="height: calc(min(calc(80vh - 242px), {selected.count * 48}px));"
									>
										{#each selected.gears as gear (gear.id)}
											<div
												class="flex h-12 items-center justify-between border-b px-1 last:border-b-0"
											>
												<div class="flex items-center gap-3">
													<GearIcon icon={gear.icon} />
													<span class="text-sm font-medium">{gear.name}</span>
												</div>
												<Button
													variant="ghost"
													size="icon"
													class="text-muted-foreground"
													onclick={() => selected.delete(gear)}
												>
													<TrashIcon />
												</Button>
											</div>
										{/each}
									</ScrollArea>
									<Drawer.Footer>
										{#if selected.count > 0}
											<Button disabled={isAdding} onclick={handleAdd}>
												{#if isAdding}
													<Spinner />
												{/if}
												{selected.count}개 추가
											</Button>
										{/if}
										<Drawer.Close class={buttonVariants({ variant: 'outline' })}>닫기</Drawer.Close>
									</Drawer.Footer>
								</div>
							</Drawer.Content>
						</Drawer.Root>
						<Button class="flex-1" disabled={selected.count === 0 || isAdding} onclick={handleAdd}>
							{#if isAdding}
								<Spinner />
							{/if}
							{selected.count}개 추가
						</Button>
					</div>
				</div>
			</div>
		</footer>
	</div>
</ScrollArea>
