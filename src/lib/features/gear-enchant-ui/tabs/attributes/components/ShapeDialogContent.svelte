<script lang="ts">
	import { getGearSearch, type SearchGearSummary } from '$lib/api';
	import { Highlight } from '$lib/components/highlight';
	import { GearIcon } from '$lib/components/icons';
	import { SelectList, SelectListItem } from '$lib/components/select-list';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as InputGroup from '$lib/components/ui/input-group';
	import type { Gear } from '@malib/gear';
	import { createQuery } from '@tanstack/svelte-query';
	import { SearchIcon, XIcon } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';

	const { gear }: { gear: Gear } = $props();

	let search = $state('');

	const query = createQuery(() => ({
		queryKey: ['gear-search', search, gear.type],
		queryFn: () => getGearSearch(search, gear.type),
		staleTime: 60 * 60 * 1000 // 1 hour
	}));

	let results = $state(query.data);

	$effect(() => {
		if (query.data) {
			results = query.data;
		}
	});

	let selected = $state<SearchGearSummary | null>(null);
</script>

<Dialog.Content>
	<Dialog.Header>
		<Dialog.Title>외형 설정하기</Dialog.Title>
	</Dialog.Header>
	<div class="flex flex-col gap-4">
		<InputGroup.Root>
			<InputGroup.Addon align="inline-start">
				<SearchIcon />
			</InputGroup.Addon>
			<InputGroup.Input placeholder="아이템 이름" bind:value={search} autofocus />
			<InputGroup.Addon align="inline-end">
				{#if search}
					<InputGroup.Button variant="ghost" size="icon-xs" onclick={() => (search = '')}>
						<XIcon />
					</InputGroup.Button>
				{/if}
			</InputGroup.Addon>
		</InputGroup.Root>

		{#if results && results.length > 0}
			<SelectList
				items={results ?? []}
				getKey={(item) => String(item.id)}
				size={6}
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
			<div class="text-muted-foreground h-72 text-sm">검색된 아이템이 없어요.</div>
		{:else}
			<div class="text-muted-foreground h-72 text-sm">아이템 이름을 입력해 주세요.</div>
		{/if}
	</div>
	<Dialog.Footer>
		<Dialog.Close class={buttonVariants({ variant: 'outline' })}>닫기</Dialog.Close>
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
	</Dialog.Footer>
</Dialog.Content>
