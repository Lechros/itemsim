<script lang="ts">
	import { ItemRawIcon } from '$lib/components/icons';
	import { SelectList, SelectListItem } from '$lib/components/select-list';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import { BalancedGrid } from '$lib/features/gear-enchant-ui/balanced-grid';
	import FormItem from '$lib/features/gear-enchant-ui/form/FormItem.svelte';
	import FormSection from '$lib/features/gear-enchant-ui/form/FormSection.svelte';
	import { getGearOptionStrings } from '$lib/utils';
	import { type Gear, type Scroll } from '@malib/gear';
	import { XIcon } from 'lucide-svelte';
	import SharedSections from '../components/SharedSections.svelte';
	import { getEtcScrolls, getOnlyScrolls } from '../model/etcScroll';

	let { gear }: { gear: Gear } = $props();

	let scrolls = $derived(getScrolls(gear));
	let selectedScroll = $state<Scroll | null>(scrolls.length === 1 ? scrolls[0] : null);

	function applyScroll(gear: Gear, scroll: Scroll, count: number = 1) {
		for (let i = 0; i < count; i++) {
			gear.applyScroll(scroll);
		}
	}

	function getScrolls(gear: Gear): Scroll[] {
		const onlyScrolls = getOnlyScrolls(gear);
		if (onlyScrolls.length > 0) {
			return onlyScrolls;
		}
		return getEtcScrolls(gear);
	}
</script>

<SelectList items={scrolls} selected={selectedScroll?.name} size={6} allowDeselect={false}>
	{#snippet children(scroll)}
		<SelectListItem
			value={scroll.name}
			class="rounded-none ps-4"
			onSelect={() => (selectedScroll = scroll)}
		>
			{#if scroll.icon}
				<ItemRawIcon icon={scroll.icon} />
			{/if}
			{scroll.name}
		</SelectListItem>
	{/snippet}
</SelectList>

<Separator />

{#if selectedScroll}
	{@const optionStrings = getGearOptionStrings(selectedScroll.option)}
	<FormSection>
		<div class="flex flex-col gap-5">
			<!-- Title -->
			<div class="flex h-9 items-center gap-2">
				{#if selectedScroll.icon}
					<ItemRawIcon icon={selectedScroll.icon} />
				{/if}
				<div class="text-sm font-medium">{selectedScroll.name}</div>
				<Button variant="ghost" size="icon" class="ml-auto" onclick={() => (selectedScroll = null)}>
					<XIcon />
				</Button>
			</div>

			<BalancedGrid
				items={optionStrings}
				size={6}
				class="gap-x-8 gap-y-0.5"
				classes={{ column: 'gap-y-0.5' }}
			>
				{#snippet itemRenderer(strings: [string, string])}
					<div class="text-sm">
						<span>{strings[0]}</span>
						<span class="font-semibold">{strings[1]}</span>
					</div>
				{/snippet}
			</BalancedGrid>

			<div class="flex flex-col justify-end gap-2 sm:flex-row">
				<Button onclick={() => applyScroll(gear, selectedScroll!)} disabled={!gear.canApplyScroll}>
					{selectedScroll.name} 사용하기
				</Button>
				<Button
					variant="outline"
					onclick={() => applyScroll(gear, selectedScroll!, gear.scrollUpgradeableCount)}
					disabled={!gear.canApplyScroll}
				>
					{gear.scrollUpgradeableCount}회 사용
				</Button>
			</div>
		</div>
	</FormSection>
{:else}
	<FormSection class="bg-muted/40">
		<FormItem>
			<p class="text-muted-foreground text-sm font-medium">주문서를 선택해 주세요.</p>
		</FormItem>
	</FormSection>
{/if}

<SharedSections {gear} />
