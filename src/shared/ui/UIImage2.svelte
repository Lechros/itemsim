<script lang="ts">
	import { tooltip2Images } from '$lib/shared/assets';
	import type { Snippet } from 'svelte';
	import type { ClassValue } from 'svelte/elements';

	let {
		image,
		children,
		class: className,
		style,
		tag = 'div'
	}: {
		image: keyof typeof tooltip2Images;
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
		style="background-image: url({tooltip2Images[image]}); {style}"
	>
		{@render children()}
	</svelte:element>
{:else}
	<svelte:element
		this={tag}
		class={[image, className]}
		style="background-image: url({tooltip2Images[image]}); {style}"
	/>
{/if}

<style>
	div {
		background-image: var(--url);
		background-repeat: no-repeat;
	}
	.frameTop {
		width: 324px;
		height: 30px;
	}
	.frameMid {
		width: 324px;
		height: 1px;
		background-repeat: repeat-y;
	}
	.frameLine {
		width: 324px;
		height: 3px;
	}
	.frameBottom {
		width: 324px;
		height: 12px;
	}

	.star {
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

	.particleStar {
		width: 325px;
		height: 50px;
		background-repeat: no-repeat;
		animation: particleStar 720ms steps(6) infinite;
	}

	.iconBase {
		width: 82px;
		height: 82px;
	}

	.iconShade {
		width: 82px;
		height: 82px;
	}

	.inclineEquipped {
		width: 159px;
		height: 21px;
	}
	.inclineMinus_0 {
		width: 14px;
		height: 21px;
	}
	.inclineMinus_1 {
		width: 10px;
		height: 21px;
	}
	.inclineMinus_2 {
		width: 13px;
		height: 21px;
	}
	.inclineMinus_3 {
		width: 13px;
		height: 21px;
	}
	.inclineMinus_4 {
		width: 15px;
		height: 21px;
	}
	.inclineMinus_5 {
		width: 13px;
		height: 21px;
	}
	.inclineMinus_6 {
		width: 13px;
		height: 21px;
	}
	.inclineMinus_7 {
		width: 14px;
		height: 21px;
	}
	.inclineMinus_8 {
		width: 14px;
		height: 21px;
	}
	.inclineMinus_9 {
		width: 13px;
		height: 21px;
	}
	.inclineMinus_a {
		width: 18px;
		height: 21px;
	}
	.inclineMinus_b {
		width: 17px;
		height: 21px;
	}
	.inclineMinus_sign {
		width: 12px;
		height: 21px;
	}
	.inclinePlus_0 {
		width: 14px;
		height: 21px;
	}
	.inclinePlus_1 {
		width: 10px;
		height: 21px;
	}
	.inclinePlus_2 {
		width: 13px;
		height: 21px;
	}
	.inclinePlus_3 {
		width: 13px;
		height: 21px;
	}
	.inclinePlus_4 {
		width: 15px;
		height: 21px;
	}
	.inclinePlus_5 {
		width: 13px;
		height: 21px;
	}
	.inclinePlus_6 {
		width: 13px;
		height: 21px;
	}
	.inclinePlus_7 {
		width: 14px;
		height: 21px;
	}
	.inclinePlus_8 {
		width: 14px;
		height: 21px;
	}
	.inclinePlus_9 {
		width: 13px;
		height: 21px;
	}
	.inclinePlus_a {
		width: 18px;
		height: 21px;
	}
	.inclinePlus_b {
		width: 17px;
		height: 21px;
	}
	.inclinePlus_sign {
		width: 12px;
		height: 21px;
	}

	.categoryLeft {
		width: 8px;
		height: 14px;
	}
	.categoryMiddle {
		width: 1px;
		height: 14px;
		background-repeat: repeat-x;
	}
	.categoryRight {
		width: 8px;
		height: 14px;
	}

	.setGuide {
		width: 59px;
		height: 12px;
	}

	.bonus_0 {
		width: 10px;
		height: 10px;
	}
	.bonus_1 {
		width: 10px;
		height: 10px;
	}
	.bonus_2 {
		width: 10px;
		height: 10px;
	}
	.bonus_3 {
		width: 10px;
		height: 10px;
	}
	.bonus_4 {
		width: 10px;
		height: 10px;
	}
	.bonus_5 {
		width: 10px;
		height: 10px;
	}
	.bonus_6 {
		width: 10px;
		height: 10px;
	}
	.bonus_7 {
		width: 10px;
		height: 10px;
	}
	.bonus_8 {
		width: 10px;
		height: 10px;
	}
	.bonus_9 {
		width: 10px;
		height: 10px;
	}

	.potentialTitleNormal {
		width: 10px;
		height: 10px;
	}
	.potentialTitleRare {
		width: 10px;
		height: 10px;
	}
	.potentialTitleEpic {
		width: 10px;
		height: 10px;
	}
	.potentialTitleUnique {
		width: 10px;
		height: 10px;
	}
	.potentialTitleLegendary {
		width: 10px;
		height: 10px;
	}
	.potentialDetailRare {
		width: 10px;
		height: 10px;
	}
	.potentialDetailEpic {
		width: 10px;
		height: 10px;
	}
	.potentialDetailUnique {
		width: 10px;
		height: 10px;
	}
	.potentialDetailLegendary {
		width: 10px;
		height: 10px;
	}

	@keyframes particleStar {
		from {
			background-position: 0 0;
		}
		to {
			background-position: -1950px 0;
		}
	}
</style>
