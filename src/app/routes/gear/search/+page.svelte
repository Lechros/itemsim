<script lang="ts">
	import { goto } from '$app/navigation';
	import GearIcon from '$lib/entities/gear-icon/ui/GearIcon.svelte';
	import Highlight from '$lib/entities/highlight/ui/Highlight.svelte';
	import { addGearData } from '$lib/features/gear-inventory';
	import { getGearDatasUrl, getGearSearchUrl } from '$lib/shared/api/endpoints/gear';
	import { Button } from '$lib/shared/shadcn/components/ui/button';
	import { Input } from '$lib/shared/shadcn/components/ui/input';
	import { ScrollArea } from '$lib/shared/shadcn/components/ui/scroll-area';
	import { Toggle } from '$lib/shared/shadcn/components/ui/toggle';
	import { cn } from '$lib/shared/shadcn/utils';
	import type { GearData } from '@malib/gear';
	import { josa } from 'es-hangul';
	import ky from 'ky';
	import { ArrowLeft, Check, ChevronDown, ChevronUp, X } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';
	import { SvelteMap } from 'svelte/reactivity';
	import { fade, slide } from 'svelte/transition';

	type Item = {
		id: number;
		name: string;
		icon: string;
		highlight: string;
	};

	let query = $state('');
	let results: Item[] | undefined = $state(undefined);
	let selectedItems = $state<Map<number, Item>>(new SvelteMap());

	let isOpen = $state(false);
	let scrollY = $state(0);
	const showFixedHeader = $derived(scrollY >= 32);

	const handleScroll = (event: Event) => {
		const target = event.target as HTMLElement;
		scrollY = target.scrollTop;
	};

	let isAdding = $state(false);

	const handleAdd = async () => {
		isAdding = true;
		try {
			const url = getGearDatasUrl(Array.from(selectedItems.keys()));
			const gears = await ky.get(url).json<GearData[]>();
			const seq = await addGearData(...gears);
			if (gears.length === 1) {
				toast.success(`${josa(gears[0].name, '을/를')} 추가했어요.`, {
					action: {
						label: '이동',
						onClick: () => {
							goto(`/gear/${seq}`);
						}
					}
				});
			} else {
				toast.success(`아이템 ${gears.length}개를 추가했어요.`);
			}
			selectedItems.clear();
		} catch (error) {
			toast.error('아이템을 추가하지 못했어요.', {
				description: error instanceof Error ? error.message : String(error)
			});
		} finally {
			isAdding = false;
		}
	};

	$effect(() => {
		const controller = new AbortController();
		const getResults = async () => {
			if (!query) {
				results = undefined;
				return;
			}
			const url = getGearSearchUrl(query);
			try {
				const response = await fetch(url, {
					signal: controller.signal
				});
				const data = await response.json();
				results = data;
			} catch (err) {
				if (err instanceof DOMException && err.name === 'AbortError') {
					return;
				}
				throw err;
			}
		};

		getResults();

		return () => controller.abort();
	});
</script>

<ScrollArea class="flex h-screen flex-col" onscroll={handleScroll}>
	<!-- Header Section -->
	<header
		class={cn('bg-background/80 w-full border-b backdrop-blur', showFixedHeader && 'fixed z-40')}
	>
		<div class="mx-auto flex w-full max-w-screen-md flex-col px-2">
			{#if !showFixedHeader}
				<div class="flex h-10 items-center gap-2 pt-2">
					<Button variant="ghost" size="icon" href="/">
						<ArrowLeft />
					</Button>
					<span class="mt-px font-semibold">아이템 추가</span>
				</div>
			{/if}
			<div class="flex h-12 items-center">
				<Input
					type="search"
					placeholder="아이템 이름을 입력해 주세요."
					class="w-full"
					bind:value={query}
					autofocus
				/>
			</div>
		</div>
	</header>

	<!-- Search Results -->
	{#if showFixedHeader}
		<div class="h-[97px]"></div>
	{/if}
	<div class="mx-auto flex w-full max-w-screen-md flex-col gap-px px-2">
		{#if results}
			{#each results as item (item.id)}
				<Toggle
					class="h-12 items-center justify-start gap-3"
					pressed={selectedItems.has(item.id)}
					onPressedChange={(pressed: boolean) => {
						if (pressed) {
							selectedItems.set(item.id, item);
						} else {
							selectedItems.delete(item.id);
						}
					}}
				>
					<GearIcon icon={item.icon} />
					<div>
						<Highlight text={item.name} highlight={item.highlight} />
					</div>
					{#if selectedItems.has(item.id)}
						<div class="ml-auto p-2" transition:fade={{ duration: 100 }}>
							<Check class="text-primary size-4" />
						</div>
					{/if}
				</Toggle>
			{:else}
				<div class="flex pt-4">검색된 아이템이 없어요.</div>
			{/each}
		{:else if !query}
			<div class="flex pt-4">아이템 이름을 입력해 주세요.</div>
		{/if}
	</div>
	<div class="h-[89px]"></div>

	<!-- Bottom Section -->
	<div class="fixed bottom-0 w-full">
		{#if isOpen}
			<div
				class="bg-card mx-auto w-full max-w-screen-md rounded-t-xl border border-b-0 shadow-lg"
				transition:slide={{ duration: 300 }}
			>
				<div class="flex flex-col px-4">
					<button
						class="flex cursor-pointer items-center justify-center p-2"
						onclick={() => (isOpen = false)}
					>
						<ChevronDown class="text-muted-foreground size-4" />
					</button>
					<ScrollArea
						type="auto"
						class="flex flex-col"
						style="height: {Math.max(48, 48 * Math.min(6, selectedItems.size))}px;"
					>
						{#each selectedItems.values() as item (item.id)}
							<div class="flex h-12 items-center not-last:border-b">
								<div class="flex items-center gap-3">
									<GearIcon icon={item.icon} />
									<div class="text-sm font-medium">{item.name}</div>
								</div>
								<Button
									variant="ghost"
									size="icon"
									class="mr-2 ml-auto"
									onclick={() => selectedItems.delete(item.id)}
								>
									<X />
								</Button>
							</div>
						{:else}
							<div class="flex items-center h-12 text-muted-foreground text-sm">
								아이템을 클릭해서 선택할 수 있어요.
							</div>
						{/each}
					</ScrollArea>
				</div>
			</div>
		{/if}
		<div class="bg-card relative border-t">
			<div class="mx-auto flex max-w-screen-md flex-col gap-2 p-2">
				<!-- Selected Items Toggle Button -->
				<Button variant="ghost" size="sm" onclick={() => (isOpen = !isOpen)}>
					<div>
						선택된 아이템 <span class="text-base font-semibold">{selectedItems.size}</span>개
					</div>
					<ChevronUp class={cn('transition-transform', isOpen ? 'rotate-180' : '')} />
				</Button>

				<!-- Action Buttons -->
				<div class="flex justify-end gap-2">
					<Button variant="outline" class="flex-1/3 sm:flex-none" href="/">돌아가기</Button>
					<Button
						class="flex-2/3 sm:flex-none"
						disabled={selectedItems.size === 0 || isAdding}
						onclick={handleAdd}
					>
						아이템 추가
					</Button>
				</div>
			</div>
		</div>
	</div>
</ScrollArea>
