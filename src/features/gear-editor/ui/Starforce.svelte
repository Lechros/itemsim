<script lang="ts">
	import { ButtonGroup } from '$lib/entities/button-group';
	import { Button } from '$lib/shared/shadcn/components/ui/button';
	import { Card } from '$lib/shared/shadcn/components/ui/card';
	import { Checkbox } from '$lib/shared/shadcn/components/ui/checkbox';
	import { Label } from '$lib/shared/shadcn/components/ui/label';
	import { Separator } from '$lib/shared/shadcn/components/ui/separator';
	import { Switch } from '$lib/shared/shadcn/components/ui/switch';
	import { Tabs, TabsContent, TabsList, TabsTrigger } from '$lib/shared/shadcn/components/ui/tabs';
	import { UIImage2 } from '$lib/shared/ui';
	import { Gear, GearCapability } from '@malib/gear';

	let { gear }: { gear: Gear } = $props();

	const STAR_PER_LINE = 15;
	const STAR_PER_GROUP = 5;

	function toStarArray(star: number, maxStar: number) {
		maxStar = Math.max(star, maxStar);
		const lines = [];
		for (let l = 0; l < maxStar; l += STAR_PER_LINE) {
			const line = [];
			for (let g = l; g < Math.min(maxStar, l + STAR_PER_LINE); g += STAR_PER_GROUP) {
				const group = [];
				for (let s = g; s < Math.min(maxStar, g + STAR_PER_GROUP); s++) {
					group.push(s < star);
				}
				line.push(group);
			}
			lines.push(line);
		}
		return lines;
	}

	const lines = $derived(
		toStarArray(
			gear.star,
			gear.attributes.canStarforce === GearCapability.Fixed ? gear.star : gear.maxStar
		)
	);

	let ignoreMaxStar = $state(false);
	let bonus = $state(false);

	function addStarforce(gear: Gear, star: number, ignoreMaxStar: boolean) {
		for (let i = 0; i < star; i++) {
			if (ignoreMaxStar) {
				if (gear.canApplyStarforceIgnoringMaxStar) {
					gear.applyStarforceIgnoringMaxStar();
				}
			} else {
				if (gear.canApplyStarforce) {
					gear.applyStarforce();
				}
			}
		}
	}

	function canAddStarforce(gear: Gear, star: number, ignoreMaxStar: boolean) {
		if (ignoreMaxStar) {
			return gear.canApplyStarforceIgnoringMaxStar && gear.star + star <= 30;
		} else {
			return gear.canApplyStarforce && gear.star + star <= gear.maxStar;
		}
	}

	function removeStarforce(gear: Gear, star: number, ignoreMaxStar: boolean) {
		const targetStar = gear.star - star;
		gear.resetStarforce();
		for (let i = 0; i < targetStar; i++) {
			if (ignoreMaxStar) {
				if (gear.canApplyStarforceIgnoringMaxStar) {
					gear.applyStarforceIgnoringMaxStar();
				}
			} else {
				if (gear.canApplyStarforce) {
					gear.applyStarforce();
				}
			}
		}
	}

	function canRemoveStarforce(gear: Gear, star: number) {
		return !gear.starScroll && gear.canResetStarforce && gear.star - star >= 0;
	}

	function setStarforce(gear: Gear, star: number) {
		gear.resetStarforce();
		for (let i = 0; i < star; i++) {
			gear.applyStarforce();
		}
	}

	function canSetStarforce(gear: Gear, star: number) {
		return !gear.starScroll && gear.canResetStarforce && star <= gear.maxStar;
	}

	function addStarScroll(gear: Gear, star: number, bonus: boolean, ignoreMaxStar: boolean) {
		for (let i = 0; i < star; i++) {
			if (ignoreMaxStar) {
				if (gear.canApplyStarScrollIgnoringMaxStar) {
					gear.applyStarScrollIgnoringMaxStar(bonus);
				}
			} else {
				if (gear.canApplyStarScroll) {
					gear.applyStarScroll(bonus);
				}
			}
		}
	}

	function canAddStarScroll(gear: Gear, star: number, ignoreMaxStar: boolean) {
		if (ignoreMaxStar) {
			return gear.canApplyStarScrollIgnoringMaxStar && star <= 15;
		} else {
			return gear.canApplyStarScroll && star <= gear.maxStar && star <= 15;
		}
	}

	function setStarScroll(gear: Gear, star: number, bonus: boolean, ignoreMaxStar: boolean) {
		gear.resetStarforce();
		if (ignoreMaxStar) {
			for (let i = 0; i < star; i++) {
				if (gear.canApplyStarScrollIgnoringMaxStar) {
					gear.applyStarScrollIgnoringMaxStar(bonus);
				}
			}
		} else {
			for (let i = 0; i < star; i++) {
				if (gear.canApplyStarScroll) {
					gear.applyStarScroll(bonus);
				}
			}
		}
	}

	function canSetStarScroll(gear: Gear, star: number, ignoreMaxStar: boolean) {
		if (gear.star > 0) return false;
		if (ignoreMaxStar) {
			return gear.canResetStarforce && star <= 15;
		} else {
			return gear.canResetStarforce && star <= gear.maxStar && star <= 15;
		}
	}
</script>

<div class="flex flex-col gap-y-4">
	<div class="mx-auto w-full max-w-xs">
		<Card class="flex flex-col gap-y-4 p-4">
			{#if lines}
				<div class="mx-auto flex flex-col items-center gap-y-[8px]">
					{#each lines as line}
						<div class="flex gap-x-[10px]">
							{#each line as group}
								<div class="flex">
									{#each group as isFilled}
										{@render starIcon(gear.starScroll ? 'blue' : 'yellow', !isFilled)}
									{/each}
								</div>
							{/each}
						</div>
					{/each}
				</div>
			{/if}
		</Card>
	</div>

	<Tabs value="starforce" class="gap-y-4">
		{#if gear.req.level <= 150 && !gear.attributes.superior}
			<TabsList class="grid w-full grid-cols-2">
				<TabsTrigger value="starforce">스타포스</TabsTrigger>
				<TabsTrigger value="starScroll">놀장강</TabsTrigger>
			</TabsList>
		{/if}
		<TabsContent value="starforce" class="flex flex-col gap-y-4">
			{#if gear.req.level < 140}
				<div class="flex h-8 items-center gap-x-2">
					<Switch bind:checked={ignoreMaxStar} id="ignoreMaxStar" />
					<Label for="ignoreMaxStar">최대 스타포스 강화 초과</Label>
				</div>
			{/if}
			<div class="flex flex-col gap-y-4">
				<h4 class="text-lg leading-none font-semibold">스타포스 강화</h4>
				<ButtonGroup>
					{#each [5, 1] as star}
						<Button
							variant="outline"
							class="text-destructive"
							onclick={() => removeStarforce(gear, star, ignoreMaxStar)}
							disabled={!canRemoveStarforce(gear, star)}
						>
							-{star}성
						</Button>
					{/each}
					{#each [1, 5] as star}
						<Button
							variant="outline"
							onclick={() => addStarforce(gear, star, ignoreMaxStar)}
							disabled={!canAddStarforce(gear, star, ignoreMaxStar)}
						>
							+{star}성
						</Button>
					{/each}
				</ButtonGroup>
			</div>
			<div class="flex flex-col gap-y-4">
				<h4 class="text-lg leading-none font-semibold">일괄 강화</h4>
				<ButtonGroup>
					{#each [17, 18, 22] as star}
						<Button
							variant="outline"
							onclick={() => setStarforce(gear, star)}
							disabled={!canSetStarforce(gear, star)}
						>
							{star}성
						</Button>
					{/each}
				</ButtonGroup>
			</div>

			<Separator />

			<ButtonGroup>
				<Button
					variant="destructive"
					onclick={() => gear.resetStarforce()}
					disabled={!gear.canResetStarforce}
				>
					스타포스 강화 초기화
				</Button>
			</ButtonGroup>
		</TabsContent>
		<TabsContent value="starScroll" class="flex flex-col gap-y-4">
			<div class="flex h-8 items-center gap-x-2">
				<Switch bind:checked={ignoreMaxStar} id="ignoreMaxStar" />
				<Label for="ignoreMaxStar">최대 강화 단계 초과</Label>
			</div>
			<div class="flex flex-col gap-y-4">
				<h4 class="text-lg leading-none font-semibold">놀라운 장비 강화</h4>
				<div class="flex items-center gap-x-2">
					<Checkbox id="bonus" bind:checked={bonus} aria-labelledby="bonus-label" />
					<Label id="bonus-label" for="bonus">보너스 스탯 적용</Label>
				</div>
				<div class="flex gap-x-2">
					{#each [1, 5] as star}
						<Button
							variant="outline"
							onclick={() => addStarScroll(gear, star, bonus, ignoreMaxStar)}
							disabled={!canAddStarScroll(gear, star, ignoreMaxStar)}
						>
							+{star}성
						</Button>
					{/each}
				</div>
			</div>
			<div class="flex flex-col gap-y-4">
				<h4 class="text-lg leading-none font-semibold">일괄 강화</h4>
				<div class="flex items-center gap-x-2">
					<Checkbox id="bonus" bind:checked={bonus} aria-labelledby="bonus-label" />
					<Label id="bonus-label" for="bonus">보너스 스탯 적용</Label>
				</div>
				<div class="flex gap-x-2">
					{#each [12] as star}
						<Button
							variant="outline"
							onclick={() => setStarScroll(gear, star, bonus, ignoreMaxStar)}
							disabled={!canSetStarScroll(gear, star, ignoreMaxStar)}
						>
							{star}성
						</Button>
					{/each}
				</div>
			</div>
			<div>
				<Button
					variant="destructive"
					onclick={() => gear.resetStarforce()}
					disabled={!gear.canResetStarforce}
				>
					스타포스 강화 초기화
				</Button>
			</div>
		</TabsContent>
	</Tabs>
</div>

{#snippet starIcon(color: 'yellow' | 'blue', isEmpty: boolean)}
	{#if isEmpty}
		<UIImage2 image="emptyStar" />
	{:else if color === 'yellow'}
		<UIImage2 image="star" />
	{:else}
		<UIImage2 image="blueStar" />
	{/if}
{/snippet}
