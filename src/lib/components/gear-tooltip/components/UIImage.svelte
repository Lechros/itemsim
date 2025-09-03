<script lang="ts">
	import { tooltipImages } from '$lib/assets/tooltip-images'
	import type { Snippet } from 'svelte';
	import type { ClassValue } from 'svelte/elements';

	let {
		image,
		children,
		class: className,
		style,
		tag = 'div'
	}: {
		image: keyof typeof tooltipImages;
		children?: Snippet;
		class?: ClassValue;
		style?: string;
		tag?: string;
	} = $props();
</script>

{#if children}
	<svelte:element
		this={tag}
		class={[image, className]}
		style="background-image: url({tooltipImages[image]}); {style}"
	>
		{@render children()}
	</svelte:element>
{:else}
	<svelte:element
		this={tag}
		class={[image, className]}
		style="background-image: url({tooltipImages[image]}); {style}"
	/>
{/if}

<style>
	div {
		background-image: var(--url);
	}
	.exceptionalIcon {
		width: 19px;
		height: 13px;
	}
	.frameTop {
		width: 261px;
		height: 13px;
	}
	.frameLine {
		width: 261px;
		height: 1px;
	}
	.frameDotline {
		width: 261px;
		height: 2px;
	}
	.frameBottom {
		width: 261px;
		height: 13px;
	}
	.frameCover {
		width: 53px;
		height: 43px;
	}
	.iconBase {
		width: 82px;
		height: 82px;
	}
	.iconShade {
		width: 49px;
		height: 15px;
	}
	.iconCover {
		width: 74px;
		height: 74px;
	}
	.iconDotNew {
		width: 6px;
		height: 6px;
	}
	.iconDotOld {
		width: 10px;
		height: 10px;
	}
	.iconBorderRare {
		width: 90px;
		height: 80px;
	}
	.iconBorderEpic {
		width: 90px;
		height: 80px;
	}
	.iconBorderUnique {
		width: 90px;
		height: 80px;
	}
	.iconBorderLegendary {
		width: 90px;
		height: 80px;
	}
	.iconBorderUnknown {
		width: 90px;
		height: 80px;
	}
	.jobDisable0 {
		width: 31px;
		height: 10px;
	}
	.jobDisable1 {
		width: 19px;
		height: 10px;
	}
	.jobDisable2 {
		width: 30px;
		height: 10px;
	}
	.jobDisable3 {
		width: 20px;
		height: 10px;
	}
	.jobDisable4 {
		width: 19px;
		height: 10px;
	}
	.jobDisable5 {
		width: 18px;
		height: 10px;
	}
	.jobEnable0 {
		width: 31px;
		height: 10px;
	}
	.jobEnable1 {
		width: 19px;
		height: 10px;
	}
	.jobEnable2 {
		width: 30px;
		height: 10px;
	}
	.jobEnable3 {
		width: 20px;
		height: 10px;
	}
	.jobEnable4 {
		width: 19px;
		height: 10px;
	}
	.jobEnable5 {
		width: 18px;
		height: 10px;
	}
	.jobNormal {
		width: 237px;
		height: 24px;
	}
	.jobExpand {
		width: 237px;
		height: 40px;
	}
	.numberCan0 {
		width: 5px;
		height: 5px;
	}
	.numberCan1 {
		width: 2px;
		height: 5px;
	}
	.numberCan2 {
		width: 5px;
		height: 5px;
	}
	.numberCan3 {
		width: 5px;
		height: 5px;
	}
	.numberCan4 {
		width: 5px;
		height: 5px;
	}
	.numberCan5 {
		width: 5px;
		height: 5px;
	}
	.numberCan6 {
		width: 5px;
		height: 5px;
	}
	.numberCan7 {
		width: 4px;
		height: 5px;
	}
	.numberCan8 {
		width: 5px;
		height: 5px;
	}
	.numberCan9 {
		width: 5px;
		height: 5px;
	}
	.numberCanClose {
		width: 2px;
		height: 5px;
	}
	.numberCanMinus {
		width: 5px;
		height: 1px;
	}
	.numberCanNone {
		width: 5px;
		height: 1px;
	}
	.numberCanOpen {
		width: 2px;
		height: 5px;
	}
	.numberCanPercent {
		width: 5px;
		height: 5px;
	}
	.numberCanPlus {
		width: 5px;
		height: 5px;
	}
	.numberCanReqDex {
		width: 50px;
		height: 6px;
	}
	.numberCanReqInt {
		width: 50px;
		height: 6px;
	}
	.numberCanReqLev {
		width: 49px;
		height: 6px;
	}
	.numberCanReqLuk {
		width: 50px;
		height: 6px;
	}
	.numberCanReqPop {
		width: 50px;
		height: 6px;
	}
	.numberCanReqStr {
		width: 50px;
		height: 6px;
	}
	.numberCannot0 {
		width: 5px;
		height: 5px;
	}
	.numberCannot1 {
		width: 2px;
		height: 5px;
	}
	.numberCannot2 {
		width: 5px;
		height: 5px;
	}
	.numberCannot3 {
		width: 5px;
		height: 5px;
	}
	.numberCannot4 {
		width: 5px;
		height: 5px;
	}
	.numberCannot5 {
		width: 5px;
		height: 5px;
	}
	.numberCannot6 {
		width: 5px;
		height: 5px;
	}
	.numberCannot7 {
		width: 4px;
		height: 5px;
	}
	.numberCannot8 {
		width: 5px;
		height: 5px;
	}
	.numberCannot9 {
		width: 5px;
		height: 5px;
	}
	.numberCannotMinus {
		width: 5px;
		height: 1px;
	}
	.numberCannotNone {
		width: 5px;
		height: 1px;
	}
	.numberCannotPercent {
		width: 5px;
		height: 5px;
	}
	.numberCannotPlus {
		width: 5px;
		height: 5px;
	}
	.numberCannotReqDex {
		width: 50px;
		height: 6px;
	}
	.numberCannotReqInt {
		width: 50px;
		height: 6px;
	}
	.numberCannotReqLev {
		width: 50px;
		height: 6px;
	}
	.numberCannotReqLuk {
		width: 50px;
		height: 6px;
	}
	.numberCannotReqPop {
		width: 50px;
		height: 6px;
	}
	.numberCannotReqStr {
		width: 50px;
		height: 6px;
	}
	.numberDisabled0 {
		width: 5px;
		height: 5px;
	}
	.numberDisabled1 {
		width: 2px;
		height: 5px;
	}
	.numberDisabled2 {
		width: 5px;
		height: 5px;
	}
	.numberDisabled3 {
		width: 5px;
		height: 5px;
	}
	.numberDisabled4 {
		width: 5px;
		height: 5px;
	}
	.numberDisabled5 {
		width: 5px;
		height: 5px;
	}
	.numberDisabled6 {
		width: 5px;
		height: 5px;
	}
	.numberDisabled7 {
		width: 4px;
		height: 5px;
	}
	.numberDisabled8 {
		width: 5px;
		height: 5px;
	}
	.numberDisabled9 {
		width: 5px;
		height: 5px;
	}
	.numberDisabledMinus {
		width: 5px;
		height: 1px;
	}
	.numberDisabledNone {
		width: 5px;
		height: 1px;
	}
	.numberDisabledPercent {
		width: 5px;
		height: 5px;
	}
	.numberDisabledPlus {
		width: 5px;
		height: 5px;
	}
	.numberDisabledReqDex {
		width: 50px;
		height: 6px;
	}
	.numberDisabledReqInt {
		width: 50px;
		height: 6px;
	}
	.numberDisabledReqLev {
		width: 50px;
		height: 6px;
	}
	.numberDisabledReqLuk {
		width: 50px;
		height: 6px;
	}
	.numberDisabledReqPop {
		width: 50px;
		height: 6px;
	}
	.numberDisabledReqStr {
		width: 50px;
		height: 6px;
	}
	.numberLookahead0 {
		width: 5px;
		height: 5px;
	}
	.numberLookahead1 {
		width: 2px;
		height: 5px;
	}
	.numberLookahead2 {
		width: 5px;
		height: 5px;
	}
	.numberLookahead3 {
		width: 5px;
		height: 5px;
	}
	.numberLookahead4 {
		width: 5px;
		height: 5px;
	}
	.numberLookahead5 {
		width: 5px;
		height: 5px;
	}
	.numberLookahead6 {
		width: 5px;
		height: 5px;
	}
	.numberLookahead7 {
		width: 4px;
		height: 5px;
	}
	.numberLookahead8 {
		width: 5px;
		height: 5px;
	}
	.numberLookahead9 {
		width: 5px;
		height: 5px;
	}
	.numberLookaheadMinus {
		width: 5px;
		height: 1px;
	}
	.numberLookaheadNone {
		width: 5px;
		height: 1px;
	}
	.numberLookaheadPercent {
		width: 5px;
		height: 5px;
	}
	.numberLookaheadPlus {
		width: 5px;
		height: 5px;
	}
	.numberYellow0 {
		width: 5px;
		height: 5px;
	}
	.numberYellow1 {
		width: 2px;
		height: 5px;
	}
	.numberYellow2 {
		width: 5px;
		height: 5px;
	}
	.numberYellow3 {
		width: 5px;
		height: 5px;
	}
	.numberYellow4 {
		width: 5px;
		height: 5px;
	}
	.numberYellow5 {
		width: 5px;
		height: 5px;
	}
	.numberYellow6 {
		width: 5px;
		height: 5px;
	}
	.numberYellow7 {
		width: 4px;
		height: 5px;
	}
	.numberYellow8 {
		width: 5px;
		height: 5px;
	}
	.numberYellow9 {
		width: 5px;
		height: 5px;
	}
	.numberYellowMinus {
		width: 5px;
		height: 1px;
	}
	.numberYellowNone {
		width: 5px;
		height: 1px;
	}
	.numberYellowPercent {
		width: 5px;
		height: 5px;
	}
	.numberYellowPlus {
		width: 5px;
		height: 5px;
	}
	.potentialIconNormal {
		width: 13px;
		height: 13px;
	}
	.potentialIconRare {
		width: 13px;
		height: 13px;
	}
	.potentialIconEpic {
		width: 13px;
		height: 13px;
	}
	.potentialIconUnique {
		width: 13px;
		height: 13px;
	}
	.potentialIconLegendary {
		width: 13px;
		height: 13px;
	}
	.yellowStar {
		width: 11px;
		height: 10px;
	}
	.blueStar {
		width: 11px;
		height: 10px;
	}
	.emptyStar {
		width: 11px;
		height: 10px;
	}
	.incline0 {
		width: 19px;
		height: 26px;
	}
	.incline1 {
		width: 14px;
		height: 26px;
	}
	.incline2 {
		width: 18px;
		height: 26px;
	}
	.incline3 {
		width: 17px;
		height: 26px;
	}
	.incline4 {
		width: 20px;
		height: 26px;
	}
	.incline5 {
		width: 17px;
		height: 26px;
	}
	.incline6 {
		width: 18px;
		height: 26px;
	}
	.incline7 {
		width: 18px;
		height: 26px;
	}
	.incline8 {
		width: 19px;
		height: 26px;
	}
	.incline9 {
		width: 19px;
		height: 26px;
	}
	.inclinePlus {
		width: 18px;
		height: 18px;
	}
	.incline0_10digit {
		width: 16px;
		height: 23px;
	}
	.incline1_10digit {
		width: 13px;
		height: 23px;
	}
	.incline2_10digit {
		width: 15px;
		height: 23px;
	}
	.incline3_10digit {
		width: 15px;
		height: 23px;
	}
	.incline4_10digit {
		width: 17px;
		height: 23px;
	}
	.incline5_10digit {
		width: 16px;
		height: 23px;
	}
	.incline6_10digit {
		width: 16px;
		height: 23px;
	}
	.incline7_10digit {
		width: 16px;
		height: 23px;
	}
	.incline8_10digit {
		width: 16px;
		height: 23px;
	}
	.incline9_10digit {
		width: 16px;
		height: 23px;
	}
	.inclinePlus_10digit {
		width: 18px;
		height: 18px;
	}
	.incline0_8digit {
		width: 15px;
		height: 21px;
	}
	.incline1_8digit {
		width: 12px;
		height: 21px;
	}
	.incline2_8digit {
		width: 15px;
		height: 21px;
	}
	.incline3_8digit {
		width: 15px;
		height: 21px;
	}
	.incline4_8digit {
		width: 16px;
		height: 21px;
	}
	.incline5_8digit {
		width: 15px;
		height: 21px;
	}
	.incline6_8digit {
		width: 15px;
		height: 21px;
	}
	.incline7_8digit {
		width: 15px;
		height: 21px;
	}
	.incline8_8digit {
		width: 15px;
		height: 21px;
	}
	.incline9_8digit {
		width: 15px;
		height: 21px;
	}
	.inclinePlus_8digit {
		width: 15px;
		height: 15px;
	}
	.decline0 {
		width: 19px;
		height: 26px;
	}
	.decline1 {
		width: 14px;
		height: 26px;
	}
	.decline2 {
		width: 18px;
		height: 26px;
	}
	.decline3 {
		width: 17px;
		height: 26px;
	}
	.decline4 {
		width: 20px;
		height: 26px;
	}
	.decline5 {
		width: 17px;
		height: 26px;
	}
	.decline6 {
		width: 18px;
		height: 26px;
	}
	.decline7 {
		width: 18px;
		height: 26px;
	}
	.decline8 {
		width: 19px;
		height: 26px;
	}
	.decline9 {
		width: 19px;
		height: 26px;
	}
	.declineMinus {
		width: 16px;
		height: 8px;
	}
	.decline0_10digit {
		width: 16px;
		height: 23px;
	}
	.decline1_10digit {
		width: 13px;
		height: 23px;
	}
	.decline2_10digit {
		width: 15px;
		height: 23px;
	}
	.decline3_10digit {
		width: 15px;
		height: 23px;
	}
	.decline4_10digit {
		width: 17px;
		height: 23px;
	}
	.decline5_10digit {
		width: 16px;
		height: 23px;
	}
	.decline6_10digit {
		width: 16px;
		height: 23px;
	}
	.decline7_10digit {
		width: 16px;
		height: 23px;
	}
	.decline8_10digit {
		width: 16px;
		height: 23px;
	}
	.decline9_10digit {
		width: 16px;
		height: 23px;
	}
	.declineMinus_10digit {
		width: 16px;
		height: 8px;
	}
	.decline0_8digit {
		width: 15px;
		height: 21px;
	}
	.decline1_8digit {
		width: 12px;
		height: 21px;
	}
	.decline2_8digit {
		width: 15px;
		height: 21px;
	}
	.decline3_8digit {
		width: 15px;
		height: 21px;
	}
	.decline4_8digit {
		width: 16px;
		height: 21px;
	}
	.decline5_8digit {
		width: 15px;
		height: 21px;
	}
	.decline6_8digit {
		width: 15px;
		height: 21px;
	}
	.decline7_8digit {
		width: 15px;
		height: 21px;
	}
	.decline8_8digit {
		width: 15px;
		height: 21px;
	}
	.decline9_8digit {
		width: 15px;
		height: 21px;
	}
	.declineMinus_8digit {
		width: 13px;
		height: 7px;
	}
	.summaryIconPdd {
		width: 17px;
		height: 17px;
	}
	.summaryIconBdr {
		width: 17px;
		height: 17px;
	}
	.summaryIconIgpddr {
		width: 16px;
		height: 16px;
	}
</style>
