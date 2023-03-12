<script lang="ts">
	import { GearPropType, type Gear } from "@malib/gear";

    export let gear: Gear;
</script>

{#if gear.getBooleanValue(GearPropType.superiorEqp)}
	<div class="text">슈페리얼</div>
{/if}

<style>
    .text {
		height: 15px;
		font-size: 11px;
		font-family: 돋움;
		color: var(--gear-green);
        text-align: center;
    }
</style>