<script lang="ts">
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
	import ky from 'ky';
	import { ChevronDown, ChevronUp, X } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';
	import { cubicInOut } from 'svelte/easing';
	import { SvelteMap } from 'svelte/reactivity';
	import { slide } from 'svelte/transition';

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
	let isHeaderVisible = $state(true);

	let isAdding = $state(false);

	const handleScroll = () => {
		const currentScrollY = window.scrollY;
		isHeaderVisible = currentScrollY <= 32;
	};

	const handleAdd = async () => {
		isAdding = true;
		try {
			const url = getGearDatasUrl(Array.from(selectedItems.keys()));
			const data = await ky.get(url).json<Record<string, GearData>>();
			await addGearData(...Object.values(data));
			toast.success(`아이템 ${Object.values(data).length}개를 추가했어요.`);
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
		const getResults = async () => {
			if (!query) return;
			const url = getGearSearchUrl(query);
			const response = await fetch(url);
			const data = await response.json();
			results = data;
		};

		getResults();
	});
</script>

<svelte:window onscroll={handleScroll} />

<div class="flex min-h-screen flex-col">
	<!-- Header Section -->
	<div class={['sticky z-50', isHeaderVisible ? 'sticky' : 'top-0']}>
		<div class={['bg-background border-b', !isHeaderVisible ? 'shadow-sm' : '']}>
			<div
				class={[
					'mx-auto flex w-full max-w-screen-md',
					isHeaderVisible ? 'flex-col' : 'flex-row items-center'
				]}
			>
				{#if isHeaderVisible}
					<div class="flex h-12 items-center px-4">
						<span class="mt-px text-xl font-bold">아이템 추가</span>
					</div>
				{/if}
				<div class={['flex-1 px-4 pb-4', !isHeaderVisible && 'pt-4']}>
					<Input
						type="search"
						bind:value={query}
						placeholder="아이템 이름을 입력해 주세요."
						class="w-full"
					/>
				</div>
			</div>
		</div>
	</div>

	<!-- Scrollable Search Results -->
	{#if !isHeaderVisible}
		<div class="mt-12"></div>
	{/if}
	<div class="mx-auto w-full max-w-screen-md px-4">
		{#if results}
			{#each results as item (item.id)}
				<div>
					<Toggle
						class="h-12 w-full justify-start"
						pressed={selectedItems.has(item.id)}
						onPressedChange={(pressed: boolean) => {
							if (pressed) {
								selectedItems.set(item.id, item);
							} else {
								selectedItems.delete(item.id);
							}
						}}
					>
						<div class="flex items-center gap-3">
							<GearIcon icon={item.icon} />
							<div>
								<Highlight text={item.name} highlight={item.highlight} />
							</div>
						</div>
					</Toggle>
				</div>
			{:else}
				<div class="flex pt-4">검색된 아이템이 없어요.</div>
			{/each}
		{:else if !query}
			<div class="flex pt-4"></div>
		{/if}
	</div>
	<div class="mb-30"></div>

	<!-- Fixed Bottom Section -->
	<div class="fixed bottom-0 w-full">
		{#if isOpen}
			<div class="mx-auto w-full max-w-screen-md">
				<div
					class="bg-card rounded-t-xl border border-b-0 shadow-lg"
					transition:slide={{ duration: 150, easing: cubicInOut }}
				>
					<div class="relative flex flex-col px-4">
						<button
							class="flex cursor-pointer items-center justify-center p-2"
							onclick={() => (isOpen = false)}
						>
							<ChevronDown class="text-muted-foreground size-6" />
						</button>
						<ScrollArea
							type="auto"
							style="height: {Math.max(48, 48 * Math.min(6, selectedItems.size))}px;"
						>
							<div class="flex flex-col rounded-md">
								{#each selectedItems.values() as item (item.id)}
									<div class="flex h-12 items-center not-last:border-b">
										<div class="flex items-center gap-3 px-2">
											<GearIcon icon={item.icon} />
											<div class="text-sm font-medium">{item.name}</div>
										</div>
										<div class="ml-auto">
											<Button
												variant="ghost"
												size="icon"
												onclick={() => selectedItems.delete(item.id)}
											>
												<X class="size-4" />
											</Button>
										</div>
									</div>
								{:else}
									<div class="flex items-center h-12 text-muted-foreground text-sm">
										아이템을 클릭해서 선택할 수 있어요.
									</div>
								{/each}
							</div>
						</ScrollArea>
					</div>
				</div>
			</div>
		{/if}
		<div class="bg-card relative border-t">
			<div class="mx-auto flex max-w-screen-md flex-col gap-4 p-4">
				<!-- Selected Items Toggle Button -->
				<Button variant="ghost" onclick={() => (isOpen = !isOpen)}>
					<div>
						선택된 아이템 <span class="text-base font-bold">{selectedItems.size}</span>개
					</div>
					<ChevronUp
						class={cn('text-muted-foreground transition-transform', isOpen ? 'rotate-180' : '')}
					/>
				</Button>

				<!-- Action Buttons -->
				<div class="flex justify-end gap-2">
					<Button size="lg" variant="outline" class="flex-1/3 sm:flex-none" href="/"
						>돌아가기</Button
					>
					<Button
						size="lg"
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
</div>

<style>
	.rotate-180 {
		transform: rotate(180deg);
	}
</style>
