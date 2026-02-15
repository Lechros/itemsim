<script lang="ts">
	import { GearGender } from '@malib/gear';

	let {
		name,
		gender,
		scrollUpgradeCount,
		color
	}: {
		name: string;
		gender: GearGender | undefined;
		scrollUpgradeCount: number;
		color: string;
	} = $props();

	function getNameText(name: string, gender: GearGender | undefined, scrollUpgradeCount: number) {
		let text = name;
		if (gender === GearGender.Male) {
			text += ' (남)';
		} else if (gender === GearGender.Female) {
			text += ' (여)';
		}
		if (scrollUpgradeCount > 0) {
			text += ` (+${scrollUpgradeCount})`;
		}
		return text;
	}
</script>

<div class="gt--title gt--{color}">
	{getNameText(name, gender, scrollUpgradeCount)}
</div>
