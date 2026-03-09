<script lang="ts">
	import { ItemRawIcon } from '$lib/components/icons';
	import { SelectList, SelectListItem } from '$lib/components/select-list';
	import { Button } from '$lib/components/ui/button';
	import * as InputGroup from '$lib/components/ui/input-group';
	import * as Select from '$lib/components/ui/select';
	import { Separator } from '$lib/components/ui/separator';
	import { Gear, type SoulData } from '@malib/gear';
	import { SearchIcon, XIcon } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';
	import FormControl from '../../form/FormControl.svelte';
	import FormItem from '../../form/FormItem.svelte';
	import FormLabel from '../../form/FormLabel.svelte';
	import FormSection from '../../form/FormSection.svelte';
	import {
		getMagnificentSoulDatas,
		getNormalSoulData,
		getSoulOptionString,
		getSoulSummaries,
		type SoulSummary
	} from './model/soul';

	type SelectedItem =
		| {
				summary: SoulSummary;
				type: 'normal';
				soul: SoulData;
		  }
		| {
				summary: SoulSummary;
				type: 'magnificent';
				souls: SoulData[];
				index: number;
		  };

	let { gear }: { gear: Gear } = $props();

	let searchQuery = $state('');
	let selectedItem: SelectedItem | null = $state(null);

	const soulSummaries = $derived(getSoulSummaries());
	const filteredSoulSummaries = $derived(
		soulSummaries.filter((soulSummary) => soulSummary.name.includes(searchQuery))
	);

	function selectSoulSummary(soulSummary: SoulSummary) {
		if (soulSummary.magnificent) {
			const souls = getMagnificentSoulDatas(soulSummary.id);
			selectedItem = {
				summary: soulSummary,
				type: 'magnificent',
				souls,
				index: 0
			};
		} else {
			selectedItem = {
				summary: soulSummary,
				type: 'normal',
				soul: getNormalSoulData(soulSummary.id)
			};
		}
	}
</script>

<FormSection class="px-4 py-3">
	<InputGroup.Root>
		<InputGroup.Addon align="inline-start">
			<SearchIcon />
		</InputGroup.Addon>
		<InputGroup.Input placeholder="소울 이름으로 검색할 수 있어요" bind:value={searchQuery} />
	</InputGroup.Root>
</FormSection>

<SelectList
	items={filteredSoulSummaries}
	selected={selectedItem?.summary.name}
	size={6}
	allowDeselect={false}
>
	{#snippet children(soulSummary)}
		<SelectListItem
			value={soulSummary.name}
			class="rounded-none ps-4"
			onSelect={() => selectSoulSummary(soulSummary)}
		>
			<ItemRawIcon icon={String(soulSummary.id)} />
			{soulSummary.name}
		</SelectListItem>
	{/snippet}
</SelectList>

<Separator />

{#if selectedItem}
	<FormSection class="gap-3">
		<!-- Title -->
		<div class="flex h-9 items-center gap-2">
			{#if selectedItem.summary.id}
				<ItemRawIcon icon={String(selectedItem.summary.id)} />
			{/if}
			<div class="text-sm font-medium">{selectedItem.summary.name}</div>
			<Button variant="ghost" size="icon" class="ml-auto" onclick={() => (selectedItem = null)}>
				<XIcon />
			</Button>
		</div>
		{#if selectedItem.type === 'magnificent'}
			<Select.Root
				type="single"
				bind:value={
					() => String((selectedItem as { index: number }).index),
					(v) => {
						if (selectedItem?.type !== 'magnificent') return;
						selectedItem.index = Number(v);
					}
				}
			>
				<Select.Trigger class="w-full sm:w-60" size="sm">
					{getSoulOptionString(selectedItem.souls[selectedItem.index].option)}
				</Select.Trigger>
				<Select.Content>
					{#each selectedItem.souls as soul, index (index)}
						<Select.Item value={String(index)}>
							{getSoulOptionString(soul.option)}
						</Select.Item>
					{/each}
				</Select.Content>
			</Select.Root>
		{:else}
			<div class="flex h-8 items-center">
				<div class="text-sm">
					{getSoulOptionString(selectedItem.soul.option)}
				</div>
			</div>
		{/if}

		<FormControl>
			<Button
				variant="default"
				size="sm"
				disabled={!selectedItem ||
					(!selectedItem.summary.magnificent &&
						gear.soul &&
						gear.soul.name === selectedItem.summary.name)}
				onclick={() => {
					if (gear.canApplySoulEnchant) {
						gear.applySoulEnchant();
					}
					if (selectedItem) {
						const soul =
							selectedItem.type === 'normal'
								? selectedItem.soul
								: selectedItem.souls[selectedItem.index];
						gear.setSoul(soul);
					}
				}}
			>
				{#if !gear.soulEnchanted}
					소울 인챈트 및 장착
				{:else}
					{selectedItem.summary.name} 장착
				{/if}
			</Button>
		</FormControl>
	</FormSection>
{:else}
	<FormSection class="bg-muted/50">
		<FormItem>
			<p class="text-muted-foreground text-sm font-medium">장착할 소울을 선택해 주세요.</p>
		</FormItem>
	</FormSection>
{/if}

<FormSection>
	<FormItem>
		<FormLabel title="소울 웨폰 관리" />
		<FormControl>
			<Button
				variant="outline"
				size="sm"
				onclick={() => gear.applySoulEnchant()}
				disabled={gear.soulEnchanted}
			>
				소울 인챈트
			</Button>
			<Button
				variant="danger"
				size="sm"
				onclick={() => {
					gear.resetSoulEnchant();
					gear.applySoulEnchant();
				}}
				disabled={!gear.soul}
			>
				소울 해제
			</Button>
		</FormControl>
	</FormItem>
</FormSection>

<FormSection>
	<FormItem>
		<FormLabel title="소울 웨폰 초기화" />
		<FormControl>
			<Button
				variant="destructive"
				size="sm"
				onclick={() => {
					gear.resetSoulEnchant();
					toast.success('소울 웨폰을 초기화했어요.', {
						position: 'top-center',
						duration: 2000
					});
				}}
				disabled={!gear.soulEnchanted}
			>
				초기화
			</Button>
		</FormControl>
	</FormItem>
</FormSection>
