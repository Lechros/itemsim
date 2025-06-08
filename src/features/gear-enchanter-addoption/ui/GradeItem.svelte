<script lang="ts">
	import { AddOptionType, getAddOptionValue, ReadonlyGear, type AddOptionGrade } from '@malib/gear';

	let {
		gear,
		type,
		grade
	}: {
		gear: ReadonlyGear;
		type: AddOptionType;
		grade: AddOptionGrade;
	} = $props();

	function getValueString(type: AddOptionType, value: number) {
		switch (type) {
			case AddOptionType.damage:
			case AddOptionType.bossDamage:
			case AddOptionType.allStat:
				return `+${value}%`;
			case AddOptionType.reqLevelDecrease:
				return `-${value}`;
			default:
				return `+${value}`;
		}
	}
</script>

<div>
	{getValueString(type, getAddOptionValue(gear, type, grade))} ({grade}단계)
</div>
