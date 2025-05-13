<script lang="ts">
	import { UIImage2 } from '$lib/shared/ui';
	import { AddOptionType, GearCapability, type AddOptionData } from '@malib/gear';
	import Spacer from '../Spacer.svelte';
	import Text from '../Text.svelte';

	let {
		can,
		addOptions
	}: {
		can: GearCapability;
		addOptions: AddOptionData[] | readonly AddOptionData[];
	} = $props();

	const totalGrade = addOptions
		.map((option) => option.grade)
		.reduce((acc, grade) => acc + grade, 0);

	function getString(type: AddOptionType, value: number) {
		return format[type].replace('{value}', value.toString());
	}

	const format: Record<AddOptionType, string> = {
		[AddOptionType.str]: 'STR  +{value}',
		[AddOptionType.dex]: 'DEX  +{value}',
		[AddOptionType.int]: 'INT  +{value}',
		[AddOptionType.luk]: 'LUK  +{value}',
		[AddOptionType.str_dex]: 'STR, DEX  +{value}',
		[AddOptionType.str_int]: 'STR, INT  +{value}',
		[AddOptionType.str_luk]: 'STR, LUK  +{value}',
		[AddOptionType.dex_int]: 'DEX, INT  +{value}',
		[AddOptionType.dex_luk]: 'DEX, LUK  +{value}',
		[AddOptionType.int_luk]: 'INT, LUK  +{value}',
		[AddOptionType.maxHp]: '최대 HP  +{value}',
		[AddOptionType.maxMp]: '최대 MP  +{value}',
		[AddOptionType.attackPower]: '공격력  +{value}',
		[AddOptionType.magicPower]: '마력  +{value}',
		[AddOptionType.armor]: '방어력  +{value}',
		[AddOptionType.speed]: '이동속도  +{value}',
		[AddOptionType.jump]: '점프력  +{value}',
		[AddOptionType.bossDamage]: '보스 몬스터 데미지  +{value}%',
		[AddOptionType.damage]: '데미지  +{value}%',
		[AddOptionType.allStat]: '올스탯  +{value}%',
		[AddOptionType.reqLevelDecrease]: '착용 레벨 감소  -{value}'
	};
</script>

{#if can === GearCapability.Cannot}
	<Text color="darkGray">추가 옵션 : 강화 불가</Text>
{:else}
	<div class="flex">
		{#if addOptions.length > 0}
			<Text color="bonusStat">추가 옵션 : 총합 {totalGrade}단계</Text>
		{:else}
			<Text color="darkGray">추가 옵션 : 없음</Text>
		{/if}
		<Spacer width={3} />
		{#if can === GearCapability.Fixed}
			<Text>(추가 강화)</Text>
		{/if}
	</div>
	<div class="grid grid-cols-[150px_1fr]">
		{#each addOptions as option}
			<div class="flex items-center gap-[4px]">
				<UIImage2 image={`bonus_${option.grade}`} />
				<Text>{getString(option.type, option.value)}</Text>
			</div>
		{/each}
	</div>
{/if}
