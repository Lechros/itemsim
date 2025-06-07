<script lang="ts">
	import { GearCapability } from '@malib/gear';
	import Text from '../Text.svelte';

	const {
		canStarforce,
		canScroll,
		canAddOption
	}: {
		canStarforce: GearCapability;
		canScroll: GearCapability;
		canAddOption: GearCapability;
	} = $props();

	const cannots = $derived(getCannots(canStarforce, canScroll, canAddOption));

	function getCannots(
		canStarforce: GearCapability,
		canScroll: GearCapability,
		canAddOption: GearCapability
	) {
		const result: string[] = [];
		if (canStarforce !== GearCapability.Can) {
			result.push('스타포스');
		}
		if (canScroll !== GearCapability.Can) {
			result.push('주문서');
		}
		if (canAddOption !== GearCapability.Can) {
			result.push('추가옵션');
		}
		return result;
	}
</script>

{#if cannots.length > 0}
	<Text>{cannots.join(', ')} 강화 불가</Text>
{/if}
