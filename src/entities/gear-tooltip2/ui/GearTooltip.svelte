<script lang="ts">
	import { UIImage2 } from '$lib/shared/ui';
	import { GearCapability, GearGender, GearType, isWeapon, ReadonlyGear } from '@malib/gear';
	import { getAttributeHtmlStrings, getTopAttributeHtmlStrings } from '../model/attribute';
	import { getCategories, isEnhanceable } from '../model/category';
	import { getJobString } from '../model/job';
	import Chip from './parts/Chip.svelte';
	import EnhanceAdd from './parts/enhance/EnhanceAdd.svelte';
	import EnhanceScroll from './parts/enhance/EnhanceScroll.svelte';
	import EnhanceStarforce from './parts/enhance/EnhanceStarforce.svelte';
	import Exceptional from './parts/exceptional/Exceptional.svelte';
	import FrameBottom from './parts/frame/FrameBottom.svelte';
	import FrameLine from './parts/frame/FrameLine.svelte';
	import FrameMiddle from './parts/frame/FrameMiddle.svelte';
	import FrameTop from './parts/frame/FrameTop.svelte';
	import Icon from './parts/icon/Icon.svelte';
	import InclineCannot from './parts/incline/InclineCannot.svelte';
	import InclineEquipped from './parts/incline/InclineEquipped.svelte';
	import InclineMinus from './parts/incline/InclineMinus.svelte';
	import InclinePlus from './parts/incline/InclinePlus.svelte';
	import InclineZero from './parts/incline/InclineZero.svelte';
	import PotentialDetail from './parts/potential/PotentialDetail.svelte';
	import PotentialTitle from './parts/potential/PotentialTitle.svelte';
	import ReqLevel from './parts/ReqLevel.svelte';
	import SoulWeapon from './parts/soul/SoulWeapon.svelte';
	import Spacer from './parts/Spacer.svelte';
	import Stars from './parts/star/Stars.svelte';
	import StatLine from './parts/stat/StatLine.svelte';
	import TemplateText from './parts/TemplateText.svelte';
	import Text from './parts/Text.svelte';

	let {
		gear,
		cannot = {},
		incline,
		loadSetItemName,
		loadExclusiveEquips
	}: {
		gear: ReadonlyGear;
		cannot?: {
			level?: boolean;
			job?: boolean;
		};
		incline: { equipped: true } | { combat: number };
		loadSetItemName: (setItemId: number) => string;
		loadExclusiveEquips: (gearId: number) => string[];
	} = $props();

	const topAttributeStrings = $derived(getTopAttributeHtmlStrings(gear.attributes));
	const attributeStrings = $derived(
		getAttributeHtmlStrings(gear.attributes, loadExclusiveEquips(gear.meta.id))
	);

	function getSetItemLine(gear: ReadonlyGear) {
		const words: string[] = [];
		if (gear.attributes.setItemId) {
			words.push(loadSetItemName(gear.attributes.setItemId));
		}
		if (gear.attributes.lucky) {
			words.push('럭키 아이템');
		}
		return words.join(', ');
	}

	const basicStats = [
		'str',
		'dex',
		'int',
		'luk',
		'maxHp',
		'maxMp',
		'maxDemonForce',
		'attackPower',
		'magicPower',
		'armor',
		'speed',
		'jump'
	] as const;
	const rateStats = ['maxHpRate', 'maxMpRate', 'allStat', 'damage'] as const;
	const longRateStats = ['bossDamage', 'ignoreMonsterArmor'] as const;
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
		{#if gear.attributes.specialGrade}
			<Text class="self-center">스페셜 아이템</Text>
		{/if}
		{#if topAttributeStrings.length > 0}
			{#each topAttributeStrings as html}
				<TemplateText raw={html} class="self-center" />
			{/each}
		{/if}
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
					<Text color="gray" class="w-[85px]">현재 외형</Text>
					<Text>{gear.shape.name}</Text>
				</div>
			{/if}
			<div class="flex">
				<Text color="gray" class="w-[85px]">착용 직업</Text>
				<Text>{getJobString(gear.type, gear.req.job, gear.req.class)}</Text>
			</div>
			{#if gear.req.level > 0 || gear.req.levelIncrease > 0 || gear.req.gender !== undefined}
				<div class="grid grid-cols-[217px_1fr]">
					{#if gear.req.level > 0 || gear.req.levelIncrease > 0}
						<div class="flex">
							<Text color="gray" class="w-[85px]">요구 레벨</Text>
							<ReqLevel
								level={gear.req.level}
								increase={gear.req.levelIncrease}
								decrease={gear.baseOption.reqLevelDecrease + gear.addOption.reqLevelDecrease}
							/>
						</div>
					{/if}
					{#if gear.req.gender !== undefined}
						<div class="flex">
							<Text color="gray" class="w-[66px]">착용 성별</Text>
							<Text>{gear.req.gender === GearGender.Male ? '남' : '여'}</Text>
						</div>
					{/if}
				</div>
			{/if}
		</div>
	</FrameMiddle>
	<FrameLine />
	<FrameMiddle class="px-[15px]">
		<Spacer height={2} />
		{#if gear.attributes.setItemId || gear.attributes.lucky}
			<div class="flex w-full justify-between">
				<UIImage2 image="setGuide" />
				<Text color="gray" class="mr-[2px]">{getSetItemLine(gear)}</Text>
			</div>
		{/if}
		{#if gear.attributes.skills && gear.attributes.skills.length > 0}
			<div class="flex w-full justify-between">
				<Text color="gray">사용 가능 스킬</Text>
				<Text color="gray" class="mr-[2px]">{gear.attributes.skills.join(', ')}</Text>
			</div>
		{/if}
		<div class="flex flex-col">
			{#each basicStats as stat}
				<StatLine {gear} key={stat} />
			{/each}
			{#if gear.attributes.attackSpeed || isWeapon(gear.type) || gear.type === GearType.katara}
				<div class="flex w-[96px] justify-between">
					<Text>공격 속도</Text>
					<Text>{10 - (gear.attributes.attackSpeed ?? 6)}단계</Text>
				</div>
			{/if}
			{#each rateStats as stat}
				<StatLine {gear} key={stat} />
			{/each}
			{#each longRateStats as stat}
				<StatLine size="large" {gear} key={stat} />
			{/each}
		</div>
		{#if gear.desc}
			<Spacer height={4} />
			<TemplateText raw={gear.desc} />
		{/if}
		<Spacer height={2} />
	</FrameMiddle>
	{#if gear.attributes.specialGrade || isEnhanceable(gear.type)}
		<FrameLine />
		<FrameMiddle class="px-[15px]">
			<Spacer height={1} />
			{#if gear.attributes.specialGrade}
				<Text>스페셜 아이템</Text>
				<Spacer height={4} />
			{/if}
			{#if isEnhanceable(gear.type)}
				<EnhanceStarforce
					can={gear.attributes.canStarforce}
					superior={gear.attributes.superior}
					star={gear.star}
					maxStar={Math.max(gear.star, gear.maxStar)}
				/>
				<EnhanceScroll
					can={gear.attributes.canScroll}
					upgrade={gear.scrollUpgradeCount}
					upgradeable={gear.scrollUpgradeableCount}
					resile={gear.scrollResilienceCount}
				/>
				<EnhanceAdd can={gear.attributes.canAddOption} addOptions={gear.addOptions} />
				<Spacer height={4} />
				<PotentialTitle
					can={gear.attributes.canPotential}
					grade={gear.potentialGrade}
					label="잠재능력"
				/>
				{#if gear.potentials.length > 0}
					{#each gear.potentials as potential}
						<PotentialDetail {potential} />
					{/each}
				{/if}
				<Spacer height={4} />
				<PotentialTitle
					can={gear.attributes.canAdditionalPotential}
					grade={gear.additionalPotentialGrade}
					label="에디셔널 잠재능력"
				/>
				{#if gear.additionalPotentials.length > 0}
					{#each gear.additionalPotentials as additionalPotential}
						<PotentialDetail potential={additionalPotential} />
					{/each}
				{/if}
				{#if gear.exceptionalTotalUpgradeableCount > 0}
					<Spacer height={4} />
					<Exceptional
						upgrade={gear.exceptionalUpgradeCount}
						total={gear.exceptionalTotalUpgradeableCount}
						option={gear.exceptionalOption}
					/>
				{/if}
				{#if isWeapon(gear.type)}
					<Spacer height={3} />
					<SoulWeapon enchanted={gear.soulEnchanted} soul={gear.soul} />
				{/if}
			{/if}
		</FrameMiddle>
	{/if}
	{#if attributeStrings.length > 0}
		<FrameMiddle class="px-[15px]">
			<Spacer height={4} />
			{#each attributeStrings as html}
				<TemplateText raw={html} />
			{/each}
		</FrameMiddle>
	{/if}
	<FrameBottom />
</div>
