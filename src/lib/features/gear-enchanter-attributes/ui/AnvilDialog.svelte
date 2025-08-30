<script lang="ts">
	import { GearIcon } from '$lib/components/icons';
	import { Highlight } from '$lib/entities/highlight';
	import { SelectList, SelectListItem } from '$lib/entities/select-list';
	import { getGearSearch, type SearchGearSummary } from '$lib/api';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import {
		Dialog,
		DialogClose,
		DialogContent,
		DialogDescription,
		DialogFooter,
		DialogHeader,
		DialogTitle,
		DialogTrigger
	} from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';
	import { cn } from '$lib/utils';
	import { ButtonGroup } from '$lib/shared/ui';
	import type { Gear } from '@malib/gear';
	import { createQuery } from '@tanstack/svelte-query';
	import { Search, X } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';

	const { gear }: { gear: Gear } = $props();

	let search = $state('');

	const query = createQuery(() => ({
		queryKey: ['gear-search', search, gear.type],
		queryFn: () => getGearSearch(search, gear.type),
		staleTime: 5000 // 5 seconds
	}));

	let results = $state(query.data);

	$effect(() => {
		if (query.data) {
			results = query.data;
		}
	});

	let selected = $state<SearchGearSummary | null>(null);
</script>

<Dialog>
	<DialogTrigger class={buttonVariants({ variant: 'outline' })}>외형 설정하기</DialogTrigger>
	<DialogContent>
		<DialogHeader>
			<DialogTitle>외형 설정하기</DialogTitle>
			<div class="mt-2 flex flex-col gap-4">
				<div class="relative w-full">
					<Input class="pr-8.5 pl-9" placeholder="아이템 이름" bind:value={search} autofocus />
					<Search
						class={cn(
							'text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2'
						)}
					/>
					{#if search}
						<Button
							class="absolute top-px right-px bottom-px size-[34px]"
							variant="ghost"
							size="icon"
							onclick={() => (search = '')}
						>
							<X class="text-muted-foreground" />
						</Button>
					{/if}
				</div>
				{#if results && results.length > 0}
					<SelectList
						items={results ?? []}
						getKey={(item) => String(item.id)}
						size={9}
						selected={selected ? String(selected.id) : null}
					>
						{#snippet children(item)}
							<SelectListItem
								value={String(item.id)}
								onSelect={() => (selected = item)}
								onDeselect={() => (selected = null)}
							>
								<div class="flex items-center gap-3">
									<GearIcon icon={item.icon} />
									<div>
										<Highlight text={item.name} highlight={item.highlight} />
									</div>
								</div>
							</SelectListItem>
						{/snippet}
					</SelectList>
				{:else if search}
					<div class="h-108">검색된 아이템이 없어요.</div>
				{:else}
					<div class="h-108">아이템 이름을 입력해 주세요.</div>
				{/if}
			</div>
		</DialogHeader>
		<DialogFooter>
			<DialogClose class={buttonVariants({ variant: 'outline' })}>닫기</DialogClose>
			<Button
				disabled={!selected}
				onclick={() => {
					gear.shape = {
						icon: selected!.icon,
						name: selected!.name
					};
					toast.success('선택한 아이템으로 외형을 변경했어요.', {
						description: selected?.name,
						position: 'top-center',
						duration: 2000
					});
				}}
			>
				{#if selected}
					'{selected.name}' 외형 설정
				{:else}
					외형 설정
				{/if}
			</Button>
		</DialogFooter>
	</DialogContent>
</Dialog>
