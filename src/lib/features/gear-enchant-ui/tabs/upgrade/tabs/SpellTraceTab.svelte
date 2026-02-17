<script lang="ts">
	import { ItemRawIcon } from '$lib/components/icons';
	import { SelectList, SelectListItem } from '$lib/components/select-list';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import { BalancedGrid } from '$lib/features/gear-enchant-ui/balanced-grid';
	import FormItem from '$lib/features/gear-enchant-ui/form/FormItem.svelte';
	import FormSection from '$lib/features/gear-enchant-ui/form/FormSection.svelte';
	import { cn, getGearOptionStrings } from '$lib/utils';
	import { type Gear, type SpellTrace } from '@malib/gear';
	import { XIcon } from 'lucide-svelte';
	import SharedSections from '../components/SharedSections.svelte';
	import { getSpellTraceScrolls } from '../model/spellTrace';
	import FormControl from '$lib/features/gear-enchant-ui/form/FormControl.svelte';

	let { gear }: { gear: Gear } = $props();

	let scrolls = $derived(getSpellTraceScrolls(gear));
	let selectedScroll = $state<SpellTrace | null>(null);

	function applySpellTrace(gear: Gear, scroll: SpellTrace, count: number = 1) {
		for (let i = 0; i < count; i++) {
			gear.applySpellTrace(scroll.type, scroll.rate);
		}
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
	{@const optionStrings = getGearOptionStrings(selectedScroll?.option ?? {})}
	<FormSection class={cn("gap-3", !selectedScroll && 'bg-muted')}>
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

		<FormControl>
			<Button
				size="sm"
				onclick={() => applySpellTrace(gear, selectedScroll!)}
				disabled={!gear.canApplyScroll}
			>
				{selectedScroll.name} 사용하기
			</Button>
			<Button
				variant="outline"
				size="sm"
				onclick={() => applySpellTrace(gear, selectedScroll!, gear.scrollUpgradeableCount)}
				disabled={!gear.canApplyScroll}
			>
				{gear.scrollUpgradeableCount}회 사용
			</Button>
		</FormControl>
	</FormSection>
{:else}
	<FormSection class="bg-muted/50">
		<FormItem>
			<p class="text-muted-foreground text-sm font-medium">주문서를 선택해 주세요.</p>
		</FormItem>
	</FormSection>
{/if}

<SharedSections {gear} />
