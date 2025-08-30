<script lang="ts">
	import type { Tab, TabStore } from '$lib/features/tab-selector/model/TabStore.svelte.js';
	import { Button } from '$lib/components/ui/button';
	import { Check } from 'lucide-svelte';

	let {
		tabStore
	}: {
		tabStore: TabStore;
	} = $props();

	let open = $state(false);

	const buttonClass = 'h-12 w-full justify-between px-4! text-xl';

	function handleButtonClick(tab: Tab) {
		tabStore.setTab(tab.value);
		open = false;
	}

	function getHref(tab: Tab) {
		return `?tab=${tab.value}`;
	}
</script>

<div class="flex w-full flex-col">
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
