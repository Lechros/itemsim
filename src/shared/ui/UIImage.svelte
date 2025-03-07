<script lang="ts">
	import {
		blueStar,
		decline0,
		decline1,
		decline2,
		decline3,
		decline4,
		decline5,
		decline6,
		decline7,
		decline8,
		decline9,
		declineMinus,
		decline0_10digit,
		decline1_10digit,
		decline2_10digit,
		decline3_10digit,
		decline4_10digit,
		decline5_10digit,
		decline6_10digit,
		decline7_10digit,
		decline8_10digit,
		decline9_10digit,
		declineMinus_10digit,
		decline0_8digit,
		decline1_8digit,
		decline2_8digit,
		decline3_8digit,
		decline4_8digit,
		decline5_8digit,
		decline6_8digit,
		decline7_8digit,
		decline8_8digit,
		decline9_8digit,
		declineMinus_8digit,
		emptyStar,
		exceptionalIcon,
		frameBottom,
		frameCover,
		frameDotline,
		frameLine,
		frameTop,
		iconBase,
		iconBorderEpic,
		iconBorderLegendary,
		iconBorderRare,
		iconBorderUnique,
		iconBorderUnknown,
		iconCover,
		iconDotNew,
		iconDotOld,
		iconShade,
		incline0,
		incline1,
		incline2,
		incline3,
		incline4,
		incline5,
		incline6,
		incline7,
		incline8,
		incline9,
		inclinePlus,
		incline0_10digit,
		incline1_10digit,
		incline2_10digit,
		incline3_10digit,
		incline4_10digit,
		incline5_10digit,
		incline6_10digit,
		incline7_10digit,
		incline8_10digit,
		incline9_10digit,
		inclinePlus_10digit,
		incline0_8digit,
		incline1_8digit,
		incline2_8digit,
		incline3_8digit,
		incline4_8digit,
		incline5_8digit,
		incline6_8digit,
		incline7_8digit,
		incline8_8digit,
		incline9_8digit,
		inclinePlus_8digit,
		jobDisable0,
		jobDisable1,
		jobDisable2,
		jobDisable3,
		jobDisable4,
		jobDisable5,
		jobEnable0,
		jobEnable1,
		jobEnable2,
		jobEnable3,
		jobEnable4,
		jobEnable5,
		jobExpand,
		jobNormal,
		numberCan0,
		numberCan1,
		numberCan2,
		numberCan3,
		numberCan4,
		numberCan5,
		numberCan6,
		numberCan7,
		numberCan8,
		numberCan9,
		numberCanClose,
		numberCanMinus,
		numberCanNone,
		numberCanOpen,
		numberCanPercent,
		numberCanPlus,
		numberCanReqDex,
		numberCanReqInt,
		numberCanReqLev,
		numberCanReqLuk,
		numberCanReqPop,
		numberCanReqStr,
		numberCannot0,
		numberCannot1,
		numberCannot2,
		numberCannot3,
		numberCannot4,
		numberCannot5,
		numberCannot6,
		numberCannot7,
		numberCannot8,
		numberCannot9,
		numberCannotMinus,
		numberCannotNone,
		numberCannotPercent,
		numberCannotPlus,
		numberCannotReqDex,
		numberCannotReqInt,
		numberCannotReqLev,
		numberCannotReqLuk,
		numberCannotReqPop,
		numberCannotReqStr,
		numberDisabled0,
		numberDisabled1,
		numberDisabled2,
		numberDisabled3,
		numberDisabled4,
		numberDisabled5,
		numberDisabled6,
		numberDisabled7,
		numberDisabled8,
		numberDisabled9,
		numberDisabledMinus,
		numberDisabledNone,
		numberDisabledPercent,
		numberDisabledPlus,
		numberDisabledReqDex,
		numberDisabledReqInt,
		numberDisabledReqLev,
		numberDisabledReqLuk,
		numberDisabledReqPop,
		numberDisabledReqStr,
		numberLookahead0,
		numberLookahead1,
		numberLookahead2,
		numberLookahead3,
		numberLookahead4,
		numberLookahead5,
		numberLookahead6,
		numberLookahead7,
		numberLookahead8,
		numberLookahead9,
		numberLookaheadMinus,
		numberLookaheadNone,
		numberLookaheadPercent,
		numberLookaheadPlus,
		numberYellow0,
		numberYellow1,
		numberYellow2,
		numberYellow3,
		numberYellow4,
		numberYellow5,
		numberYellow6,
		numberYellow7,
		numberYellow8,
		numberYellow9,
		numberYellowMinus,
		numberYellowNone,
		numberYellowPercent,
		numberYellowPlus,
		potentialIconEpic,
		potentialIconLegendary,
		potentialIconNormal,
		potentialIconRare,
		potentialIconUnique,
		summaryIconBdr,
		summaryIconIgpddr,
		summaryIconPdd,
		yellowStar
	} from '$lib/shared/assets';
	import type { Snippet } from 'svelte';
	import type { ClassValue } from 'svelte/elements';

	const mappings = {
		exceptionalIcon,
		frameTop,
		frameLine,
		frameDotline,
		frameBottom,
		frameCover,
		iconBase,
		iconShade,
		iconCover,
		iconDotNew,
		iconDotOld,
		iconBorderRare,
		iconBorderEpic,
		iconBorderUnique,
		iconBorderLegendary,
		iconBorderUnknown,
		jobDisable0,
		jobDisable1,
		jobDisable2,
		jobDisable3,
		jobDisable4,
		jobDisable5,
		jobEnable0,
		jobEnable1,
		jobEnable2,
		jobEnable3,
		jobEnable4,
		jobEnable5,
		jobNormal,
		jobExpand,
		numberCan0,
		numberCan1,
		numberCan2,
		numberCan3,
		numberCan4,
		numberCan5,
		numberCan6,
		numberCan7,
		numberCan8,
		numberCan9,
		numberCanClose,
		numberCanMinus,
		numberCanNone,
		numberCanOpen,
		numberCanPercent,
		numberCanPlus,
		numberCanReqDex,
		numberCanReqInt,
		numberCanReqLev,
		numberCanReqLuk,
		numberCanReqPop,
		numberCanReqStr,
		numberCannot0,
		numberCannot1,
		numberCannot2,
		numberCannot3,
		numberCannot4,
		numberCannot5,
		numberCannot6,
		numberCannot7,
		numberCannot8,
		numberCannot9,
		numberCannotMinus,
		numberCannotNone,
		numberCannotPercent,
		numberCannotPlus,
		numberCannotReqDex,
		numberCannotReqInt,
		numberCannotReqLev,
		numberCannotReqLuk,
		numberCannotReqPop,
		numberCannotReqStr,
		numberDisabled0,
		numberDisabled1,
		numberDisabled2,
		numberDisabled3,
		numberDisabled4,
		numberDisabled5,
		numberDisabled6,
		numberDisabled7,
		numberDisabled8,
		numberDisabled9,
		numberDisabledMinus,
		numberDisabledNone,
		numberDisabledPercent,
		numberDisabledPlus,
		numberDisabledReqDex,
		numberDisabledReqInt,
		numberDisabledReqLev,
		numberDisabledReqLuk,
		numberDisabledReqPop,
		numberDisabledReqStr,
		numberLookahead0,
		numberLookahead1,
		numberLookahead2,
		numberLookahead3,
		numberLookahead4,
		numberLookahead5,
		numberLookahead6,
		numberLookahead7,
		numberLookahead8,
		numberLookahead9,
		numberLookaheadMinus,
		numberLookaheadNone,
		numberLookaheadPercent,
		numberLookaheadPlus,
		numberYellow0,
		numberYellow1,
		numberYellow2,
		numberYellow3,
		numberYellow4,
		numberYellow5,
		numberYellow6,
		numberYellow7,
		numberYellow8,
		numberYellow9,
		numberYellowMinus,
		numberYellowNone,
		numberYellowPercent,
		numberYellowPlus,
		potentialIconNormal,
		potentialIconRare,
		potentialIconEpic,
		potentialIconUnique,
		potentialIconLegendary,
		yellowStar,
		blueStar,
		emptyStar,
		incline0,
		incline1,
		incline2,
		incline3,
		incline4,
		incline5,
		incline6,
		incline7,
		incline8,
		incline9,
		inclinePlus,
		incline0_10digit,
		incline1_10digit,
		incline2_10digit,
		incline3_10digit,
		incline4_10digit,
		incline5_10digit,
		incline6_10digit,
		incline7_10digit,
		incline8_10digit,
		incline9_10digit,
		inclinePlus_10digit,
		incline0_8digit,
		incline1_8digit,
		incline2_8digit,
		incline3_8digit,
		incline4_8digit,
		incline5_8digit,
		incline6_8digit,
		incline7_8digit,
		incline8_8digit,
		incline9_8digit,
		inclinePlus_8digit,
		decline0,
		decline1,
		decline2,
		decline3,
		decline4,
		decline5,
		decline6,
		decline7,
		decline8,
		decline9,
		declineMinus,
		decline0_10digit,
		decline1_10digit,
		decline2_10digit,
		decline3_10digit,
		decline4_10digit,
		decline5_10digit,
		decline6_10digit,
		decline7_10digit,
		decline8_10digit,
		decline9_10digit,
		declineMinus_10digit,
		decline0_8digit,
		decline1_8digit,
		decline2_8digit,
		decline3_8digit,
		decline4_8digit,
		decline5_8digit,
		decline6_8digit,
		decline7_8digit,
		decline8_8digit,
		decline9_8digit,
		declineMinus_8digit,
		summaryIconBdr,
		summaryIconIgpddr,
		summaryIconPdd
	};

	let {
		image,
		children,
		class: className,
		style,
		tag = 'div'
	}: {
		image: keyof typeof mappings;
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
		style="background-image: url({mappings[image]}); {style}"
	>
		{@render children()}
	</svelte:element>
{:else}
	<svelte:element
		this={tag}
		class={[image, className]}
		style="background-image: url({mappings[image]}); {style}"
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
