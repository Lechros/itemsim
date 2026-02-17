<script lang="ts">
	import { page } from '$app/stores';
	import { GearIcon } from '$lib/components/icons';
	import { UIImage2 } from '$lib/components/ui-image';
	import { Badge } from '$lib/components/ui/badge';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as Drawer from '$lib/components/ui/drawer';
	import { Separator } from '$lib/components/ui/separator';
	import * as Tabs from '$lib/components/ui/tabs';
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
	import { ArrowLeft, Check, ChevronUp } from 'lucide-svelte';
	import { getContext } from 'svelte';
	import { fade } from 'svelte/transition';
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
	 * - mobile: single column / row1: back button / row2: pill / row3:
	 * - md: two columns / row1: back button / row2: pill / row3_col1: content / row3_col2: tooltip
	 * - lg: three columns / col1: aside tabs / col2-3_row1: back button / col2_row2: content / col3_row2: tooltip
	 */
</script>

<div
	class="mx-auto grid min-h-[calc(100dvh-3.5rem)] w-full max-w-6xl grid-cols-1 md:grid-cols-[minmax(0,1fr)_min-content] lg:grid-cols-[220px_minmax(0,1fr)_min-content]"
>
	<!-- Left: tab list (lg) -->
	<aside class="sticky hidden flex-col overflow-y-auto border-r px-3 pt-6 lg:col-start-1 lg:flex">
		{#each tabStore.tabs as tab}
			{@const isCurrent = tab.value === tabStore.currentTab.value}
			<Button
				variant={isCurrent ? 'default' : 'ghost'}
				size="lg"
				href={tab.disabled ? undefined : `${$page.url.pathname}?tab=${tab.value}`}
				disabled={tab.disabled}
				class={cn('relative justify-start text-sm font-medium', !isCurrent && 'text-foreground/80')}
			>
				{#if tab.icon}
					<tab.icon />
				{/if}
				{tab.label}
				{#if isCurrent}
					<div transition:fade={{ duration: 100 }} class="ml-auto">
						<Check />
					</div>
				{/if}
			</Button>
		{/each}
	</aside>

	<!-- Main wrapper -->
	<div class="col-start-1 flex flex-col lg:col-start-2">
		<!-- 뒤로 가기 -->
		<div class="border-b px-4 py-3">
			<Button variant="ghost" size="sm" href="/" class="text-muted-foreground">
				<ArrowLeft />
				인벤토리
			</Button>
		</div>

		<!-- pill 탭 (md~lg) -->
		<div
			class="bg-background/80 sticky top-14 z-50 flex border-b px-4 py-3 backdrop-blur lg:hidden"
		>
			<div
				bind:this={pillScrollEl}
				class="flex gap-1.5 overflow-x-auto"
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
					class="from-background absolute inset-y-0 left-4 w-4 bg-linear-to-r to-transparent"
				></div>
			{/if}
			{#if !scrollReachedRight}
				<div
					class="from-background absolute inset-y-0 right-4 w-4 bg-linear-to-l to-transparent"
				></div>
			{/if}
		</div>

		<!-- Center: enchant content (직각 테두리·배경으로 Card와 구분) -->
		<main>
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
		</main>
	</div>

	<!-- Right: tooltip -->
	<aside
		class="sticky hidden overflow-y-auto border-l px-3 pt-4 md:col-start-2 md:block lg:col-start-3"
	>
		<div>
			<GearTooltipRenderer
				{gear}
				tooltipVersion={settingsStore.tooltipVersion}
				tooltip1Options={settingsStore.tooltip1Options}
				tooltip2Options={settingsStore.tooltip2Options}
			/>
		</div>
	</aside>

	<!-- Mobile: bottom spacer -->
	<div class="h-28 md:hidden"></div>
	<!-- Mobile: bottom bar -->
	<Drawer.Root>
		<Drawer.Trigger
			class={cn(
				buttonVariants({ variant: 'outline' }),
				'bg-background/80 fixed inset-x-3 bottom-3 h-auto p-3 backdrop-blur md:hidden'
			)}
		>
			<div class="flex w-full gap-3">
				<div class="bg-muted flex size-14 items-center justify-center rounded-lg">
					<GearIcon icon={gear.shapeIcon} />
				</div>
				<div class="flex flex-col items-start">
					<h3 class="text-base leading-tight font-normal">{gear.name}</h3>
					<div class="mt-auto flex gap-1">
						<Badge variant="outline" class={cn(!gear.star && 'text-muted-foreground')}>
							<UIImage2 image={gear.starScroll ? 'blueStar' : 'star'} />
							{gear.star}
						</Badge>
						<Badge
							variant="outline"
							class={cn(!gear.scrollUpgradeCount && 'text-muted-foreground')}
						>
							<UIImage2 image="scrollEnhanced" />
							{gear.scrollUpgradeCount}
						</Badge>
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
