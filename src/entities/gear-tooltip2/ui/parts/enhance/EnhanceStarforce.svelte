<script lang="ts">
	import { GearCapability } from '@malib/gear';
	import Spacer from '../Spacer.svelte';
	import Text from '../Text.svelte';

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
</script>

{#if can === GearCapability.Cannot}
	<Text color="darkGray">스타포스 강화 : 강화 불가</Text>
{:else}
	<div class="flex">
		{#if superior}
			{#if star > 0}
				<Text color="starforce">
					스타포스 강화 (슈페리얼) : {star}성
				</Text>
			{:else}
				<Text color="darkGray">스타포스 강화 (슈페리얼) : 없음</Text>
			{/if}
		{:else if star > 0}
			<Text color="starforce">스타포스 강화 : {star}성</Text>
		{:else}
			<Text color="darkGray">스타포스 강화 : 없음</Text>
		{/if}
		<Spacer width={3} />
		{#if can === GearCapability.Fixed}
			<Text>(추가 강화 불가)</Text>
		{:else}
			<Text>(최대 {maxStar}성)</Text>
		{/if}
	</div>
{/if}
