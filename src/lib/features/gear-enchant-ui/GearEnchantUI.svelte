<script lang="ts">
	import { page } from '$app/stores';
	import { GearIcon } from '$lib/components/icons';
	import { UIImage2 } from '$lib/components/ui-image';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import * as Drawer from '$lib/components/ui/drawer';
	import { Separator } from '$lib/components/ui/separator';
	import * as Tabs from '$lib/components/ui/tabs';
	import TabSelectorList from '$lib/features/gear-enchant-ui/tab-selector/TabSelectorList.svelte';
	import { createTabStore } from '$lib/features/gear-enchant-ui/tab-selector/TabStore.svelte';
	import GearAddOptionUI from '$lib/features/gear-enchant-ui/tabs/add-option/GearAddOptionUI.svelte';
	import GearAttributeUI from '$lib/features/gear-enchant-ui/tabs/attributes/GearAttributeUI.svelte';
	import GearExceptionalUI from '$lib/features/gear-enchant-ui/tabs/exceptional/GearExceptionalUI.svelte';
	import GearAdditionalPotentialUI from '$lib/features/gear-enchant-ui/tabs/potential/GearAdditionalPotentialUI.svelte';
	import GearPotentialUI from '$lib/features/gear-enchant-ui/tabs/potential/GearPotentialUI.svelte';
	import GearSoulWeaponUI from '$lib/features/gear-enchant-ui/tabs/soul-weapon/GearSoulWeaponUI.svelte';
	import GearStarforceUI from '$lib/features/gear-enchant-ui/tabs/starforce/GearStarforceUI.svelte';
	import GearUpgradeUI from '$lib/features/gear-enchant-ui/tabs/upgrade/GearUpgradeUI.svelte';
	import { GearTooltipRenderer } from '$lib/features/gear-tooltip-renderer';
	import type { SettingsStore } from '$lib/stores/settings.svelte';
	import { cn } from '$lib/utils';
	import { PotentialGrade, type Gear } from '@malib/gear';
	import { ArrowLeft, ChevronUp } from 'lucide-svelte';
	import { getContext } from 'svelte';
	import GearManageUI from './tabs/manage/GearManageUI.svelte';
	import { tabs } from './tabs/tabs';

	let {
		gear,
		seq,
		initialTab,
		onGearUpdated
	}: {
		gear: Gear;
		seq: number;
		initialTab?: string;
		onGearUpdated?: (
			newGear: import('@malib/gear').GearData,
			newHash: string
		) => void | Promise<void>;
	} = $props();

	let pillScrollEl: HTMLDivElement | null = $state(null);
	let scrollReachedLeft = $state(true);
	let scrollReachedRight = $state(true);

	function updatePillScrollReached() {
		const el = pillScrollEl;
		if (!el) return;
		const { scrollLeft, scrollWidth, clientWidth } = el;
		scrollReachedLeft = scrollLeft <= 0;
		scrollReachedRight = scrollLeft + clientWidth >= scrollWidth - 1;
	}

	$effect(() => {
		const el = pillScrollEl;
		if (!el) return;
		updatePillScrollReached();
		const onScroll = () => updatePillScrollReached();
		const ro = new ResizeObserver(updatePillScrollReached);
		el.addEventListener('scroll', onScroll, { passive: true });
		ro.observe(el);
		return () => {
			el.removeEventListener('scroll', onScroll);
			ro.disconnect();
		};
	});

	const tabStore = $derived(
		createTabStore(
			tabs.map((tab) => ({ ...tab, disabled: tab.disabled?.(gear) })),
			initialTab
		)
	);

	const settingsStore = getContext<SettingsStore>('settingsStore');

	function getPotentialTitle(grade: PotentialGrade) {
		switch (grade) {
			case PotentialGrade.Normal:
				return 'potentialTitleNormal';
			case PotentialGrade.Rare:
				return 'potentialTitleRare';
			case PotentialGrade.Epic:
				return 'potentialTitleEpic';
			case PotentialGrade.Unique:
				return 'potentialTitleUnique';
			case PotentialGrade.Legendary:
				return 'potentialTitleLegendary';
		}
	}

	/**
	 * Grid
	 * - default: col=1, row1=back, row2=pill, row3=tooltip-button, row4=main
	 * - md: col=2, row1=back, row2=pill, row3=main+tooltip
	 * - lg: col=3, row1=back, row2=tabs+main+tooltip
	 */
</script>

<div class="mx-auto w-full max-w-6xl px-4 py-6">
	<!-- Back button -->
	<div class="-ml-2 lg:ml-[212px]">
		<Button variant="ghost" size="sm" href="/" class="text-muted-foreground mb-4">
			<ArrowLeft />
			뒤로
		</Button>
	</div>

	<!-- Pill tabs -->
	<div class="relative -mx-4 mb-4 flex lg:hidden">
		<div
			bind:this={pillScrollEl}
			class="flex gap-1.5 overflow-x-auto px-4"
			style="scrollbar-width: none"
		>
			{#each tabStore.tabs as tab}
				{@const isCurrent = tab.value === tabStore.currentTab.value}
				<Button
					size="sm"
					variant={isCurrent ? 'default' : 'secondary'}
					href={tab.disabled ? undefined : `${$page.url.pathname}?tab=${tab.value}`}
					disabled={tab.disabled}
					data-pill-tab={tab.value}
					class={cn('shrink-0 rounded-full px-4')}
				>
					{tab.label}
				</Button>
			{/each}
		</div>
		{#if !scrollReachedLeft}
			<div
				class="from-background absolute inset-y-0 left-0 w-4 bg-linear-to-r to-transparent"
			></div>
		{/if}
		{#if !scrollReachedRight}
			<div
				class="from-background absolute inset-y-0 right-0 w-4 bg-linear-to-l to-transparent"
			></div>
		{/if}
	</div>

	<!-- Main columns -->
	<div
		class="grid grid-cols-1 gap-2 sm:gap-6 md:grid-cols-[1fr_min-content] lg:grid-cols-[200px_1fr_min-content]"
	>
		<!-- Left: tab list-->
		<aside class="sticky col-start-1 hidden overflow-y-auto lg:block" style="scrollbar-width: none">
			<div class="p flex flex-col">
				<TabSelectorList {tabStore} />
			</div>
		</aside>

		<!-- Center: enchant content -->
		<main class="col-start-1 lg:col-start-2">
			<div class="mx-auto flex max-w-2xl flex-col gap-4">
				<Tabs.Root value={tabStore.currentTab.value}>
					<Tabs.Content value="default">
						<GearManageUI {gear} {seq} {onGearUpdated} />
					</Tabs.Content>
					<Tabs.Content value="props">
						<GearAttributeUI {gear} />
					</Tabs.Content>
					<Tabs.Content value="starforce">
						<GearStarforceUI {gear} />
					</Tabs.Content>
					<Tabs.Content value="scroll">
						<GearUpgradeUI {gear} />
					</Tabs.Content>
					<Tabs.Content value="bonus">
						<GearAddOptionUI {gear} />
					</Tabs.Content>
					<Tabs.Content value="pot">
						<GearPotentialUI {gear} />
					</Tabs.Content>
					<Tabs.Content value="addiPot">
						<GearAdditionalPotentialUI {gear} />
					</Tabs.Content>
					<Tabs.Content value="exceptional">
						<GearExceptionalUI {gear} />
					</Tabs.Content>
					<Tabs.Content value="soul">
						<GearSoulWeaponUI {gear} />
					</Tabs.Content>
				</Tabs.Root>
			</div>
		</main>

		<!-- Right: tooltip. md row3 col2 | xl row2 col3 -->
		<aside class="sticky col-start-1 hidden overflow-y-auto md:col-start-2 md:block lg:col-start-3">
			<div>
				<GearTooltipRenderer
					{gear}
					tooltipVersion={settingsStore.tooltipVersion}
					tooltip1Options={settingsStore.tooltip1Options}
					tooltip2Options={settingsStore.tooltip2Options}
				/>
			</div>
		</aside>
	</div>

	<!-- Mobile: bottom bar -->
	<Drawer.Root>
		<Drawer.Trigger>
			<Button variant="outline" class="fixed inset-x-3 bottom-3 h-auto justify-start p-3 md:hidden">
				<div class="flex w-full gap-3">
					<div class="bg-muted flex size-14 items-center justify-center rounded-lg">
						<GearIcon icon={gear.shapeIcon} />
					</div>
					<div class="flex flex-col items-start">
						<div class="text-lg font-medium">{gear.name}</div>
						<div class="mt-auto flex gap-1">
							{#if gear.star}
								<Badge variant="outline">
									<UIImage2 image={gear.starScroll ? 'blueStar' : 'star'} />
									{gear.star}
								</Badge>
							{/if}
							{#if gear.scrollUpgradeCount}
								<Badge variant="outline">
									<UIImage2 image="scrollEnhanced" />
									{gear.scrollUpgradeCount}
								</Badge>
							{/if}
							<Badge variant="outline" class="gap-2">
								<UIImage2 image={getPotentialTitle(gear.potentialGrade)} />
								<Separator orientation="vertical" />
								<UIImage2 image={getPotentialTitle(gear.additionalPotentialGrade)} />
							</Badge>
							{#if gear.exceptionalUpgradeCount > 0}
								<Badge variant="outline">
									<UIImage2 image="exceptionalNormal" />
								</Badge>
							{/if}
						</div>
					</div>
					<div class="my-auto ml-auto h-full">
						<ChevronUp class="size-5" />
					</div>
				</div>
			</Button>
		</Drawer.Trigger>
		<Drawer.Content>
			<div class="flex max-h-[calc(80dvh-3rem)] flex-col items-center overflow-y-auto py-4">
				<GearTooltipRenderer
					{gear}
					tooltipVersion={settingsStore.tooltipVersion}
					tooltip1Options={settingsStore.tooltip1Options}
					tooltip2Options={settingsStore.tooltip2Options}
				/>
			</div>
		</Drawer.Content>
	</Drawer.Root>
</div>
