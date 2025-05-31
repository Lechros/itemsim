<script lang="ts">
	import { Button } from '$lib/shared/shadcn/components/ui/button';
	import { Check } from 'lucide-svelte';
	import type { TabInfo } from '../model/type';

	let {
		tab: tabValue = $bindable(''),
		tabs
	}: {
		tab?: string;
		tabs: TabInfo[];
	} = $props();

	let open = $state(false);
	let currentTab = $state<TabInfo>(tabs.find((t) => t.value === tabValue) ?? tabs[0]);

	const buttonClass = 'h-12 w-full justify-between px-4! text-xl';

	function handleButtonClick(tab: TabInfo) {
		currentTab = tab;
		tabValue = tab.value;
		open = false;
	}

	function getHref(tab: TabInfo) {
		return `?tab=${tab.value}`;
	}
</script>

<div class="flex w-full flex-col">
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
