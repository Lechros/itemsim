<script lang="ts">
	import { optionToStrings } from '$lib/gear-tooltip/strings';
	import type { Gear, SpellTraceProbability } from '@malib/gear';
	import { ClickableTile, Column, ContentSwitcher, Row, Switch } from 'carbon-components-svelte';
	import { canApplyScroll } from '../../domains/upgrade/common';
	import { SpellTraceEnchanter, type SpellTraceInfo } from '../../domains/upgrade/spelltrace';
	import { resultOrFalse } from '../../domains/util';
	import ItemIcon from '$lib/icon/ItemIcon.svelte';
	import ItemIconButton from '../button/ItemIconButton.svelte';
	import ItemIconButtonList from '../button/ItemIconButtonList.svelte';

	export let gear: Gear | undefined;

	$: can = resultOrFalse(canApplyScroll, gear);

	let spellTrace: SpellTraceEnchanter | undefined;
	$: {
		spellTrace = SpellTraceEnchanter.getUpdatedInstance(gear, spellTrace);
	}

	$: spellTraceProbs = spellTrace ? [-1, ...spellTrace.getProbs()] : [];
	let spellTraceProbIdx = 0;
	$: {
		if (spellTraceProbIdx > spellTraceProbs.length) {
			spellTraceProbIdx = 0;
		}
	}
	$: selectedProb = spellTraceProbs[spellTraceProbIdx];

	function getProbName(prob: number) {
		if (prob < 0) return '전체';
		else return `${prob}%`;
	}

	function filterInfos(infos: SpellTraceInfo[], prob: number) {
		if (prob < 0) return infos;
		else return infos.filter((info) => info.prob === prob);
	}

	function getIconId(probability: SpellTraceProbability) {
		switch (probability) {
			case 100:
				return 2040000;
			case 70:
				return 2040008;
			case 30:
				return 2040001;
			case 15:
				return 2040022;
		}
	}
</script>

<div class="spelltrace">
	{#if gear && spellTrace}
		<div class="spelltrace__switcher">
			<Row>
				<Column>
					<ContentSwitcher bind:selectedIndex={spellTraceProbIdx}>
						{#each spellTraceProbs as prob}
							<Switch text={getProbName(prob)} />
						{/each}
					</ContentSwitcher>
				</Column>
			</Row>
		</div>
		<div class="spelltrace__list">
			<Row>
				<Column>
					<ItemIconButtonList>
						{#each filterInfos(spellTrace.getInfos(), selectedProb) as info}
							<ItemIconButton
								type="double"
								primaryIconId={getIconId(info.prob)}
								primaryText={info.scroll.name}
								primaryDisabled={!can}
								primaryTitle={optionToStrings(info.scroll.option).join('\n')}
								secondaryText="+{gear.upgradeCountLeft}"
								secondaryDisabled={!can}
								on:click={() => {
									if (gear && spellTrace) {
										gear = spellTrace.apply(gear, info);
									}
								}}
								on:click:button--secondary={() => {
									if (gear && spellTrace) {
										gear = spellTrace.applyFull(gear, info);
									}
								}}
							/>
						{/each}
					</ItemIconButtonList>
				</Column>
			</Row>
		</div>
	{/if}
</div>

<style>
	.spelltrace__switcher {
		margin-top: var(--cds-spacing-05);
	}

	.spelltrace__list {
		margin-top: var(--cds-spacing-05);
	}
</style>
