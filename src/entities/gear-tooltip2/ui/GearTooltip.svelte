<script lang="ts">
	import { UIImage2 } from '$lib/shared/ui';
	import { GearCapability, ReadonlyGear } from '@malib/gear';
	import { getCategories } from '../model/category';
	import { getJobString } from '../model/job';
	import Chip from './parts/Chip.svelte';
	import FrameLine from './parts/frame/FrameLine.svelte';
	import FrameMiddle from './parts/frame/FrameMiddle.svelte';
	import FrameTop from './parts/frame/FrameTop.svelte';
	import Icon from './parts/icon/Icon.svelte';
	import InclineCannot from './parts/incline/InclineCannot.svelte';
	import InclineEquipped from './parts/incline/InclineEquipped.svelte';
	import InclineMinus from './parts/incline/InclineMinus.svelte';
	import InclinePlus from './parts/incline/InclinePlus.svelte';
	import InclineZero from './parts/incline/InclineZero.svelte';
	import ReqLevel from './parts/ReqLevel.svelte';
	import Spacer from './parts/Spacer.svelte';
	import Stars from './parts/star/Stars.svelte';
	import Text from './parts/Text.svelte';
	let {
		gear,
		cannot = {},
		incline
	}: {
		gear: ReadonlyGear;
		cannot?: {
			level?: boolean;
			job?: boolean;
		};
		incline: { equipped: true } | { combat: number };
	} = $props();
</script>

<div class="relative">
	<FrameTop>
		<Stars
			star={gear.star}
			maxStar={gear.attributes.canStarforce === GearCapability.Fixed ? gear.star : gear.maxStar}
			color={gear.starScroll ? 'blue' : 'yellow'}
			class="mt-[10px]"
		/>
		{#if gear.star >= 23}
			<UIImage2 image="particleStar" class="absolute top-px left-0" />
		{/if}
		<Spacer height={8} />
		{#if false}
			<Text color="gray" class="mt-[1px] self-center">의</Text>
		{/if}
		<Text variant="itemName" class="self-center">{gear.name}</Text>
		<Spacer height={2} />
	</FrameTop>
	<FrameLine />
	<FrameMiddle class="px-[15px]">
		<div class="flex w-full justify-between">
			<div>
				<Spacer height={2} />
				<Icon icon={gear.shapeIcon} />
			</div>
			<div class="flex flex-col items-end">
				<Spacer height={1} />
				<Text color="darkGray">전투력 증가량</Text>
				<Spacer height={13} />
				{#if 'equipped' in incline}
					<InclineEquipped />
				{:else if cannot.job || cannot.level}
					<InclineCannot />
				{:else}
					<div class="pr-[2px]">
						{#if incline.combat > 0}
							<InclinePlus incline={incline.combat} />
						{:else if incline.combat < 0}
							<InclineMinus incline={incline.combat} />
						{:else}
							<InclineZero />
						{/if}
					</div>
				{/if}
				<Spacer height={19} />
				<div class="flex gap-[3px]">
					{#each getCategories(gear.type) as category}
						<Chip>{category}</Chip>
					{/each}
				</div>
			</div>
		</div>
		<Spacer height={1} />
		<div class="flex flex-col items-start">
			{#if gear.shape}
				<div class="flex">
					<Text color="gray" class="w-[64px]">현재 외형</Text>
					<Text>{gear.shape.name}</Text>
				</div>
			{/if}
			<div class="flex">
				<Text color="gray" class="w-[64px]">착용 직업</Text>
				<Text>{getJobString(gear.type, gear.req.job, gear.req.class)}</Text>
			</div>
			{#if gear.req.level > 0 || gear.req.levelIncrease > 0}
			<div class="flex">
				<Text color="gray" class="w-[63px]">요구 레벨</Text>
				<ReqLevel
					level={gear.req.level}
					increase={gear.req.levelIncrease}
					decrease={gear.baseOption.reqLevelDecrease + gear.addOption.reqLevelDecrease}
				/>
			</div>
			{/if}
		</div>
	</FrameMiddle>
</div>
