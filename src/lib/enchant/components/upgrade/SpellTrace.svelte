<script lang="ts">
	import { optionToStrings } from '$lib/gear-tooltip/strings';
	import type { Gear } from '@malib/gear';
	import { ClickableTile, Column, ContentSwitcher, Row, Switch } from 'carbon-components-svelte';
	import { canApplyScroll } from '../../domains/upgrade/common';
	import { SpellTraceEnchanter, type SpellTraceInfo } from '../../domains/upgrade/spelltrace';
	import { resultOrFalse } from '../../domains/util';

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
		<Row>
			<Column>
				<div class="spelltrace__list">
					{#each filterInfos(spellTrace.getInfos(), selectedProb) as info}
						<div class="spelltrace__line">
							<div class="spelltrace__line-first">
								<ClickableTile
									light
									title={optionToStrings(info.scroll.option).join('\n')}
									on:click={() => {
										if (gear && spellTrace) {
											gear = spellTrace.apply(gear, info);
										}
									}}
									disabled={!can}
								>
									<div class="spelltrace__line-content">
										<div class="spelltrace__icon-wrapper">
											<div
												class="spelltrace__icon spelltrace__icon--{info.prob}"
												class:icon--disabled={!can}
											/>
										</div>
										{info.scroll.name}
									</div>
								</ClickableTile>
							</div>
							<div class="spelltrace__line-second">
								<ClickableTile
									light
									on:click={() => {
										if (gear && spellTrace) {
											gear = spellTrace.applyFull(gear, info);
										}
									}}
									disabled={!can}
								>
									+{gear.upgradeCountLeft}
								</ClickableTile>
							</div>
						</div>
					{/each}
				</div>
			</Column>
		</Row>
	{/if}
</div>

<style>
	.spelltrace__switcher {
		margin-top: var(--cds-spacing-05);
	}

	.spelltrace__list {
		margin-top: var(--cds-spacing-05);
	}

	.spelltrace__line {
		display: flex;
	}

	.spelltrace__line:not(:first-child) {
		border-top: 1px solid var(--cds-border-subtle);
	}

	.spelltrace__line-first {
		flex: 3;
	}

	.spelltrace__line-second {
		border-left: 1px solid var(--cds-border-subtle);
		flex: 1;
	}

	.spelltrace__line-content {
		display: flex;
		align-items: center;
	}

	.spelltrace__icon-wrapper {
		display: flex;
		height: 1rem;
		align-items: center;
		margin-right: var(--cds-spacing-03);
	}

	.spelltrace__icon--100 {
		background-image: url(../../images/upgrade/spelltrace/spelltrace100.png);
		width: 30px;
		height: 26px;
		margin-top: 4px;
		margin-left: 2px;
	}
	.spelltrace__icon--70 {
		background-image: url(../../images/upgrade/spelltrace/spelltrace70.png);
		width: 30px;
		height: 26px;
		margin-top: 4px;
		margin-left: 2px;
	}
	.spelltrace__icon--30 {
		background-image: url(../../images/upgrade/spelltrace/spelltrace30.png);
		width: 30px;
		height: 26px;
		margin-top: 4px;
		margin-left: 2px;
	}
	.spelltrace__icon--15 {
		background-image: url(../../images/upgrade/spelltrace/spelltrace15.png);
		width: 31px;
		height: 31px;
		margin-top: 3px;
		margin-left: 2px;
	}
</style>
