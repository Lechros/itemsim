<script lang="ts">
	import { ItemCard, ItemCardContent, ItemCardFooter } from '$lib/features/gear-enchant-ui/item-card';
	import { ItemRawIcon } from '$lib/components/icons';
	import { SelectList, SelectListItem } from '$lib/components/select-list';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import {
		Select,
		SelectContent,
		SelectItem,
		SelectTrigger
	} from '$lib/components/ui/select';
	import { ButtonGroup } from '$lib/components/button-group';
	import { Gear, type SoulData } from '@malib/gear';
	import { toast } from 'svelte-sonner';
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

<div class="flex flex-col gap-y-4">
	<div>
		<Input type="search" placeholder="소울 이름으로 검색할 수 있어요" bind:value={searchQuery} />
	</div>

	<SelectList
		selected={selectedItem ? String(selectedItem.summary.id) : null}
		size={9}
		allowDeselect={false}
		items={filteredSoulSummaries}
	>
		{#snippet children(soulSummary)}
			<SelectListItem
				value={String(soulSummary.id)}
				onSelect={() => selectSoulSummary(soulSummary)}
			>
				<ItemRawIcon icon={String(soulSummary.id)} />
				{soulSummary.name}
			</SelectListItem>
		{/snippet}
	</SelectList>

	<ItemCard
		item={selectedItem
			? { name: selectedItem.summary.name, icon: String(selectedItem.summary.id) }
			: null}
		placeholder="장착할 소울을 선택해 주세요."
		clearable
		onClear={() => (selectedItem = null)}
	>
		<ItemCardContent>
			{#if selectedItem}
				{#if selectedItem.type === 'magnificent'}
					<Select
						type="single"
						bind:value={
							() => String((selectedItem as { index: number }).index),
							(v) => {
								if (selectedItem?.type !== 'magnificent') return;
								selectedItem.index = Number(v);
							}
						}
					>
						<SelectTrigger class="w-full max-w-sm">
							{getSoulOptionString(selectedItem.souls[selectedItem.index].option)}
						</SelectTrigger>
						<SelectContent>
							{#each selectedItem.souls as soul, index}
								<SelectItem value={String(index)}>
									{getSoulOptionString(soul.option)}
								</SelectItem>
							{/each}
						</SelectContent>
					</Select>
				{:else}
					<div class="flex h-9 items-center">
						<div class="text-sm">
							{getSoulOptionString(selectedItem.soul.option)}
						</div>
					</div>
				{/if}
			{:else}
				<div class="sm:h-9"></div>
			{/if}
		</ItemCardContent>
		<ItemCardFooter>
			{#if selectedItem}
				<ButtonGroup>
					<Button
						onclick={() => {
							if (!selectedItem) return;
							if (gear.canApplySoulEnchant) {
								gear.applySoulEnchant();
							}
							const soul =
								selectedItem.type === 'normal'
									? selectedItem.soul
									: selectedItem.souls[selectedItem.index];
							gear.setSoul(soul);
							toast.success(`선택한 소울을 장착했어요.`, {
								description: `${soul.name} (${getSoulOptionString(soul.option)})`,
								position: 'top-center',
								duration: 2000
							});
						}}
					>
						소울 장착
					</Button>
				</ButtonGroup>
			{:else}
				<div class="sm:h-9"></div>
			{/if}
		</ItemCardFooter>
	</ItemCard>

	<ButtonGroup>
		<Button variant="outline" onclick={() => gear.applySoulEnchant()} disabled={gear.soulEnchanted}>
			소울 인챈트
		</Button>
		<Button
			variant="outline"
			class="text-destructive hover:text-destructive/90"
			onclick={() => {
				gear.resetSoulEnchant();
				gear.applySoulEnchant();
			}}
			disabled={!gear.soul}
		>
			소울 해제
		</Button>
		<Button
			variant="destructive"
			onclick={() => {
				gear.resetSoulEnchant();
				toast.success('소울 웨폰을 초기화했어요.', {
					position: 'top-center',
					duration: 2000
				});
			}}
			disabled={!gear.soulEnchanted}
		>
			소울 웨폰 초기화
		</Button>
	</ButtonGroup>
</div>
