<script lang="ts">
	import { ItemRawIcon } from '$lib/components/icons';
	import { Gear } from '@malib/gear';
	import { Tabs } from 'bits-ui';
	import LineTabsTrigger from '../../tab/LineTabsTrigger.svelte';
	import SoulAmplificationTab from './tabs/SoulAmplificationTab.svelte';
	import SoulEnchantTab from './tabs/SoulEnchantTab.svelte';

	let { gear }: { gear: Gear } = $props();

	let currentTab = $state('soulEnchant');
</script>

<div class="flex flex-col">
	<Tabs.Root bind:value={currentTab}>
		<Tabs.List class="grid w-full grid-cols-2">
			<LineTabsTrigger value="soulEnchant" class="border-r px-2">
				<div class="item-raw-icon-wrapper flex size-4 items-center justify-center">
					<ItemRawIcon icon="2590008" scale={0.6} />
				</div>
				소울 부여
			</LineTabsTrigger>
			<LineTabsTrigger value="soulAmplification" class="px-2">
				<div class="item-raw-icon-wrapper flex size-4 items-center justify-center">
					<ItemRawIcon icon="2539020" scale={0.6} />
				</div>
				소울 증폭 · 잠재능력
			</LineTabsTrigger>
		</Tabs.List>
		<Tabs.Content value="soulEnchant" class="flex flex-col">
			<SoulEnchantTab {gear} />
		</Tabs.Content>
		<Tabs.Content value="soulAmplification" class="flex flex-col">
			<SoulAmplificationTab {gear} bind:currentTab />
		</Tabs.Content>
	</Tabs.Root>
</div>

<style>
	.item-raw-icon-wrapper :global(img) {
		image-rendering: auto;
	}
</style>
