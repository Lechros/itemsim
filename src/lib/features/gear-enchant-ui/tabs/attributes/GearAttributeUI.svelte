<script lang="ts">
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';
	import * as InputGroup from '$lib/components/ui/input-group';
	import * as Select from '$lib/components/ui/select';
	import * as Tabs from '$lib/components/ui/tabs';
	import { Gear } from '@malib/gear';
	import { Minus, Plus } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';
	import FormControl from '../../form/FormControl.svelte';
	import FormItem from '../../form/FormItem.svelte';
	import FormLabel from '../../form/FormLabel.svelte';
	import FormSection from '../../form/FormSection.svelte';
	import ShapeDialogContent from './components/ShapeDialogContent.svelte';
	import { isShapeChangeableGear } from './model/anvil';
	import {
		cuttableTypes,
		setCuttableCount,
		setTotalCuttableCount,
		totalCuttableCounts,
		validateCuttableCount
	} from './model/cuttable';
	import { validateItemTag } from './model/itemtag';
	import { reqLevelIncreases } from './model/req';
	import { tradeTypes } from './model/trade';

	let { gear }: { gear: Gear } = $props();

	let cuttableCount = $state(gear.data.attributes.cuttableCount);
	let cuttableCountError = $derived(validateCuttableCount(gear, cuttableCount));

	let itemTag = $state(gear.itemTag);
	let itemTagError = $state<string | undefined>(undefined);

	$effect(() => {
		setCuttableCount(gear, cuttableCount);
	});

	const canIncreaseLevelIncrease = $derived(80 <= gear.req.level && gear.req.level <= 110);
	const canShapeChange = $derived(isShapeChangeableGear(gear));

	const selectedTradeLabel = $derived(
		tradeTypes.find((t) => t.value === gear.attributes.trade)?.label ?? ''
	);
	const selectedCuttableLabel = $derived(
		cuttableTypes.find((c) => c.value === gear.attributes.cuttable)?.label ?? ''
	);

	let inputRef = $state<HTMLInputElement | null>(null);
</script>

<div class="flex flex-col">
	<!-- 교환 가능 여부 -->
	<FormSection>
		<FormItem>
			<FormLabel title="교환 가능 여부" for="tradeType" />
			<FormControl>
				<Select.Root
					type="single"
					bind:value={
						() => String(gear.attributes.trade),
						(v) => {
							gear.data.attributes.trade = Number(v);
						}
					}
				>
					<Select.Trigger id="tradeType" class="w-full">
						{selectedTradeLabel}
					</Select.Trigger>
					<Select.Content>
						{#each tradeTypes as tradeType}
							<Select.Item value={String(tradeType.value)} label={tradeType.label}>
								{tradeType.label}
							</Select.Item>
						{/each}
					</Select.Content>
				</Select.Root>
			</FormControl>
		</FormItem>
	</FormSection>

	<!-- 카르마의 가위 -->
	<FormSection>
		<FormItem>
			<FormLabel title="카르마의 가위" for="cuttableType" />
			<FormControl>
				<Select.Root
					type="single"
					bind:value={
						() => String(gear.attributes.cuttable),
						(v) => {
							gear.data.attributes.cuttable = Number(v);
						}
					}
				>
					<Select.Trigger id="cuttableType" class="w-full">
						{selectedCuttableLabel}
					</Select.Trigger>
					<Select.Content>
						{#each cuttableTypes as cuttableType}
							<Select.Item value={String(cuttableType.value)} label={cuttableType.label}>
								{cuttableType.label}
							</Select.Item>
						{/each}
					</Select.Content>
				</Select.Root>
			</FormControl>
		</FormItem>
		{#if gear.attributes.cuttable}
			<FormItem>
				<FormLabel title="최대 가위 사용 횟수" variant="nested" />
				<FormControl>
					<Tabs.Root
						bind:value={
							() =>
								gear.attributes.totalCuttableCount === undefined
									? 'none'
									: String(gear.attributes.totalCuttableCount),
							(v) => {
								setTotalCuttableCount(gear, v === 'none' ? undefined : Number(v));
								cuttableCount = gear.data.attributes.cuttableCount;
							}
						}
					>
						<Tabs.List class="w-full">
							{#each totalCuttableCounts as count}
								<Tabs.Trigger
									value={count.value === undefined ? 'none' : String(count.value)}
									class="px-3"
								>
									{count.label}
								</Tabs.Trigger>
							{/each}
						</Tabs.List>
					</Tabs.Root>
				</FormControl>
			</FormItem>
			{#if gear.attributes.totalCuttableCount}
				<FormItem>
					<FormLabel title="가위 사용 잔여 횟수" variant="nested" />
					<FormControl>
						<InputGroup.Root class="sm:w-28">
							<InputGroup.Addon align="inline-start">
								<InputGroup.Button
									aria-label="가위 사용 잔여 횟수 감소"
									title="가위 사용 잔여 횟수 감소"
									size="icon-xs"
									disabled={cuttableCount === undefined || cuttableCount === 0}
									onclick={() => {
										if (cuttableCount === undefined || cuttableCount === 0) return;
										cuttableCount--;
									}}
								>
									<Minus />
								</InputGroup.Button>
							</InputGroup.Addon>
							<InputGroup.Input
								min={0}
								max={gear.attributes.totalCuttableCount}
								bind:value={cuttableCount}
								disabled={gear.attributes.totalCuttableCount === undefined}
								aria-invalid={cuttableCountError !== undefined}
								id="cuttableCount"
								class="text-center"
							/>
							{#if cuttableCountError}
								<p class="text-destructive w-full text-right text-sm">{cuttableCountError}</p>
							{/if}
							<InputGroup.Addon align="inline-end">
								<InputGroup.Button
									aria-label="가위 사용 잔여 횟수 증가"
									title="가위 사용 잔여 횟수 증가"
									size="icon-xs"
									disabled={cuttableCount === undefined ||
										cuttableCount === gear.attributes.totalCuttableCount}
									onclick={() => {
										if (
											cuttableCount === undefined ||
											cuttableCount === gear.attributes.totalCuttableCount
										)
											return;
										cuttableCount++;
									}}
								>
									<Plus />
								</InputGroup.Button>
							</InputGroup.Addon>
						</InputGroup.Root>
					</FormControl>
				</FormItem>
			{/if}
		{/if}
	</FormSection>

	<FormSection>
		<FormItem>
			<FormLabel
				title="착용 레벨 증가"
				description={canIncreaseLevelIncrease
					? '잠재능력 수치는 변경되지 않아요.'
					: '이 아이템에는 적용할 수 없어요.'}
				disabled={!canIncreaseLevelIncrease}
			/>
			<FormControl>
				<Tabs.Root
					bind:value={
						() => String(gear.req.levelIncrease), (v) => (gear.data.req.levelIncrease = Number(v))
					}
				>
					<Tabs.List class="w-full">
						{#each reqLevelIncreases as reqLevelIncrease}
							<Tabs.Trigger
								value={String(reqLevelIncrease.value)}
								disabled={!canIncreaseLevelIncrease}
								class="px-3"
							>
								{reqLevelIncrease.label}
							</Tabs.Trigger>
						{/each}
					</Tabs.List>
				</Tabs.Root>
			</FormControl>
		</FormItem>
	</FormSection>

	<FormSection>
		<FormItem>
			<FormLabel title="이름 새기기" for="itemTag" />
			<FormControl>
				<div class="flex flex-col gap-2">
					<div class="flex flex-col items-end gap-1">
						<Input
							type="text"
							id="itemTag"
							bind:ref={inputRef}
							bind:value={itemTag}
							aria-invalid={itemTagError !== undefined}
							oninput={() => (itemTagError = undefined)}
							placeholder="캐릭터 이름"
							class="sm:w-48"
						/>
						{#if itemTagError}
							<p class="text-destructive text-sm">{itemTagError}</p>
						{/if}
					</div>
					<div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
						<Button
							variant="outline"
							size="sm"
							disabled={!itemTag}
							onclick={() => {
								if (!itemTag) return;
								itemTagError = validateItemTag(itemTag);
								if (itemTagError === undefined) {
									gear.itemTag = itemTag;
									toast.success('이름 새기기를 적용했어요.', {
										description: itemTag,
										position: 'top-center',
										duration: 2000
									});
								} else {
									inputRef?.focus();
								}
							}}
						>
							적용
						</Button>
						<Button
							variant="danger"
							size="sm"
							disabled={!gear.itemTag}
							onclick={() => {
								itemTagError = undefined;
								if (gear.itemTag !== undefined) {
									gear.itemTag = undefined;
									toast.success('이름 새기기를 제거했어요.', {
										position: 'top-center',
										duration: 2000
									});
								}
							}}
						>
							지우기
						</Button>
					</div>
				</div>
			</FormControl>
		</FormItem>
	</FormSection>

	<FormSection>
		<FormItem>
			<FormLabel
				title="신비의 모루"
				description={canShapeChange
					? '아이템의 외형을 설정하거나 되돌릴 수 있어요.'
					: '이 아이템의 외형은 변경할 수 없어요.'}
			/>
			<FormControl>
				<Dialog.Root>
					<Dialog.Trigger
						class={buttonVariants({ variant: 'outline', size: 'sm' })}
						disabled={!canShapeChange}
					>
						외형 설정하기
					</Dialog.Trigger>
					<ShapeDialogContent {gear} />
				</Dialog.Root>
				<Button
					variant="danger"
					size="sm"
					disabled={!canShapeChange || gear.shape === undefined}
					onclick={() => {
						gear.shape = undefined;
						toast.success('외형을 초기화했어요.', {
							position: 'top-center',
							duration: 2000
						});
					}}
				>
					되돌리기
				</Button>
			</FormControl>
		</FormItem>
	</FormSection>
</div>
