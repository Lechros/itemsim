<script lang="ts">
	import { Button } from '$lib/shared/shadcn/components/ui/button';
	import { Drawer, DrawerContent, DrawerTrigger } from '$lib/shared/shadcn/components/ui/drawer';
	import { Check, ChevronDown } from 'lucide-svelte';
	import type { TabInfo } from '../model/type';

	let {
		tab: tabValue = $bindable(''),
		tabs
	}: {
		tab?: string;
		tabs: TabInfo[];
	} = $props();

	let open = $state(false);
	const currentTab = $derived(tabs.find((t) => t.value === tabValue) ?? tabs[0]);

	const buttonClass = 'h-12 w-full justify-start px-4! text-xl';

	$effect(() => {
		tabValue = currentTab.value;
	});

	function handleButtonClick(tab: TabInfo) {
		tabValue = tab.value;
		open = false;
	}

	function getHref(tab: TabInfo) {
		return `?tab=${tab.value}`;
	}
</script>

<Drawer bind:open>
	<DrawerTrigger>
		<Button variant="ghost" size="lg" class="flex items-center gap-2">
			<h2 class="text-2xl font-semibold">{currentTab.label}</h2>
			<ChevronDown />
		</Button>
	</DrawerTrigger>
	<DrawerContent>
		<div class="mx-auto flex w-full max-w-screen-md flex-col px-2 pt-4">
			{#each tabs as tab}
				{@const isCurrent = tab.value === currentTab.value}
				<Button
					variant={isCurrent ? 'default' : 'ghost'}
					class={buttonClass}
					href={getHref(tab)}
					onclick={() => handleButtonClick(tab)}
					disabled={tab.disabled}
				>
					{tab.label}
					{#if isCurrent}
						<Check />
					{/if}
				</Button>
			{/each}
		</div>
	</DrawerContent>
</Drawer>
