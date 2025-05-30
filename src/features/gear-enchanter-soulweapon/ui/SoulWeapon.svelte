<script lang="ts">
	import { ItemRawIcon } from '$lib/entities/item-icon';
	import { getGearOptionGroupedStrings } from '$lib/entities/item-string';
	import { Button } from '$lib/shared/shadcn/components/ui/button';
	import { Card } from '$lib/shared/shadcn/components/ui/card';
	import { Input } from '$lib/shared/shadcn/components/ui/input';
	import { ScrollArea } from '$lib/shared/shadcn/components/ui/scroll-area';
	import {
		Select,
		SelectContent,
		SelectItem,
		SelectTrigger
	} from '$lib/shared/shadcn/components/ui/select';
	import { Toggle } from '$lib/shared/shadcn/components/ui/toggle';
	import { ButtonGroup } from '$lib/shared/ui';
	import { Gear, type SoulData } from '@malib/gear';
	import { Check, X } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';
	import { fade } from 'svelte/transition';
	import {
		getMagnificentSoulDatas,
		getNormalSoulData,
		getSoulSummaries,
		type SoulSummary
	} from '../model/soul';
	import { SelectList, SelectListItem } from '$lib/entities/select-list';

	let { gear }: { gear: Gear } = $props();

	const soulSummaries = $derived(getSoulSummaries());

	let searchQuery = $state('');

	const filteredSoulSummaries = $derived(
		soulSummaries.filter((soulSummary) => soulSummary.name.includes(searchQuery))
	);

	let selectedSoulSummary: SoulSummary | null = $state(null);
	let selectedSoul: SoulData | null = $state(null);
	let selectedSouls: SoulData[] | null = $state(null);
	let selectedSoulIndex: number = $state(0);
</script>

<div class="flex flex-col gap-y-4">
	<div>
		<Input type="search" placeholder="소울 이름으로 검색할 수 있어요" bind:value={searchQuery} />
	</div>

	<SelectList
		value={selectedSoulSummary ? String(selectedSoulSummary.id) : null}
		size={9}
		allowSingleDeselect={false}
	>
		{#each filteredSoulSummaries as soulSummary (soulSummary.id)}
			<SelectListItem
				value={String(soulSummary.id)}
				onSelect={() => {
					selectedSoulSummary = soulSummary;
					if (soulSummary.magnificent) {
						selectedSouls = getMagnificentSoulDatas(soulSummary.id);
						selectedSoulIndex = 0;
						selectedSoul = selectedSouls![selectedSoulIndex];
					} else {
						selectedSoul = getNormalSoulData(soulSummary.id);
					}
				}}
			>
				<ItemRawIcon icon={String(soulSummary.id)} />
				{soulSummary.name}
			</SelectListItem>
		{/each}
	</SelectList>

	<Card class="p-4">
		{#if selectedSoulSummary}
			<div class="flex flex-col gap-y-2">
				<div class="flex items-center gap-x-2">
					<ItemRawIcon icon={String(selectedSoulSummary.id)} />
					<div class="text-sm font-medium">
						{selectedSoulSummary.name}
					</div>
					<Button
						variant="ghost"
						size="icon"
						class="ml-auto"
						onclick={() => {
							selectedSoulSummary = null;
							selectedSoul = null;
							selectedSouls = null;
							selectedSoulIndex = 0;
						}}
					>
						<X />
					</Button>
				</div>
				<div class="flex flex-col gap-y-4">
					{#if selectedSoulSummary.magnificent}
						<Select
							type="single"
							bind:value={
								() => String(selectedSoulIndex),
								(v) => {
									selectedSoulIndex = Number(v);
									selectedSoul = selectedSouls![selectedSoulIndex];
								}
							}
						>
							<SelectTrigger class="w-full max-w-sm">
								{getGearOptionGroupedStrings(selectedSouls![selectedSoulIndex].option)[0].join(' ')}
							</SelectTrigger>
							<SelectContent>
								{#each selectedSouls! as soul, index}
									<SelectItem value={String(index)}>
										{getGearOptionGroupedStrings(soul.option)[0].join(' ')}
									</SelectItem>
								{/each}
							</SelectContent>
						</Select>
					{:else}
						<div class="flex h-9 items-center">
							<div class="text-sm">
								{getGearOptionGroupedStrings(selectedSoul!.option)[0].join(' ')}
							</div>
						</div>
					{/if}
					<ButtonGroup>
						<Button
							onclick={() => {
								if (gear.canApplySoulEnchant) {
									gear.applySoulEnchant();
								}
								gear.setSoul(selectedSoul!);
								const description = `${gear.soul!.name} (${getGearOptionGroupedStrings(selectedSoul!.option)[0].join(' ')})`;
								toast.success(`선택한 소울을 장착했어요.`, {
									description
								});
							}}
						>
							소울 장착
						</Button>
					</ButtonGroup>
				</div>
			</div>
		{:else}
			<div class="text-muted-foreground h-33 text-sm">장착할 소울을 선택해 주세요.</div>
		{/if}
	</Card>

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
			onclick={() => gear.resetSoulEnchant()}
			disabled={!gear.soulEnchanted}
		>
			소울 웨폰 초기화
		</Button>
	</ButtonGroup>
</div>
