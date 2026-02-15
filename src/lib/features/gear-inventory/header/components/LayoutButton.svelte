<script lang="ts">
	import { buttonVariants } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { LayoutGrid, LayoutList } from 'lucide-svelte';
	import type { SettingsStore } from '$lib/stores/settings.svelte';

	let {
		settingsStore
	}: {
		settingsStore: SettingsStore;
	} = $props();

	const columnItems = [
		{ value: 'auto', label: '자동' },
		{ value: 3, label: '3' },
		{ value: 4, label: '4' },
		{ value: 6, label: '6' }
	];
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger class={buttonVariants({ variant: 'outline', size: 'icon' })}>
		{#if settingsStore.layout === 'grid'}
			<LayoutGrid />
		{:else}
			<LayoutList />
		{/if}
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		<DropdownMenu.Label>보기</DropdownMenu.Label>
		<DropdownMenu.RadioGroup bind:value={settingsStore.layout}>
			<DropdownMenu.RadioItem value="grid">
				<LayoutGrid /> 바둑판
			</DropdownMenu.RadioItem>
			<DropdownMenu.RadioItem value="list" disabled>
				<LayoutList /> 목록
			</DropdownMenu.RadioItem>
		</DropdownMenu.RadioGroup>
		<DropdownMenu.Separator />
		<DropdownMenu.Label>최대 열 개수</DropdownMenu.Label>
		<DropdownMenu.RadioGroup
			bind:value={
				() => String(settingsStore.columns),
				(v) => (settingsStore.columns = v === 'auto' ? 'auto' : Number(v))
			}
		>
			{#each columnItems as item}
				<DropdownMenu.RadioItem value={String(item.value)} disabled={settingsStore.layout === 'list'}>
					{item.label}
				</DropdownMenu.RadioItem>
			{/each}
		</DropdownMenu.RadioGroup>
	</DropdownMenu.Content>
</DropdownMenu.Root>
