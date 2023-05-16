<script lang="ts">
	import type { GearOption, GearPropType } from '@malib/gear';
	import { parseColorString } from '../graphics';
	import { getGearOptionString } from '../strings';

	export let type: GearPropType;
	export let option: GearOption;
	export let amazing: boolean;
</script>

<div class="gt--text">
	{@html parseColorString(getGearOptionString(type, option, amazing))}
</div>
