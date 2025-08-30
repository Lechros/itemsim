<script lang="ts">
	import { buttonVariants } from '$lib/components/ui/button';
	import {
		DropdownMenu,
		DropdownMenuContent,
		DropdownMenuLabel,
		DropdownMenuRadioGroup,
		DropdownMenuRadioItem,
		DropdownMenuTrigger
	} from '$lib/components/ui/dropdown-menu';
	import { ChevronDown } from 'lucide-svelte';

	let {
		sort = $bindable()
	}: {
		sort?: string;
	} = $props();

	const sortItems = [
		{ value: 'createdAtDesc', label: '생성 최신순' },
		{ value: 'createdAtAsc', label: '생성 날짜순' },
		{ value: 'updatedAtDesc', label: '수정 최신순' },
		{ value: 'updatedAtAsc', label: '수정 날짜순' },
		{ value: 'nameAsc', label: '이름 오름차순' },
		{ value: 'nameDesc', label: '이름 내림차순' },
		{ value: 'idAsc', label: 'ID 오름차순' },
		{ value: 'idDesc', label: 'ID 내림차순' }
	];

	const sortItem = $derived(sortItems.find((item) => item.value === sort));
</script>

<DropdownMenu>
	<DropdownMenuTrigger class={buttonVariants({ variant: 'outline' })}>
		{#if sortItem}
			{sortItem.label}
		{:else}
			정렬
		{/if}
		<ChevronDown />
	</DropdownMenuTrigger>
	<DropdownMenuContent>
		<DropdownMenuLabel>아이템 정렬</DropdownMenuLabel>
		<DropdownMenuRadioGroup bind:value={sort}>
			{#each sortItems as item}
				<DropdownMenuRadioItem value={item.value}>
					{item.label}
				</DropdownMenuRadioItem>
			{/each}
		</DropdownMenuRadioGroup>
	</DropdownMenuContent>
</DropdownMenu>
