<script lang="ts">
	import { getSoulData, getSoulSearch, type SearchSoulSummary } from '$lib/api';
	import { Highlight } from '$lib/components/highlight';
	import { ItemRawIcon } from '$lib/components/icons';
	import { SelectList, SelectListItem } from '$lib/components/select-list';
	import { Button } from '$lib/components/ui/button';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Label } from '$lib/components/ui/label';
	import * as InputGroup from '$lib/components/ui/input-group';
	import * as Select from '$lib/components/ui/select';
	import { Separator } from '$lib/components/ui/separator';
	import { Switch } from '$lib/components/ui/switch';
	import { Gear, type SoulOption } from '@malib/gear';
	import { createQuery } from '@tanstack/svelte-query';
	import { SearchIcon, XIcon } from 'lucide-svelte';
	import FormControl from '../../../form/FormControl.svelte';
	import FormItem from '../../../form/FormItem.svelte';
	import FormLabel from '../../../form/FormLabel.svelte';
	import FormSection from '../../../form/FormSection.svelte';
	import { getSoulDatas, getSoulOptionString } from '../model/soul';
	import { josa } from 'es-hangul';

	let { gear }: { gear: Gear } = $props();

	let searchQuery = $state('');
	let selectedSummary = $state<SearchSoulSummary | null>(null);
	let selectedIndex = $state(0);

	let magnificentOnly = $state(false);
	const hasSoulAmplification = $derived(gear.soulAmplificationLevel > 0);
	const magnificent = $derived(hasSoulAmplification || magnificentOnly ? true : undefined);

	const search = createQuery(() => ({
		queryKey: ['soul-search', searchQuery.trim(), magnificent],
		queryFn: ({ signal }) => getSoulSearch(searchQuery, magnificent, signal),
		staleTime: 60 * 60 * 1000 // 1 hour
	}));

	let results = $state(search.data);
	let resultsMagnificent = $state<boolean | undefined>(undefined);

	$effect(() => {
		if (resultsMagnificent !== magnificent) {
			results = undefined;
			resultsMagnificent = magnificent;
			selectedSummary = null;
			selectedIndex = 0;
		}

		if (!searchQuery.trim()) {
			results = undefined;
		} else if (search.data) {
			results = search.data;
		}
	});

	const detail = createQuery(() => ({
		queryKey: ['soul', selectedSummary?.id],
		queryFn: ({ signal }) => getSoulData(selectedSummary!.id, signal),
		enabled: selectedSummary !== null,
		staleTime: 60 * 60 * 1000 // 1 hour
	}));

	const souls = $derived(detail.data ? getSoulDatas(detail.data) : []);
	const selectedSoul = $derived(souls[selectedIndex]);
	const isSameSoul = $derived.by(() => {
		const currentSoul = gear.soul;
		if (!currentSoul || !selectedSoul || currentSoul.name !== selectedSoul.name) return false;
		const keys = new Set([
			...Object.keys(currentSoul.option),
			...Object.keys(selectedSoul.option)
		] as (keyof SoulOption)[]);
		return [...keys].every(
			(key) => (currentSoul.option[key] ?? 0) === (selectedSoul.option[key] ?? 0)
		);
	});
	// 재변환 후에는 저장된 증폭 단계에 따른 malib의 소울 부여 제한이 적용됩니다.
	const canEquipSelectedSoul = $derived(
		!!selectedSoul &&
			(gear.soulEnchanted
				? gear.canSetSoul(selectedSoul.magnificent ?? false)
				: gear.canApplySoulEnchant &&
					(gear.soulAmplificationLevel === 0 || selectedSoul.magnificent === true))
	);

	function selectSoulSummary(summary: SearchSoulSummary) {
		selectedSummary = summary;
		selectedIndex = 0;
	}
</script>

<FormSection>
	<FormItem>
		<FormLabel title="소울 인챈트" for="soulEnchant" />
		<FormControl>
			<Switch
				bind:checked={
					() => gear.soulEnchanted,
					(value) => {
						if (value) {
							gear.applySoulEnchant();
						} else {
							gear.removeSoulEnchant();
						}
					}
				}
				disabled={!gear.supportsSoulWeapon}
				id="soulEnchant"
			/>
		</FormControl>
	</FormItem>
</FormSection>

<FormSection class="gap-1.5 px-4 py-3">
	<InputGroup.Root>
		<InputGroup.Addon align="inline-start">
			<SearchIcon />
		</InputGroup.Addon>
		<InputGroup.Input placeholder="소울 이름" bind:value={searchQuery} />
	</InputGroup.Root>
	<div class="flex items-center gap-2 pt-1">
		<Checkbox
			id="magnificentSoulOnly"
			disabled={hasSoulAmplification}
			bind:checked={
				() => hasSoulAmplification || magnificentOnly, (value) => (magnificentOnly = value)
			}
		/>
		<Label
			for="magnificentSoulOnly"
			class="text-muted-foreground peer-disabled:text-foreground text-xs">위대한 소울만 검색</Label
		>
	</div></FormSection
>

{#if !searchQuery.trim()}
	<FormSection class="h-72 border-b-0"
		><p class="text-muted-foreground text-sm">소울 이름을 입력해 주세요.</p></FormSection
	>
{:else if search.isPending && !results}
	<FormSection class="h-72 border-b-0"
		><p class="text-muted-foreground text-sm">소울을 검색하고 있어요.</p></FormSection
	>
{:else if search.isError}
	<FormSection class="h-72 border-b-0">
		<p class="text-destructive text-sm">소울을 검색하지 못했어요.</p>
		<Button variant="outline" size="sm" onclick={() => search.refetch()}>다시 시도</Button>
	</FormSection>
{:else if results?.length}
	<SelectList
		items={results}
		getKey={(item) => String(item.id)}
		selected={selectedSummary ? String(selectedSummary.id) : null}
		size={6}
		allowDeselect={false}
	>
		{#snippet children(soulSummary)}
			<SelectListItem
				value={String(soulSummary.id)}
				class="rounded-none ps-4"
				onSelect={() => selectSoulSummary(soulSummary)}
			>
				<ItemRawIcon icon={String(soulSummary.id)} />
				<div>
					<Highlight text={soulSummary.name} highlight={soulSummary.highlight} />
				</div>
			</SelectListItem>
		{/snippet}
	</SelectList>
{:else}
	<FormSection class="h-72 border-b-0"
		><p class="text-muted-foreground text-sm">검색된 소울이 없어요.</p></FormSection
	>
{/if}

<Separator />

{#if selectedSummary}
	<FormSection class="gap-3">
		<!-- Title -->
		<div class="flex h-9 items-center gap-2">
			<ItemRawIcon icon={String(selectedSummary.id)} />
			<div class="text-sm font-medium">{selectedSummary.name}</div>
			<Button variant="ghost" size="icon" class="ml-auto" onclick={() => (selectedSummary = null)}>
				<XIcon />
			</Button>
		</div>
		{#if detail.isPending}
			<p class="text-muted-foreground flex h-8 items-center text-sm">
				소울 정보를 불러오고 있어요.
			</p>
		{:else if detail.isError}
			<p class="text-destructive text-sm">소울 정보를 불러오지 못했어요.</p>
			<Button variant="outline" size="sm" onclick={() => detail.refetch()}>다시 시도</Button>
		{:else if detail.data?.magnificent && selectedSoul}
			<Select.Root
				type="single"
				bind:value={() => String(selectedIndex), (v) => (selectedIndex = Number(v))}
			>
				<Select.Trigger class="w-full sm:w-60" size="sm">
					{getSoulOptionString(selectedSoul.option)}
				</Select.Trigger>
				<Select.Content>
					{#each souls as soul, index (index)}
						<Select.Item value={String(index)}>
							{getSoulOptionString(soul.option)}
						</Select.Item>
					{/each}
				</Select.Content>
			</Select.Root>
		{:else if selectedSoul}
			<div class="flex h-8 items-center">
				<div class="text-sm">
					{getSoulOptionString(selectedSoul.option)}
				</div>
			</div>
		{/if}

		<FormControl>
			<Button
				variant="default"
				size="sm"
				disabled={!canEquipSelectedSoul || !selectedSoul || detail.isError || isSameSoul}
				onclick={() => {
					if (!selectedSoul || !canEquipSelectedSoul || detail.isError || isSameSoul) return;
					if (gear.canApplySoulEnchant) {
						gear.applySoulEnchant();
					}
					gear.setSoul(selectedSoul);
				}}
			>
				{#if !gear.soulEnchanted}
					소울 웨폰으로 변환 및 소울 부여
				{:else if gear.soul}
					{josa(selectedSummary.name, '으로/로')} 변경
				{:else}
					{selectedSummary.name} 부여
				{/if}
			</Button>
		</FormControl>
	</FormSection>
{:else}
	<FormSection class="bg-muted/50">
		<FormItem>
			<p class="text-muted-foreground text-sm font-medium">부여할 소울을 선택해 주세요.</p>
		</FormItem>
	</FormSection>
{/if}

<FormSection>
	<FormItem>
		<FormLabel title="소울 관리" />
		<FormControl>
			<Button
				variant="danger"
				size="sm"
				onclick={() => gear.removeSoul()}
				disabled={!gear.soulEnchanted || gear.soul === undefined}
			>
				{gear.soulEnchanted && gear.soul?.name ? `${gear.soul.name} 제거` : '소울 제거'}
			</Button>
		</FormControl>
	</FormItem>
</FormSection>

<FormSection>
	<FormItem>
		<FormLabel
			title="소울 웨폰 초기화"
			description="소울 · 증폭 단계 · 소울 잠재능력을 모두 초기화해요."
		/>
		<FormControl>
			<Button
				variant="destructive"
				size="sm"
				onclick={() => gear.resetSoulWeapon()}
				disabled={!gear.data.soulWeapon}
			>
				초기화
			</Button>
		</FormControl>
	</FormItem>
</FormSection>
