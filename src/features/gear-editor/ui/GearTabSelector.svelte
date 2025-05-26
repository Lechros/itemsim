<script lang="ts">
	import { Button } from '$lib/shared/shadcn/components/ui/button';
	import { Drawer, DrawerContent, DrawerTrigger } from '$lib/shared/shadcn/components/ui/drawer';
	import { Check, ChevronDown } from 'lucide-svelte';

	interface CurrentTab {
		label: string;
		value: string;
	}

	interface Tab {
		label: string;
		value: string;
		disabled: boolean;
	}

	let {
		currentTab = $bindable<Tab>(),
		tabs
	}: {
		currentTab: CurrentTab;
		tabs: Tab[];
	} = $props();

	let open = $state(false);
</script>

<Drawer bind:open>
	<DrawerTrigger>
		<Button variant="ghost" size="lg" class="-ml-4 flex items-center gap-2">
			<h2 class="text-2xl font-semibold">{currentTab.label}</h2>
			<ChevronDown />
		</Button>
	</DrawerTrigger>
	<DrawerContent>
		<div class="mx-auto w-full max-w-screen-md">
			<div class="flex flex-col px-2 pt-4">
				{#each tabs as tab}
					<Button
						variant={tab.value === currentTab.value ? 'default' : 'ghost'}
						href="?tab={tab.value}"
						class="h-12 w-full justify-start px-4! text-xl"
						onclick={() => {
							currentTab = tab;
							open = false;
						}}
						disabled={tab.disabled}
					>
						{tab.label}
						{#if tab.value === currentTab.value}
							<Check />
						{/if}
					</Button>
				{/each}
			</div>
		</div>
	</DrawerContent>
</Drawer>
