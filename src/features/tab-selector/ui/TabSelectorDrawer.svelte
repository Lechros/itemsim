<script lang="ts">
	import type { Tab, TabStore } from '$lib/features/tab-selector/model/TabStore.svelte';
	import { Button } from '$lib/shared/shadcn/components/ui/button';
	import { Drawer, DrawerContent, DrawerTrigger } from '$lib/shared/shadcn/components/ui/drawer';
	import { Check, ChevronDown } from 'lucide-svelte';

	let {
		tabStore
	}: {
		tabStore: TabStore;
	} = $props();

	let open = $state(false);
	const buttonClass = 'h-12 w-full justify-start px-4! text-xl';

	function handleButtonClick(tab: Tab) {
		tabStore.setTab(tab.value);
		open = false;
	}

	function getHref(tab: Tab) {
		return `?tab=${tab.value}`;
	}
</script>

<Drawer bind:open>
	<DrawerTrigger>
		<Button variant="ghost" size="lg" class="flex items-center gap-2">
			<h2 class="text-2xl font-semibold">{tabStore.currentTab.label}</h2>
			<ChevronDown />
		</Button>
	</DrawerTrigger>
	<DrawerContent>
		<div class="mx-auto flex w-full max-w-screen-md flex-col px-2 pt-4">
			{#each tabStore.tabs as tab}
				{@const isCurrent = tab.value === tabStore.currentTab.value}
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
