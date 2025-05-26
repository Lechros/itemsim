<script lang="ts">
	import { convertGearOptionToSummaries } from '$lib/entities/gear-tooltip2/model/option';
	import { ItemRawIcon } from '$lib/entities/item-icon';
	import { Button } from '$lib/shared/shadcn/components/ui/button';
	import { Card } from '$lib/shared/shadcn/components/ui/card';
	import { ScrollArea } from '$lib/shared/shadcn/components/ui/scroll-area';
	import { TabsContent, TabsList, TabsTrigger } from '$lib/shared/shadcn/components/ui/tabs';
	import Tabs from '$lib/shared/shadcn/components/ui/tabs/tabs.svelte';
	import { Toggle } from '$lib/shared/shadcn/components/ui/toggle';
	import { cn } from '$lib/shared/shadcn/utils';
	import {
		Gear,
		getSpellTraceScroll,
		SpellTraceType,
		type Scroll,
		type SpellTrace,
		type SpellTraceRate
	} from '@malib/gear';
	import { Check, X } from 'lucide-svelte';
	import { fade } from 'svelte/transition';

	let { gear }: { gear: Gear } = $props();

	let applyFunction: (() => void) | null = $state(null);

	let spellTraceScrolls = $derived(getSpellTraceScrolls());

	let selectedScroll = $state<Scroll | null>(null);

	function getSpellTraceScrolls() {
		const scrolls: SpellTrace[] = [];
		const types = [
			SpellTraceType.str,
			SpellTraceType.dex,
			SpellTraceType.int,
			SpellTraceType.luk,
			SpellTraceType.maxHp,
			SpellTraceType.allStat
		];
		const rates = [100, 70, 30, 15] as const;
		for (const type of types) {
			for (const rate of rates) {
				try {
					const scroll = getSpellTraceScroll(gear, type, rate);
					scroll.icon = getSpellTraceIcon(rate);
					scrolls.push(scroll);
				} catch {}
			}
		}
		return scrolls;
	}

	function getSpellTraceIcon(rate: SpellTraceRate) {
		switch (rate) {
			case 100:
				return '2040000';
			case 70:
				return '2040008';
			case 30:
				return '2040001';
			case 15:
				return '2040020';
		}
	}
</script>

<div class="flex flex-col gap-y-4">
	<div class="mx-auto w-full max-w-xs">
		<Card class="flex flex-col gap-y-4 p-4">
			<div class="text-center">
				강화 <span class="font-semibold">{gear.scrollUpgradeCount}</span>회 (잔여
				<span class="font-semibold">{gear.scrollUpgradeableCount}</span>회, 복구 가능
				<span class="font-semibold">{gear.scrollResilienceCount}</span>회)
			</div>
		</Card>
	</div>

	<Tabs value="spellTrace" class="gap-y-6" onValueChange={() => (applyFunction = null)}>
		<TabsList class="grid w-full grid-cols-3">
			<TabsTrigger value="spellTrace">주문의 흔적</TabsTrigger>
			<TabsTrigger value="chaos">혼돈의 주문서</TabsTrigger>
			<TabsTrigger value="etc">기타 주문서</TabsTrigger>
		</TabsList>
		<TabsContent value="spellTrace">
			<ScrollArea class="h-37 sm:h-73">
				<div class="flex flex-col gap-px">
					{#each spellTraceScrolls as scroll (scroll.name)}
						<Toggle
							class="h-12 justify-start"
							onPressedChange={(pressed) => {
								if (pressed) {
									selectedScroll = scroll;
									applyFunction = () => {
										gear.applySpellTrace(scroll.type, scroll.rate);
									};
								}
							}}
							pressed={selectedScroll?.name === scroll.name}
						>
							<ItemRawIcon icon={scroll.icon!} />
							{scroll.name}
							{#if selectedScroll?.name === scroll.name}
								<div class="ml-auto p-2" transition:fade={{ duration: 100 }}>
									<Check />
								</div>
							{/if}
						</Toggle>
					{/each}
				</div>
			</ScrollArea>
		</TabsContent>
		<TabsContent value="chaos"></TabsContent>
		<TabsContent value="etc"></TabsContent>
	</Tabs>

	<Card class="p-4">
		{#if selectedScroll}
			{@const summaries = convertGearOptionToSummaries(selectedScroll.option)}
			{@const leftSummaries = summaries.slice(0, Math.ceil(summaries.length / 2))}
			{@const rightSummaries = summaries.slice(Math.ceil(summaries.length / 2))}
			<div class="flex flex-col gap-y-2">
				<div class="flex items-center gap-x-2">
					<ItemRawIcon icon={selectedScroll.icon!} />
					<div class="text-sm font-medium">
						{selectedScroll.name}
					</div>
					<Button variant="ghost" size="icon" class="ml-auto">
						<X />
					</Button>
				</div>
				<div
					class={cn(
						'grid h-30 auto-rows-min justify-start',
						summaries.length > 6 && 'sm:grid-cols-2'
					)}
				>
					<div class={cn('px-2', summaries.length > 6 && 'sm:border-r')}>
						{#each leftSummaries as summary}
							<div class="text-sm">{summary}</div>
						{/each}
					</div>
					<div class="px-2">
						{#each rightSummaries as summary}
							<div class="text-sm">{summary}</div>
						{/each}
					</div>
				</div>
			</div>
		{:else}
			<div class="text-muted-foreground text-sm">주문서를 선택해 주세요.</div>
		{/if}
	</Card>

	<div class="flex flex-col gap-y-4">
		<div class="flex gap-x-2">
			<Button onclick={() => applyFunction?.()} disabled={!gear.canApplyScroll || !applyFunction}
				>사용하기</Button
			>
			<Button
				variant="outline"
				onclick={() => {
					const count = gear.scrollUpgradeableCount;
					for (let i = 0; i < count; i++) {
						applyFunction?.();
					}
				}}
				disabled={!gear.canApplyScroll || !applyFunction}
			>
				{gear.scrollUpgradeableCount}회 사용
			</Button>
		</div>
	</div>

	<div class="flex gap-x-2">
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
			초기화
		</Button>
	</div>
</div>
