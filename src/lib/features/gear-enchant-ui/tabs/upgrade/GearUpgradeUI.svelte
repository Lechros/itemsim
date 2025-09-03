<script lang="ts">
	import { BalancedGrid } from '$lib/entities/balanced-grid';
	import { ItemCard, ItemCardContent, ItemCardFooter } from '$lib/entities/item-card';
	import { Button } from '$lib/components/ui/button';
	import { Card } from '$lib/components/ui/card';
	import { Separator } from '$lib/components/ui/separator';
	import { Tabs, TabsContent, TabsList, TabsTrigger } from '$lib/components/ui/tabs';
	import { cn, getGearOptionStrings } from '$lib/utils';
	import { ButtonGroup } from '$lib/shared/ui';
	import { Gear, type Scroll } from '@malib/gear';
	import { toast } from 'svelte-sonner';
	import { tabs } from './model/tabs';
	import ChaosScrollTab from './tabs/ChaosScrollTab.svelte';
	import EtcScrollTab from './tabs/EtcScrollTab.svelte';
	import SpellTraceTab from './tabs/SpellTraceTab.svelte';

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
	let currentTab = $state('');
</script>

<div class="flex flex-col gap-y-4">
	<div class="mx-auto w-full max-w-xs lg:hidden">
		<Card class="flex flex-col gap-y-4 p-4">
			<div class="text-center">
				주문서 강화 <span class="font-semibold">{gear.scrollUpgradeCount}</span>회 (잔여
				<span class="font-semibold">{gear.scrollUpgradeableCount}</span>회, 복구 가능
				<span class="font-semibold">{gear.scrollResilienceCount}</span>회)
			</div>
		</Card>
	</div>

	<Tabs value={initialTab} class="gap-y-4" onValueChange={(value) => (currentTab = value)}>
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
			<ChaosScrollTab {gear} />
		</TabsContent>
		<TabsContent value="etc">
			<EtcScrollTab {gear} {selectedScroll} {selectScroll} />
		</TabsContent>
	</Tabs>

	{#if currentTab !== 'chaos'}
		<ItemCard
			item={selectedScroll}
			clearable
			onClear={() => selectScroll(null)}
			placeholder="주문서를 선택해 주세요."
		>
			<ItemCardContent>
				{@const optionStrings = getOptionStrings?.()}
				{#if optionStrings}
					<BalancedGrid items={optionStrings} size={6} class="sm:h-30">
						{#snippet itemRenderer(strings: [string, string])}
							<div class="text-sm">
								<span>{strings[0]}</span>
								<span class="font-semibold">{strings[1]}</span>
							</div>
						{/snippet}
					</BalancedGrid>
				{:else}
					<div class="sm:h-30"></div>
				{/if}
			</ItemCardContent>
			<ItemCardFooter>
				{#if selectedScroll}
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
				{:else}
					<div class="sm:h-9"></div>
				{/if}
			</ItemCardFooter>
		</ItemCard>
	{/if}

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
			onclick={() => {
				gear.resetUpgrade();
				toast.success('주문서 강화를 초기화했어요.', {
					position: 'top-center',
					duration: 2000
				});
			}}
			disabled={!gear.canResetUpgrade}
		>
			주문서 강화 초기화
		</Button>
	</ButtonGroup>
</div>
