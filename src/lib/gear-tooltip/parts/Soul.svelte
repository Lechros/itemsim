<script lang="ts">
	import type { Soul } from '@malib/gear';
	import { getSoulOptionString } from '../strings';

	export let soul: Soul | undefined;
	export let charge: number;
    export let pad: number;
    export let mad: number;

    $: chargeColor = charge > 0 ? 'white' : 'gray';
</script>

{#if soul}
	<div class="text yellow">
		{soul.name} 적용
	</div>
{/if}
	<div class="text {chargeColor}">
		소울 충전량 {charge}/1000 (공:+{pad},마:+{mad})
	</div>
{#if soul}
	<div class="text white">
		{getSoulOptionString(soul.option)}
	</div>
    <div class="text orange3">소울 충전 시 '{soul.skill}' 사용가능</div>
{:else}
	<div class="text gray">소울 충전 시 '---' 사용가능</div>
{/if}

<style>
	.text {
		display: flex;
		line-height: 16px;
		font-size: 12px;
		font-family: 돋움;
	}

	.white {
		color: var(--gear-white);
	}
	.yellow {
		color: var(--gear-yellow);
	}
	.gray {
		color: var(--gear-gray);
	}
	.orange3 {
		color: var(--gear-orange3);
	}
</style>
