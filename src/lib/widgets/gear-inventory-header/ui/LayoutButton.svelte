<script lang="ts">
	import { buttonVariants } from '$lib/shared/shadcn/components/ui/button';
	import {
		DropdownMenu,
		DropdownMenuContent,
		DropdownMenuLabel,
		DropdownMenuRadioGroup,
		DropdownMenuRadioItem,
		DropdownMenuSeparator,
		DropdownMenuTrigger
	} from '$lib/shared/shadcn/components/ui/dropdown-menu';
	import type { LayoutStore } from '$lib/widgets/gear-inventory-header/model/LayoutStore.svelte.js';
	import { LayoutGrid, LayoutList } from 'lucide-svelte';

	let {
		layoutStore
	}: {
		layoutStore: LayoutStore;
	} = $props();

	const columnItems = [
		{ value: 'auto', label: '자동' },
		{ value: 3, label: '3' },
		{ value: 4, label: '4' },
		{ value: 6, label: '6' }
	];
</script>

<DropdownMenu>
	<DropdownMenuTrigger class={buttonVariants({ variant: 'outline', size: 'icon' })}>
		{#if layoutStore.layout === 'grid'}
			<LayoutGrid />
		{:else}
			<LayoutList />
		{/if}
	</DropdownMenuTrigger>
	<DropdownMenuContent>
		<DropdownMenuLabel>보기</DropdownMenuLabel>
		<DropdownMenuRadioGroup bind:value={layoutStore.layout}>
			<DropdownMenuRadioItem value="grid">
				<LayoutGrid /> 바둑판
			</DropdownMenuRadioItem>
			<DropdownMenuRadioItem value="list" disabled>
				<LayoutList /> 목록
			</DropdownMenuRadioItem>
		</DropdownMenuRadioGroup>
		<DropdownMenuSeparator />
		<DropdownMenuLabel>최대 열 개수</DropdownMenuLabel>
		<DropdownMenuRadioGroup
			bind:value={
				() => String(layoutStore.columns),
				(v) => (layoutStore.columns = v === 'auto' ? 'auto' : Number(v))
			}
		>
			{#each columnItems as item}
				<DropdownMenuRadioItem value={String(item.value)} disabled={layoutStore.layout === 'list'}>
					{item.label}
				</DropdownMenuRadioItem>
			{/each}
		</DropdownMenuRadioGroup>
	</DropdownMenuContent>
</DropdownMenu>
