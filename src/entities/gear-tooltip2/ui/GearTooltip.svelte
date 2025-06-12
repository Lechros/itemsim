<script lang="ts">
	import { UIImage2 } from '$lib/shared/ui';
	import { GearCapability, GearGender, GearType, isWeapon, ReadonlyGear } from '@malib/gear';
	import { getAttributeHtmlStrings, getTopAttributeHtmlStrings } from '../model/attribute';
	import { getCategories, isEnhanceable } from '../model/category';
	import { getJobString } from '../model/job';
	import Chip from './parts/Chip.svelte';
	import EnhanceAdd from './parts/enhance/EnhanceAdd.svelte';
	import EnhanceCannot from './parts/enhance/EnhanceCannot.svelte';
	import EnhanceScroll from './parts/enhance/EnhanceScroll.svelte';
	import EnhanceScrollSummary from './parts/enhance/EnhanceScrollSummary.svelte';
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
	import DetailText from './parts/text/DetailText.svelte';
	import FormattedDetailText from './parts/text/FormattedDetailText.svelte';
	import ItemNameText from './parts/text/ItemNameText.svelte';

	let {
		gear,
		cannot = {},
		incline,
		loadSetItemName,
		loadExclusiveEquips,
		expand = false
	}: {
		gear: ReadonlyGear;
		cannot?: {
			level?: boolean;
			job?: boolean;
			gender?: boolean;
		};
		incline: { equipped: true } | { combat: number };
		expand?: boolean;
		loadSetItemName: (setItemId: number) => string;
		loadExclusiveEquips: (gearId: number) => string[];
	} = $props();

	const topAttributeStrings = $derived(getTopAttributeHtmlStrings(gear.attributes));
	const attributeStrings = $derived(
		getAttributeHtmlStrings(gear.attributes, loadExclusiveEquips(gear.meta.id))
	);
	const gender = $derived(
		gear.req.gender === GearGender.Male
			? '남'
			: gear.req.gender === GearGender.Female
				? '여'
				: undefined
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

	const stats = [
		'str',
		'dex',
		'int',
		'luk',
		'allStat',
		'maxHp',
		'maxMp',
		'maxHpRate',
		'maxMpRate',
		'maxDemonForce',
		'attackPower',
		'magicPower',
		'armor',
		'speed',
		'jump',
		'damage',
		'bossDamage',
		'ignoreMonsterArmor'
	] as const;
</script>

<div class="relative">
	<FrameTop>
		<Stars
			star={gear.star}
			maxStar={gear.attributes.canStarforce === GearCapability.Fixed ? gear.star : gear.maxStar}
			color={gear.starScroll ? 'blue' : 'yellow'}
			class="mx-auto mt-[10px] pr-[1px]"
		/>
		{#if gear.star >= 23}
			<UIImage2 image="particleStar" class="absolute top-px left-0" />
		{/if}
		<Spacer height={8} />
		{#if false}
			<DetailText color="gray" class="mt-[1px] self-center" value="의" />
		{/if}
		<ItemNameText
			class="self-center pl-[3px]"
			value={gear.name + (gender ? ` (${gender})` : ' ')}
		/>
		{#if gear.attributes.specialGrade}
			<DetailText value="스페셜 아이템" class="self-center pr-[2px]" />
		{/if}
		{#if topAttributeStrings.length > 0}
			{#each topAttributeStrings as html}
				<FormattedDetailText value={html} class="self-center pr-[2px]" />
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
				<DetailText color="darkGray" value="전투력 증가량" />
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
						<Chip value={category} />
					{/each}
				</div>
			</div>
		</div>
		<Spacer height={1} />
		<div class="flex flex-col items-start">
			{#if gear.shape}
				<div class="flex">
					<DetailText color="gray" class="w-[85px]" value="현재 외형" />
					<DetailText value={gear.shape.name} />
				</div>
			{/if}
			<div class="flex">
				<DetailText color="gray" class="w-[85px]" value="착용 직업" />
				<DetailText value={getJobString(gear.type, gear.req.job, gear.req.class)} />
			</div>
			{#if gear.req.level > 0 || gear.req.levelIncrease > 0 || gear.req.gender !== undefined}
				<div class="grid grid-cols-[217px_1fr]">
					{#if gear.req.level > 0 || gear.req.levelIncrease > 0}
						<div class="flex">
							<DetailText color="gray" class="w-[84px]" value="요구 레벨" />
							<ReqLevel
								level={gear.req.level}
								increase={gear.req.levelIncrease}
								decrease={gear.baseOption.reqLevelDecrease + gear.addOption.reqLevelDecrease}
							/>
						</div>
					{/if}
					{#if gender}
						<div class="flex">
							<DetailText color="gray" class="w-[66px]" value="착용 성별" />
							<DetailText value={gender} />
						</div>
					{/if}
				</div>
			{/if}
		</div>
		<Spacer height={2} />
	</FrameMiddle>
	<FrameLine />
	<FrameMiddle class="px-[15px]">
		<Spacer height={1} />
		{#if gear.attributes.setItemId || gear.attributes.lucky}
			<div class="flex">
				<UIImage2 image="setGuide" class="mt-px ml-px w-[84px]!" />
				<DetailText color="gray" value={getSetItemLine(gear)} />
			</div>
		{/if}
		{#if gear.attributes.attackSpeed || isWeapon(gear.type) || gear.type === GearType.katara}
			<div class="flex">
				<DetailText color="gray" class="w-[85px]" value="공격 속도" />
				<DetailText color="gray" value="{10 - (gear.attributes.attackSpeed ?? 6)}단계" />
			</div>
		{/if}
		<div class="flex flex-col">
			{#each stats as stat}
				<StatLine {gear} key={stat} />
			{/each}
		</div>
		{#if gear.desc}
			<Spacer height={4} />
			<FormattedDetailText value={gear.desc} maxWidth={294} />
		{/if}
		{#if gear.attributes.superior}
			<Spacer height={4} />
			<DetailText value="아이템 강화 성공시 더욱 높은 효과를 받을 수 있습니다." />
		{/if}
	</FrameMiddle>
	{#if isEnhanceable(gear.type)}
		<FrameMiddle class="px-[15px]">
			<Spacer height={4} />
			{#if expand}
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
			{:else}
				<EnhanceCannot
					canStarforce={gear.attributes.canStarforce}
					canScroll={gear.attributes.canScroll}
					canAddOption={gear.attributes.canAddOption}
				/>
				{#if gear.attributes.canScroll !== GearCapability.Cannot}
					<EnhanceScrollSummary
						can={gear.attributes.canScroll}
						upgrade={gear.scrollUpgradeCount}
						upgradeable={gear.scrollUpgradeableCount}
						resile={gear.scrollResilienceCount}
					/>
				{/if}
				<DetailText color="darkGray" value="NPC/채집키를 통해 강화 정보 상세 확인 가능" />
			{/if}
			<Spacer height={2} />
		</FrameMiddle>
		<FrameLine />
		<FrameMiddle class="px-[15px]">
			{#if isEnhanceable(gear.type)}
				<Spacer height={1} />
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
				<FormattedDetailText value={html} />
			{/each}
		</FrameMiddle>
	{/if}
	<FrameBottom />
</div>
