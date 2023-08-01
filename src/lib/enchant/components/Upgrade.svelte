<script lang="ts">
	import type { Gear } from '@malib/gear';
	import { Column, Dropdown, Row } from 'carbon-components-svelte';
	import { canUpgrade, isOnlyUpgradeGear } from '../domains/upgrade/common';
	import { resultOrFalse } from '../domains/util';
	import ChaosScroll from './upgrade/ChaosScroll.svelte';
	import CommonButtons from './upgrade/CommonButtons.svelte';
	import OnlyScroll from './upgrade/OnlyScroll.svelte';
	import PadMadScroll from './upgrade/PadMadScroll.svelte';
	import SpecialScroll from './upgrade/SpecialScroll.svelte';
	import SpellTrace from './upgrade/SpellTrace.svelte';
	import ItemIcon from '$lib/icon/ItemIcon.svelte';

	export let can = false;

	export let gear: Gear | undefined;

	$: can = resultOrFalse(canUpgrade, gear);

	$: onlyUpgrade = resultOrFalse(isOnlyUpgradeGear, gear);
	let hasOnlyScroll: boolean;

	let scrollType = 0;
	$: {
		if (onlyUpgrade && scrollType !== 4) scrollType = 4;
		else if (!hasOnlyScroll && scrollType === 4) scrollType = 0;
	}

	function getIconId(text: string) {
		switch(text) {
			case '주문의 흔적':
				return 4001832;
			case '공격력/마력 주문서':
				return 2046856;
			case '혼돈의 주문서':
				return 2049100;
			case '특수 주문서':
				return 2046876;
			case '전용 주문서':
				return 2643132;
			default:
				return 0;
		}
	}
</script>

<div class="upgrade">
	{#if can && gear}
		<div class="upgrade__common">
			<CommonButtons bind:gear />
		</div>

		<div class="upgrade__scroll-type">
			<Row>
				<Column>
					<Dropdown
						titleText="주문서 분류"
						bind:selectedId={scrollType}
						items={[
							{ id: 0, text: '주문의 흔적', disabled: onlyUpgrade },
							{ id: 1, text: '공격력/마력 주문서', disabled: onlyUpgrade },
							{ id: 2, text: '혼돈의 주문서', disabled: onlyUpgrade },
							{ id: 3, text: '특수 주문서', disabled: onlyUpgrade },
							{ id: 4, text: '전용 주문서', disabled: !hasOnlyScroll }
						]}
						let:item
					>
						<div class="scroll-type__content">
							<div class="scroll-type__icon-wrapper">
								<ItemIcon iconId={getIconId(item.text)} />
							</div>
							{item.text}
						</div>
					</Dropdown>
				</Column>
			</Row>
		</div>

		<div class="upgrade__panel" class:upgrade__panel--open={scrollType === 0}>
			<SpellTrace bind:gear />
		</div>
		<div class="upgrade__panel" class:upgrade__panel--open={scrollType === 1}>
			<PadMadScroll bind:gear />
		</div>
		<div class="upgrade__panel" class:upgrade__panel--open={scrollType === 2}>
			<ChaosScroll bind:gear />
		</div>
		<div class="upgrade__panel" class:upgrade__panel--open={scrollType === 3}>
			<SpecialScroll bind:gear />
		</div>
		<div class="upgrade__panel" class:upgrade__panel--open={scrollType === 4}>
			<OnlyScroll bind:gear bind:has={hasOnlyScroll} />
		</div>
	{:else}
		<div class="upgrade__cannont">주문서 강화 불가</div>
	{/if}
</div>

<style>
	.upgrade {
		margin-top: var(--cds-spacing-05);
	}

	.upgrade__scroll-type {
		margin-top: var(--cds-spacing-05);
	}

	.scroll-type__content {
		display: flex;
		align-items: center;
	}

	.scroll-type__icon-wrapper {
		display: flex;
		align-items: center;
		width: var(--cds-layout-03);
		height: 1rem;
		margin-right: var(--cds-spacing-03);
	}

	.upgrade__panel {
		display: none;
	}

	.upgrade__panel--open {
		display: block;
	}
</style>
