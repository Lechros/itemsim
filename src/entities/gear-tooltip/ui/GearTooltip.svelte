<script lang="ts">
	import type { Gear } from '@malib/gear';
	import Attributes from './components/Attributes.svelte';
	import DotLine from './components/DotLine.svelte';
	import Frame from './components/Frame.svelte';
	import Grade from './components/Grade.svelte';
	import Spacer from './components/Spacer.svelte';
	import Stars from './components/Stars.svelte';
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
	import DiffExtraWrapper from './components/summary/diff/DiffExtraWrapper.svelte';
	import DiffExtra from './components/summary/diff/DiffExtra.svelte';
	import JobReq from './components/JobReq.svelte';
	import { getExtraJobReqString } from '../model/strings';

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
	<Attributes
		only={gear.attributes.only}
		trade={gear.attributes.trade}
		onlyEquip={gear.attributes.onlyEquip}
		share={gear.attributes.share}
		blockGoldenHammer={gear.attributes.blockGoldenHammer}
		canPotential={gear.attributes.canPotential}
	/>
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
					<ReqLevel value={gear.req.level} vary={-gear.addOption.reqLevelDecrease} can />
				</ReqRow>
				<Spacer height={9} />
				<ReqRow>
					<ReqStat type="str" value={gear.req.str} can />
					<ReqStat type="luk" value={gear.req.luk} can />
				</ReqRow>
				<Spacer height={3} />
				<ReqRow>
					<ReqStat type="dex" value={gear.req.dex} can />
					<ReqStat type="int" value={gear.req.int} can />
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
	<JobReq reqJob={gear.req.job} can message={getExtraJobReqString(gear.type)} />
	<Spacer height={9} />
	<DotLine />
	<Spacer height={4} />
</Frame>
