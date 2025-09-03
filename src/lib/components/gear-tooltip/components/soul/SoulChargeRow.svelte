<script lang="ts">
	import type { SoulChargeOption } from '@malib/gear';

	let {
		charge,
		chargeOption: option
	}: {
		charge: number;
		chargeOption: SoulChargeOption;
	} = $props();

	const chargeColor = $derived(charge > 0 ? 'white' : 'gray');
</script>

<div class="gt--soul gt--{chargeColor}">
	소울 충전량 {charge}/1000 (공:+{option.attackPower},마:+{option.magicPower})
</div>
