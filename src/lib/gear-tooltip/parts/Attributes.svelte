<script lang="ts">
	import { GearPropType, type Gear } from '@malib/gear';
	import { afterUpdate } from 'svelte';
	import { getGearPropString } from '../strings';
	import GearGrade from './GearGrade.svelte';

	export let gear: Gear;

	$: attrs = getAttributeStrings(gear);

	let attributes: HTMLDivElement;

	// Remove ', ' after last attribute of line
	afterUpdate(() => {
		if (!attributes) return;
		const children = attributes.children;
		for (let i = 0; i < children.length - 1; i++) {
			const thisAttr = children[i] as HTMLSpanElement;
			const nextAttr = children[i + 1] as HTMLSpanElement;
			if (thisAttr.getBoundingClientRect().y < nextAttr.getBoundingClientRect().y) {
				thisAttr.classList.add('last');
			}
		}
	});

	function getAttributeStrings(gear: Gear): string[] {
		let value: number;
		const tags: string[] = [];

		if ((value = gear.getPropValue(GearPropType.only))) {
			tags.push(getGearPropString(GearPropType.only, value));
		}
		if ((value = gear.getPropValue(GearPropType.tradeBlock))) {
			tags.push(getGearPropString(GearPropType.tradeBlock, value));
		}
		if ((value = gear.getPropValue(GearPropType.onlyEquip))) {
			tags.push(getGearPropString(GearPropType.onlyEquip, value));
		}
		if ((value = gear.getPropValue(GearPropType.equipTradeBlock))) {
			if (!gear.getBooleanValue(GearPropType.tradeBlock)) {
				tags.push(getGearPropString(GearPropType.equipTradeBlock, value));
			}
		}
		if ((value = gear.getPropValue(GearPropType.accountSharable))) {
			let value2: number;
			if ((value2 = gear.getPropValue(GearPropType.sharableOnce))) {
				tags.push(...getGearPropString(GearPropType.sharableOnce, value2).split('\n'));
			} else {
				tags.push(getGearPropString(GearPropType.accountSharable, value));
			}
		}
		if ((value = gear.getPropValue(GearPropType.blockGoldHammer))) {
			tags.push(getGearPropString(GearPropType.blockGoldHammer, value));
		}
		if (
			(value = gear.getPropValue(GearPropType.fixedPotential)) ||
			(value = gear.getPropValue(GearPropType.fixedGrade))
		) {
			tags.push(getGearPropString(GearPropType.fixedPotential, value));
		}
		if ((value = gear.getPropValue(GearPropType.noLookChange))) {
			tags.push(getGearPropString(GearPropType.noLookChange, value));
		}
		if (
			(gear.itemID / 10000 >= 161 && gear.itemID / 10000 <= 165) ||
			(gear.itemID / 10000 >= 194 && gear.itemID / 10000 <= 197)
		) {
			tags.push('신비의 모루 사용 불가');
		}

		return tags;
	}
</script>

{#if attrs.length > 0}
	<div class="attributes" bind:this={attributes}>
		{#each attrs as attr}
			<span class="item">{attr}</span>
		{/each}
	</div>
{/if}

<style>
	.attributes {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		padding-left: 7px;
		padding-right: 7px;
		line-height: 15px;
		font-size: 11px;
		font-family: 돋움;
		color: var(--gear-orange);
		white-space: pre;
	}

	.item:not(.last):not(:last-child)::after {
		content: ', ';
	}
</style>
