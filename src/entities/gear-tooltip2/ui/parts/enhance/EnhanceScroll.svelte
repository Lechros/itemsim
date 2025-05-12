<script lang="ts">
	import { GearCapability } from '@malib/gear';
	import Spacer from '../Spacer.svelte';
	import Text from '../Text.svelte';

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
</script>

{#if can === GearCapability.Cannot}
	<Text color="darkGray">주문서 강화 : 강화 불가</Text>
{:else}
	<div class="flex">
		{#if upgrade > 0}
			<Text color="scroll">주문서 강화 : {upgrade}회</Text>
		{:else}
			<Text color="darkGray">주문서 강화 : 없음</Text>
		{/if}
		<Spacer width={4} />
		{#if can === GearCapability.Fixed}
			<Text>(추가 강화 불가)</Text>
		{:else}
			<Text>(잔여 {upgradeable}회, 복구 가능 {resile}회)</Text>
		{/if}
	</div>
{/if}
