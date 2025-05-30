<script lang="ts">
	import { getGearOptionStrings } from '$lib/entities/item-string';
	import { SelectedItemCard } from '$lib/entities/selected-item-card';
	import { Button } from '$lib/shared/shadcn/components/ui/button';
	import { Card } from '$lib/shared/shadcn/components/ui/card';
	import { Separator } from '$lib/shared/shadcn/components/ui/separator';
	import { Tabs, TabsContent, TabsList, TabsTrigger } from '$lib/shared/shadcn/components/ui/tabs';
	import { cn } from '$lib/shared/shadcn/utils';
	import { ButtonGroup } from '$lib/shared/ui';
	import { Gear, type Scroll } from '@malib/gear';
	import { tabs } from '../model/tabs';
	import ChaosScrollTab from './ChaosScrollTab.svelte';
	import EtcScrollTab from './EtcScrollTab.svelte';
	import SpellTraceTab from './SpellTraceTab.svelte';

	let { gear }: { gear: Gear } = $props();

	let selectedScroll = $state<Scroll | null>(null);
	let apply: (() => void) | null = $state(null);
	let getOptionStrings: (() => [string, string][]) | null = $state(null);

	const selectScroll = (
		scroll: Scroll | null,
		applyFunc?: () => void,
		getOptionStringsFunc?: () => [string, string][]
	) => {
		if (scroll) {
			selectedScroll = scroll;
			apply = applyFunc ?? (() => gear.applyScroll(scroll));
			getOptionStrings = getOptionStringsFunc ?? (() => getGearOptionStrings(scroll.option));
		} else {
			selectedScroll = null;
			apply = null;
			getOptionStrings = null;
		}
	};

	const activeTabs = $derived(tabs.filter((tab) => tab.show?.(gear)));

	let initialTab = $derived(activeTabs[0].value);
</script>

<div class="flex flex-col gap-y-4">
	<div class="mx-auto w-full max-w-xs">
		<Card class="flex flex-col gap-y-4 p-4">
			<div class="text-center">
				주문서 강화 <span class="font-semibold">{gear.scrollUpgradeCount}</span>회 (잔여
				<span class="font-semibold">{gear.scrollUpgradeableCount}</span>회, 복구 가능
				<span class="font-semibold">{gear.scrollResilienceCount}</span>회)
			</div>
		</Card>
	</div>

	<Tabs value={initialTab} class="gap-y-4">
		{#if activeTabs.length > 1}
			<TabsList
				class={cn(
					'grid w-full',
					activeTabs.length === 2 && 'grid-cols-2',
					activeTabs.length === 3 && 'grid-cols-3'
				)}
			>
				{#each activeTabs as tab}
					<TabsTrigger value={tab.value}>{tab.label}</TabsTrigger>
				{/each}
			</TabsList>
		{:else if activeTabs.length === 1}
			<div class="px-2">
				<h4 class="text-lg font-semibold">
					{activeTabs[0].label}
				</h4>
			</div>
		{/if}
		<TabsContent value="spellTrace">
			<SpellTraceTab {gear} {selectedScroll} {selectScroll} />
		</TabsContent>
		<TabsContent value="chaos">
			<ChaosScrollTab {gear} {selectScroll} />
		</TabsContent>
		<TabsContent value="etc">
			<EtcScrollTab {gear} {selectedScroll} {selectScroll} />
		</TabsContent>
	</Tabs>

	<SelectedItemCard
		selectedItem={selectedScroll}
		optionStrings={getOptionStrings?.()}
		clearable
		onClear={() => selectScroll(null)}
	>
		{#snippet footer()}
			<ButtonGroup>
				<Button onclick={() => apply?.()} disabled={!apply || !gear.canApplyScroll}>
					{selectedScroll?.name} 사용하기
				</Button>
				<Button
					variant="outline"
					onclick={() => {
						const count = gear.scrollUpgradeableCount;
						for (let i = 0; i < count; i++) {
							apply?.();
						}
					}}
					disabled={!gear.canApplyScroll || !apply}
				>
					{gear.scrollUpgradeableCount}회 사용
				</Button>
			</ButtonGroup>
		{/snippet}
	</SelectedItemCard>

	<Separator />

	<ButtonGroup>
		<Button
			variant="outline"
			class="text-destructive hover:text-destructive/90"
			onclick={() => gear.applyScrollFail()}
			disabled={!gear.canApplyScrollFail}
		>
			주문서 실패
		</Button>
		<Button
			variant="outline"
			onclick={() => gear.applyResileScroll()}
			disabled={!gear.canApplyResileScroll}
		>
			주문서 복구
		</Button>
		<Button
			variant="destructive"
			onclick={() => gear.resetUpgrade()}
			disabled={!gear.canResetUpgrade}
		>
			주문서 강화 초기화
		</Button>
	</ButtonGroup>
</div>
