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
	<div class="gt--text gt--text--soul gt--text--yellow">
		{soul.name} 적용
	</div>
{/if}
<div class="gt--text gt--text--soul gt--text--{chargeColor}">
	소울 충전량 {charge}/1000 (공:+{pad},마:+{mad})
</div>
{#if soul}
	<div class="gt--text gt--text--soul">
		{getSoulOptionString(soul.option)}
	</div>
	<div class="gt--text gt--text--soul gt--text--orange3">소울 충전 시 '{soul.skill}' 사용가능</div>
{:else}
	<div class="gt--text gt--text--soul gt--text--gray">소울 충전 시 '---' 사용가능</div>
{/if}
