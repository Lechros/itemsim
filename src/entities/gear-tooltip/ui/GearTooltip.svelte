<script lang="ts">
	import {
		PotentialGrade,
		type Gear,
		type GearAddOption,
		type GearStarforceOption,
		type GearUpgradeOption
	} from '@malib/gear';
	import { getDescriptions, getExtraJobReqString, getTags } from '../model/strings';
	import Attributes from './components/Attributes.svelte';
	import DetailCannotAdditionalPotential from './components/detail/DetailCannotAdditionalPotential.svelte';
	import DetailCannotPotential from './components/detail/DetailCannotPotential.svelte';
	import DetailCuttableCount from './components/detail/DetailCuttableCount.svelte';
	import DetailGearType from './components/detail/DetailGearType.svelte';
	import DetailGoldenHammer from './components/detail/DetailGoldenHammer.svelte';
	import DetailOption from './components/detail/DetailOption.svelte';
	import DetailReqLevelDecrease from './components/detail/DetailReqLevelDecrease.svelte';
	import DetailSuperior from './components/detail/DetailSuperior.svelte';
	import DetailSuperiorDesc from './components/detail/DetailSuperiorDesc.svelte';
	import DetailUpgradeCount from './components/detail/DetailUpgradeCount.svelte';
	import DetailWrapper from './components/detail/DetailWrapper.svelte';
	import DotLine from './components/DotLine.svelte';
	import Frame from './components/Frame.svelte';
	import Grade from './components/Grade.svelte';
	import JobReq from './components/JobReq.svelte';
	import PotentialLabel from './components/potential/PotentialLabel.svelte';
	import PotentialOption from './components/potential/PotentialOption.svelte';
	import PotentialOptionsWrapper from './components/potential/PotentialOptionsWrapper.svelte';
	import PotentialWrapper from './components/potential/PotentialWrapper.svelte';
	import SoulChargeRow from './components/soul/SoulChargeRow.svelte';
	import SoulNameRow from './components/soul/SoulNameRow.svelte';
	import SoulOptionRow from './components/soul/SoulOptionRow.svelte';
	import SoulWrapper from './components/soul/SoulWrapper.svelte';
	import Spacer from './components/Spacer.svelte';
	import Stars from './components/Stars.svelte';
	import DiffExtra from './components/summary/diff/DiffExtra.svelte';
	import DiffExtraWrapper from './components/summary/diff/DiffExtraWrapper.svelte';
	import Icon from './components/summary/icon/Icon.svelte';
	import IconWrapper from './components/summary/icon/IconWrapper.svelte';
	import Incline from './components/summary/Incline.svelte';
	import ReqLevel from './components/summary/req/ReqLevel.svelte';
	import ReqRow from './components/summary/req/ReqRow.svelte';
	import ReqStat from './components/summary/req/ReqStat.svelte';
	import ReqWrapper from './components/summary/req/ReqWrapper.svelte';
	import SummaryDetailWrapper from './components/summary/SummaryDetailWrapper.svelte';
	import SummaryWrapper from './components/summary/SummaryWrapper.svelte';
	import NameTitle from './components/title/NameTitle.svelte';
	import SoulTitle from './components/title/SoulTitle.svelte';
	import TitleWrapper from './components/title/TitleWrapper.svelte';
	import './tooltip.css';
	import SoulSkillRow from './components/soul/SoulSkillRow.svelte';
	import ExceptionalWrapper from './components/exceptional/ExceptionalWrapper.svelte';
	import ExceptionalLabel from './components/exceptional/ExceptionalLabel.svelte';
	import ExceptionalOptionsWrapper from './components/exceptional/ExceptionalOptionsWrapper.svelte';
	import ExceptionalOptions from './components/exceptional/ExceptionalOptions.svelte';
	import ExceptionalUpgradeCount from './components/exceptional/ExceptionalUpgradeCount.svelte';
	import DescriptionsWrapper from './components/description/DescriptionsWrapper.svelte';
	import Description from './components/description/Description.svelte';
	import ShapeWrapper from './components/shape/ShapeWrapper.svelte';
	import ShapeRow from './components/shape/ShapeRow.svelte';

	let {
		gear,
		incline,
		cannot = {},
		diff = { pdd: 0, bdr: 0, igpddr: 0 }
	}: {
		gear: Gear;
		incline: { attack: number } | { combat: number } | { attack: number; combat: number };
		cannot?: {
			level?: boolean;
			str?: boolean;
			dex?: boolean;
			int?: boolean;
			luk?: boolean;
			job?: boolean;
		};
		diff?: {
			pdd: number;
			bdr: number;
			igpddr: number;
		};
	} = $props();

	const tags = $derived(
		getTags({
			only: gear.attributes.only,
			trade: gear.attributes.trade,
			onlyEquip: gear.attributes.onlyEquip,
			share: gear.attributes.share,
			blockGoldenHammer: gear.attributes.blockGoldenHammer,
			canPotential: gear.attributes.canPotential
		})
	);

	const detailOptions = [
		['str'],
		['dex'],
		['int'],
		['luk'],
		['maxHp'],
		['maxMp'],
		['maxHpRate', true],
		['maxMpRate', true],
		['maxDemonForce'],
		['attackPower'],
		['magicPower'],
		['armor'],
		['speed'],
		['jump'],
		['knockback', true],
		['bossDamage', true],
		['ignoreMonsterArmor', true],
		['damage', true],
		['allStat', true]
	] as const;

	const descriptions = $derived(
		getDescriptions({
			desc: gear.desc,
			trade: gear.attributes.trade,
			cuttable: gear.attributes.cuttable,
			accountShareTag: gear.attributes.accountShareTag,
			lucky: gear.attributes.lucky,
			incline: gear.attributes.incline,
			starScroll: gear.starScroll
		})
	);
</script>

<Frame>
	<Stars star={gear.star} maxStar={gear.maxStar} color={gear.starScroll ? 'blue' : 'yellow'} />
	<TitleWrapper>
		<SoulTitle soulName={gear.soul?.name} />
		<NameTitle
			name={gear.name}
			scrollUpgradeCount={gear.scrollUpgradeCount}
			color={gear.scrollUpgradeCount > 0 ? 'red' : 'white'}
		/>
	</TitleWrapper>
	<Spacer height={4} />
	<Grade grade={gear.potentialGrade} specialGrade={gear.attributes.specialGrade} />
	<Attributes {tags} />
	<Spacer height={10} />
	<DotLine />
	<SummaryWrapper>
		<IconWrapper>
			<Icon icon={gear.shapeIcon} grade={gear.potentialGrade} />
		</IconWrapper>
		<SummaryDetailWrapper>
			{#if 'attack' in incline && 'combat' in incline}
				<Incline label="공격력 증가량" diff={incline.attack} small />
				<Incline label="전투력 증가량" diff={incline.combat} small />
			{:else if 'attack' in incline}
				<Incline label="공격력 증가량" diff={incline.attack} />
			{:else if 'combat' in incline}
				<Incline label="전투력 증가량" diff={incline.combat} />
			{/if}
			<Spacer height={1} />
			<ReqWrapper>
				<ReqRow>
					<ReqLevel
						value={gear.req.level}
						vary={-gear.addOption.reqLevelDecrease}
						can={!cannot.level}
					/>
				</ReqRow>
				<Spacer height={9} />
				<ReqRow>
					<ReqStat type="str" value={gear.req.str} can={!cannot.str} />
					<ReqStat type="luk" value={gear.req.luk} can={!cannot.luk} />
				</ReqRow>
				<Spacer height={3} />
				<ReqRow>
					<ReqStat type="dex" value={gear.req.dex} can={!cannot.dex} />
					<ReqStat type="int" value={gear.req.int} can={!cannot.int} />
				</ReqRow>
			</ReqWrapper>
		</SummaryDetailWrapper>
	</SummaryWrapper>
	<Spacer height={5} />
	<DiffExtraWrapper>
		<DiffExtra type="pdd" value={diff.pdd} />
		<DiffExtra type="bdr" value={diff.bdr} percent />
		<DiffExtra type="igpddr" value={diff.igpddr} percent />
	</DiffExtraWrapper>
	<Spacer height={3} />
	<JobReq reqJob={gear.req.job} message={getExtraJobReqString(gear.type)} can={!cannot.job} />
	<Spacer height={9} />
	<DotLine />
	<Spacer height={4} />
	<DetailWrapper>
		<DetailSuperior superior={gear.attributes.superior} />
		<DetailGearType gearType={gear.type} attackSpeed={gear.attributes.attackSpeed} />
		{#each detailOptions as [type, isPercent]}
			<DetailOption
				{type}
				base={gear.baseOption[type]}
				add={gear.addOption[type as keyof GearAddOption]}
				upgrade={gear.upgradeOption[type as keyof GearUpgradeOption]}
				starforce={gear.starforceOption[type as keyof GearStarforceOption]}
				{isPercent}
			/>
		{/each}
		<DetailReqLevelDecrease reqLevelDecrease={gear.addOption.reqLevelDecrease} />
		<DetailUpgradeCount
			scrollTotalUpgradeableCount={gear.scrollTotalUpgradeableCount}
			scrollUpgradeableCount={gear.scrollUpgradeableCount}
			scrollResilienceCount={gear.scrollResilienceCount}
			cannotUpgrade={gear.attributes.cannotUpgrade}
		/>
		<DetailGoldenHammer goldenHammer={gear.goldenHammer} />
		<DetailCuttableCount cuttableCount={gear.attributes.cuttableCount} />
		<DetailCannotPotential cannotPotential={!gear.supportsPotential} />
		<DetailCannotAdditionalPotential
			cannotAdditionalPotential={!gear.supportsAdditionalPotential}
		/>
		<DetailSuperiorDesc superior={gear.attributes.superior} />
	</DetailWrapper>
	<Spacer height={8} />
	<PotentialWrapper grade={gear.potentialGrade}>
		{#snippet before()}
			<Spacer height={2} />
			<DotLine />
			<Spacer height={4} />
		{/snippet}
		<PotentialLabel grade={gear.potentialGrade} label="잠재옵션" />
		<PotentialOptionsWrapper>
			{#each gear.potentials as potential}
				<PotentialOption summary={potential.summary} />
			{/each}
		</PotentialOptionsWrapper>
	</PotentialWrapper>
	<PotentialWrapper grade={gear.additionalPotentialGrade}>
		{#snippet before()}
			<Spacer height={2} />
			<DotLine />
			<Spacer height={4} />
		{/snippet}
		<PotentialLabel grade={gear.additionalPotentialGrade} label="에디셔널 잠재옵션" />
		<PotentialOptionsWrapper>
			{#each gear.potentials as potential}
				<PotentialOption summary="+ {potential.summary}" />
			{/each}
		</PotentialOptionsWrapper>
	</PotentialWrapper>
	<ExceptionalWrapper exceptionalTotalUpgradeCount={gear.exceptionalTotalUpgradeableCount}>
		{#snippet before()}
			<Spacer height={12} />
			<DotLine />
			<Spacer height={4} />
		{/snippet}
		{#if gear.exceptionalUpgradeCount > 0}
			<ExceptionalLabel label="익셉셔널" />
			<Spacer height={4} />
			<ExceptionalOptionsWrapper>
				<ExceptionalOptions exceptionalOption={gear.exceptionalOption} />
			</ExceptionalOptionsWrapper>
		{/if}
		<ExceptionalUpgradeCount
			exceptionalUpgradeCount={gear.exceptionalUpgradeCount}
			exceptionalTotalUpgradeCount={gear.exceptionalTotalUpgradeableCount}
		/>
	</ExceptionalWrapper>
	<SoulWrapper soulEnchanted={gear.soulEnchanted}>
		{#snippet before()}
			<Spacer height={2} />
			<DotLine />
			<Spacer height={4} />
		{/snippet}
		<SoulNameRow name={gear.soul?.name} />
		<SoulChargeRow charge={gear.soulCharge} chargeOption={gear.soulChargeOption} />
		<SoulOptionRow soulOption={gear.soul?.option} />
		<SoulSkillRow skill={gear.soul?.skill} />
	</SoulWrapper>
	{#if descriptions.length > 0}
		<Spacer height={2} />
		<DotLine />
		<Spacer height={4} />
		<DescriptionsWrapper>
			{#each descriptions as description}
				<Description {description} />
			{/each}
		</DescriptionsWrapper>
	{/if}
	<ShapeWrapper shape={gear.shape}>
		{#snippet before()}
			<Spacer height={15} />
		{/snippet}
		<ShapeRow name={gear.shape!.name} />
	</ShapeWrapper>
</Frame>
