<script lang="ts">
	import { getOptionStrings } from '$lib/entities/gear-tooltip2';
	import { ItemRawIcon } from '$lib/entities/item-icon';
	import { getGearOptionStrings } from '$lib/entities/item-string';
	import { Button } from '$lib/shared/shadcn/components/ui/button';
	import { Card } from '$lib/shared/shadcn/components/ui/card';
	import { Checkbox } from '$lib/shared/shadcn/components/ui/checkbox';
	import { Input } from '$lib/shared/shadcn/components/ui/input';
	import { Label } from '$lib/shared/shadcn/components/ui/label';
	import { ScrollArea } from '$lib/shared/shadcn/components/ui/scroll-area';
	import { Tabs, TabsContent, TabsList, TabsTrigger } from '$lib/shared/shadcn/components/ui/tabs';
	import { Toggle } from '$lib/shared/shadcn/components/ui/toggle';
	import { cn } from '$lib/shared/shadcn/utils';
	import {
		Gear,
		GearType,
		getSpellTraceScroll,
		isAccessory,
		isArmor,
		isDoubleHandWeapon,
		isLeftWeapon,
		SpellTraceType,
		type Scroll,
		type SpellTrace,
		type SpellTraceRate
	} from '@malib/gear';
	import { Check, X } from 'lucide-svelte';
	import { fade } from 'svelte/transition';
	import { scrolls as scrollData } from '../model/scrolls';

	let { gear }: { gear: Gear } = $props();

	let selectedScroll = $state<Scroll | null>(null);
	let applyFunction: (() => void) | null = $state(null);
	let optionFunction: (() => [string, string][]) | null = $state(null);

	const selectScroll = (
		scroll: Scroll | null,
		applyFunc?: () => void,
		optionFunc?: () => [string, string][]
	) => {
		if (scroll) {
			selectedScroll = scroll;
			applyFunction = applyFunc ?? (() => gear.applyScroll(scroll));
			optionFunction = optionFunc ?? (() => getGearOptionStrings(scroll.option));
		} else {
			selectedScroll = null;
			applyFunction = null;
			optionFunction = null;
		}
	};

	let spellTraceScrolls = $derived(getSpellTraceScrolls());
	let etcScrolls = $derived(getEtcScrolls(gear));

	function getSpellTraceScrolls() {
		const scrolls: SpellTrace[] = [];
		const names = new Set<string>();
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
					if (!names.has(scroll.name)) {
						scroll.icon = getSpellTraceIcon(rate);
						scrolls.push(scroll);
						names.add(scroll.name);
					}
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

	const chaosStats = [
		{
			label: 'STR',
			value: 'str'
		},
		{
			label: 'DEX',
			value: 'dex'
		},
		{
			label: 'INT',
			value: 'int'
		},
		{
			label: 'LUK',
			value: 'luk'
		},
		{
			label: '최대 HP',
			value: 'maxHp'
		},
		{
			label: '최대 MP',
			value: 'maxMp'
		},
		{
			label: '공격력',
			value: 'attackPower'
		},
		{
			label: '마력',
			value: 'magicPower'
		},
		{
			label: '방어력',
			value: 'armor'
		},
		{
			label: '이동속도',
			value: 'speed'
		},
		{
			label: '점프력',
			value: 'jump'
		}
	] as const;

	const [leftChaosStats, rightChaosStats] = splitHalf(chaosStats);

	let chaosOption = $state(getEmptyChaosOption());
	let isRandomChaos = $state(false);

	function getEmptyChaosOption(): Record<string, number> {
		return {};
	}

	function getEmptyOptionRandomizedChaosScroll(scroll: Scroll): Scroll {
		const option = { ...scroll.option };
		for (const stat of chaosStats) {
			if (option[stat.value] === undefined) {
				option[stat.value] = Math.floor(Math.random() * 7);
			}
		}
		return {
			name: scroll.name,
			option
		};
	}

	function getRandomChaosScrollOptionSummaries(option: Record<string, number>) {
		const summaries: [string, string][] = [];
		for (const stat of chaosStats) {
			if (option[stat.value] === undefined) {
				summaries.push([stat.label, '0 ~ +6']);
			} else {
				const summary = getOptionStrings(stat.value, option[stat.value], true);
				summaries.push(summary);
			}
		}
		return summaries;
	}

	function getEtcScrolls(gear: Gear) {
		switch (gear.meta.id) {
			case 1123007:
			case 1123008:
			case 1123009:
			case 1123010:
			case 1123011:
			case 1123012:
				return [
					scrollData['힘의 오닉스 스톤 (펜던트)'],
					scrollData['민첩의 오닉스 스톤 (펜던트)'],
					scrollData['지능의 오닉스 스톤 (펜던트)'],
					scrollData['행운의 오닉스 스톤 (펜던트)'],
					scrollData['체력의 오닉스 스톤 (펜던트)'],
					scrollData['균형의 오닉스 스톤 (펜던트)']
				];
			case 1114207:
			case 1114208:
			case 1114209:
			case 1114210:
			case 1114211:
			case 1114212:
				return [
					scrollData['힘의 오닉스 스톤 (반지)'],
					scrollData['민첩의 오닉스 스톤 (반지)'],
					scrollData['지능의 오닉스 스톤 (반지)'],
					scrollData['행운의 오닉스 스톤 (반지)'],
					scrollData['체력의 오닉스 스톤 (반지)'],
					scrollData['균형의 오닉스 스톤 (반지)'],
					scrollData['파괴의 오닉스 스톤 (반지)'],
					scrollData['마력의 오닉스 스톤 (반지)']
				];
			case 1114226:
			case 1114227:
			case 1114228:
			case 1114230:
			case 1114231:
				return [
					scrollData['강력한 힘의 오닉스 스톤'],
					scrollData['강력한 민첩의 오닉스 스톤'],
					scrollData['강력한 지능의 오닉스 스톤'],
					scrollData['강력한 행운의 오닉스 스톤'],
					scrollData['강력한 체력의 오닉스 스톤'],
					scrollData['강력한 균형의 오닉스 스톤'],
					scrollData['현명한 힘의 오닉스 스톤'],
					scrollData['현명한 민첩의 오닉스 스톤'],
					scrollData['현명한 지능의 오닉스 스톤'],
					scrollData['현명한 행운의 오닉스 스톤'],
					scrollData['현명한 체력의 오닉스 스톤'],
					scrollData['현명한 균형의 오닉스 스톤']
				];
			case 1114300:
				return [scrollData['벤젼스 스톤']];
			case 1114303:
				return [scrollData['코스믹 아톰']];
			case 1114307:
				return [scrollData['테네브리스 원정대 반지 강화 주문서']];
			case 1114318:
				return [scrollData['어웨이크 링 전용 강화 주문서']];
		}
		const scrolls: Scroll[] = [];
		switch (gear.meta.id) {
			case 1122000:
			case 1122076:
			case 1122278:
				scrolls.push(scrollData['드래곤의 돌']);
				break;
			case 1122150:
			case 1122372:
			case 1122373:
			case 1122374:
			case 1122375:
			case 1122376:
			case 1122377:
				scrolls.push(scrollData['비틀린 시간의 파편']);
				break;
		}
		if (gear.type === GearType.earrings) {
			scrolls.push(scrollData['귀 장식 지력 주문서 10%']);
		}
		if (isArmor(gear.type)) {
			scrolls.push(scrollData['얼티밋 방어구 강화 주문서 20%']);
			scrolls.push(scrollData['10주년 프라임 방어구 주문서']);
		}
		if (isAccessory(gear.type)) {
			scrolls.push(
				scrollData['악세서리 공격력 주문서 100% (+2)'],
				scrollData['악세서리 공격력 주문서 100% (+3)'],
				scrollData['프리미엄 악세서리 공격력 주문서 100% (+4)'],
				scrollData['프리미엄 악세서리 공격력 주문서 100% (+5)'],
				scrollData['악세서리 마력 주문서 100% (+2)'],
				scrollData['악세서리 마력 주문서 100% (+3)'],
				scrollData['프리미엄 악세서리 마력 주문서 100% (+4)'],
				scrollData['프리미엄 악세서리 마력 주문서 100% (+5)'],
				scrollData['10주년 프라임 악세서리 주문서']
			);
		}
		if (
			isLeftWeapon(gear.type) ||
			gear.type === GearType.katara ||
			gear.type == GearType.machineHeart
		) {
			scrolls.push(
				scrollData['매지컬 한손무기 공격력 주문서 (+9)'],
				scrollData['매지컬 한손무기 공격력 주문서 (+10)'],
				scrollData['매지컬 한손무기 공격력 주문서 (+11)'],
				scrollData['매지컬 한손무기 마력 주문서 (+9)'],
				scrollData['매지컬 한손무기 마력 주문서 (+10)'],
				scrollData['매지컬 한손무기 마력 주문서 (+11)']
			);
		}
		if (isDoubleHandWeapon(gear.type)) {
			scrolls.push(
				scrollData['매지컬 두손무기 공격력 주문서 (+9)'],
				scrollData['매지컬 두손무기 공격력 주문서 (+10)'],
				scrollData['매지컬 두손무기 공격력 주문서 (+11)']
			);
		}

		return scrolls;
	}

	function splitHalf<T>(array: T[] | readonly T[]) {
		const half = Math.ceil(array.length / 2);
		return [array.slice(0, half), array.slice(half)];
	}

	let initialTab = $derived(spellTraceScrolls.length > 0 ? 'spellTrace' : 'chaos');
	let columns = $derived(
		(spellTraceScrolls.length > 0 ? 1 : 0) + 1 + (etcScrolls.length > 0 ? 1 : 0)
	);
</script>

<div class="flex flex-col gap-y-4">
	<div class="mx-auto w-full max-w-xs">
		<Card class="flex flex-col gap-y-4 p-4">
			<div class="text-center">
				주문서 강화 <span class="font-semibold">{gear.scrollUpgradeCount}</span>회 (잔여
				<span class="font-semibold">{gear.scrollUpgradeableCount}</span>회, 복구 가능
				<span class="font-semibold">{gear.scrollResilienceCount}</span>회)
			</div>
		</Card>
	</div>

	<Tabs value={initialTab} class="gap-y-4" onValueChange={() => (applyFunction = null)}>
		{#if columns > 1}
			<TabsList
				class={cn(
					'grid w-full',
					columns === 1 && 'grid-cols-1',
					columns === 2 && 'grid-cols-2',
					columns === 3 && 'grid-cols-3'
				)}
			>
				{#if spellTraceScrolls.length > 0}
					<TabsTrigger value="spellTrace">주문의 흔적</TabsTrigger>
				{/if}
				<TabsTrigger value="chaos">혼돈의 주문서</TabsTrigger>
				{#if etcScrolls.length > 0}
					<TabsTrigger value="etc">기타 주문서</TabsTrigger>
				{/if}
			</TabsList>
		{/if}
		<TabsContent value="spellTrace">
			<ScrollArea class="h-[calc(3rem*3+2px)] sm:h-[calc(3rem*6+5px)]">
				<div class="flex flex-col gap-px">
					{#each spellTraceScrolls as scroll (scroll.name)}
						<Toggle
							class="h-12 justify-start"
							bind:pressed={
								() => selectedScroll?.name === scroll.name,
								(pressed) => {
									if (pressed) {
										selectScroll(scroll, () => {
											gear.applySpellTrace(scroll.type, scroll.rate);
										});
									}
								}
							}
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
		<TabsContent value="chaos">
			{#if columns === 1}
				<div class="mb-2 px-2">
					<h4 class="text-lg font-semibold">혼돈의 주문서</h4>
				</div>
			{/if}
			<div class="grid sm:grid-cols-2">
				<div class="flex flex-col gap-y-2 px-4">
					{#each leftChaosStats as stat}
						<div class="grid grid-cols-4 items-center">
							<Label>{stat.label}</Label>
							<Input
								type="number"
								class="col-span-3"
								min={-6}
								max={6}
								bind:value={chaosOption[stat.value]}
							/>
						</div>
					{/each}
				</div>
				<div class="flex flex-col gap-y-2 border-l px-4">
					{#each rightChaosStats as stat}
						<div class="grid grid-cols-4 items-center">
							<Label>{stat.label}</Label>
							<Input
								type="number"
								class="col-span-3"
								min={-6}
								max={6}
								bind:value={chaosOption[stat.value]}
							/>
						</div>
					{/each}
				</div>
			</div>
			<div class="mt-4 flex items-center gap-x-2 px-2">
				<Checkbox id="randomChaos" bind:checked={isRandomChaos} />
				<Label for="randomChaos">빈 스탯을 임의의 놀긍혼 수치로 적용</Label>
			</div>
			<div class="mt-4 px-2">
				<Button
					variant="outline"
					onclick={() => {
						const scroll = {
							name: '혼돈의 주문서',
							icon: '5530143',
							option: $state.snapshot(chaosOption)
						};
						if (isRandomChaos) {
							selectScroll(
								scroll,
								() => {
									gear.applyScroll(getEmptyOptionRandomizedChaosScroll(scroll));
								},
								() => getRandomChaosScrollOptionSummaries(chaosOption)
							);
						} else {
							selectScroll(scroll);
						}
					}}
				>
					선택
				</Button>
				<Button
					variant="outline"
					class="text-destructive hover:text-destructive/90"
					onclick={() => (chaosOption = getEmptyChaosOption())}
				>
					입력 수치 초기화
				</Button>
			</div>
		</TabsContent>
		<TabsContent value="etc">
			<ScrollArea class="h-[calc(3rem*3+2px)] sm:h-[calc(3rem*6+5px)]">
				<div class="flex flex-col gap-px">
					{#each etcScrolls as scroll (scroll.name)}
						<Toggle
							class="h-12 justify-start"
							bind:pressed={
								() => selectedScroll?.name === scroll.name,
								(pressed) => {
									if (pressed) {
										selectScroll(scroll);
									}
								}
							}
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
	</Tabs>

	<Card class="p-4">
		{#if selectedScroll && optionFunction}
			{@const summaries = optionFunction()}
			{@const [leftSummaries, rightSummaries] = splitHalf(summaries)}
			<div class="flex flex-col gap-y-2">
				<div class="flex items-center gap-x-2">
					<ItemRawIcon icon={selectedScroll.icon!} />
					<div class="text-sm font-medium">
						{selectedScroll.name}
					</div>
					<Button variant="ghost" size="icon" class="ml-auto" onclick={() => selectScroll(null)}>
						<X />
					</Button>
				</div>
				<div
					class={cn(
						'-mx-4 grid h-30 auto-rows-min justify-start',
						summaries.length > 6 && 'md:grid-cols-2'
					)}
				>
					<div class="px-4">
						{#each leftSummaries as summary}
							<div class="text-sm">
								<span>{summary[0]}</span>
								<span class="font-semibold">{summary[1]}</span>
							</div>
						{/each}
					</div>
					<div class={cn('px-4', summaries.length > 6 && 'sm:border-l')}>
						{#each rightSummaries as summary}
							<div class="text-sm">
								<span>{summary[0]}</span>
								<span class="font-semibold">{summary[1]}</span>
							</div>
						{/each}
					</div>
				</div>
			</div>
		{:else}
			<div class="text-muted-foreground h-41 text-sm">주문서를 선택해 주세요.</div>
		{/if}
	</Card>

	<div class="flex flex-col gap-y-4">
		<div class="flex flex-col gap-2 sm:flex-row">
			<Button onclick={() => applyFunction?.()} disabled={!gear.canApplyScroll || !applyFunction}>
				{selectedScroll?.name} 사용하기
			</Button>
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

	<div class="mt-4 flex flex-col gap-2 sm:flex-row">
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
			주문서 강화 초기화
		</Button>
	</div>
</div>
