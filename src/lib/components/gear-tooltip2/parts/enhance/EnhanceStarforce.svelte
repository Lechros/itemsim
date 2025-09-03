<script lang="ts">
	import { UIImage2 } from '$lib/components/ui-image';
	import { GearCapability } from '@malib/gear';
	import DetailText from '../text/DetailText.svelte';

	let {
		can,
		superior,
		star,
		maxStar
	}: {
		can: GearCapability;
		superior: boolean;
		star: number;
		maxStar: number;
	} = $props();

	const str = $derived(getStr(can, superior, star, maxStar));

	function getStr(can: GearCapability, superior: boolean, star: number, maxStar: number) {
		const label = superior ? '스타포스 (슈페리얼)' : '스타포스';
		const level = star > 0 ? `${star}성` : '없음';
		const add = can === GearCapability.Fixed ? '(추가 강화 불가)' : `(최대 ${maxStar}성)`;
		return `${label} : ${level} ${add}`;
	}
</script>

{#if can === GearCapability.Cannot}
	<div class="flex items-center">
		<UIImage2 image="starNormal" class="mr-[4px]" />
		<DetailText color="darkGray" value="스타포스 : 강화 불가" />
	</div>
{:else if star === 0}
	<div class="flex items-center">
		<UIImage2 image="starNormal" class="mr-[4px]" />
		<DetailText color="darkGray" value={str} />
	</div>
{:else}
	<div class="flex items-center">
		<UIImage2 image="starEnhanced" class="mr-[4px]" />
		<DetailText color="white" value={str} />
	</div>
{/if}
