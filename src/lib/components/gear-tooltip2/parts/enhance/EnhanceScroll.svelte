<script lang="ts">
	import { UIImage2 } from '$lib/shared/ui';
	import { GearCapability } from '@malib/gear';
	import DetailText from '../text/DetailText.svelte';

	let {
		can,
		upgrade,
		upgradeable,
		resile
	}: {
		can: GearCapability;
		upgrade: number;
		upgradeable: number;
		resile: number;
	} = $props();

	const str = $derived(getStr(can, upgrade, upgradeable, resile));

	function getStr(can: GearCapability, upgrade: number, upgradeable: number, resile: number) {
		const base = upgrade > 0 ? `주문서 : ${upgrade}회` : '주문서 : 없음';
		const add =
			can === GearCapability.Fixed
				? '(추가 강화 불가)'
				: `(잔여 ${upgradeable}회, 복구 가능 ${resile}회)`;
		return `${base} ${add}`;
	}
</script>

{#if can === GearCapability.Cannot}
	<div class="flex items-center">
		<UIImage2 image="scrollNormal" class="mr-[4px]" />
		<DetailText color="darkGray" value="주문서 : 강화 불가" />
	</div>
{:else if upgrade === 0}
	<div class="flex items-center">
		<UIImage2 image="scrollNormal" class="mr-[4px]" />
		<DetailText color="darkGray" value={str} />
	</div>
{:else}
	<div class="flex items-center">
		<UIImage2 image="scrollEnhanced" class="mr-[4px]" />
		<DetailText color="white" value={str} />
	</div>
{/if}
