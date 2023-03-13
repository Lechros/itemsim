<script lang="ts">
	import { GearPropType } from '@malib/gear';
	import { getGearPropString } from '../strings';
</script>

<div class="text">{getGearPropString(GearPropType.superiorEqp, 1)}</div>

<style>
	.text {
		line-height: 15px;
		font-size: 11px;
		font-family: 돋움;
		color: var(--gear-green);
	}
</style>
