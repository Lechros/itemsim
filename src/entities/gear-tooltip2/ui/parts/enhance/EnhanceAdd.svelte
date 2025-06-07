<script lang="ts">
	import { UIImage2 } from '$lib/shared/ui';
	import { AddOptionType, GearCapability, type AddOptionData } from '@malib/gear';
	import Text from '../Text.svelte';
	import NewText from '../NewText.svelte';

	let {
		can,
		addOptions
	}: {
		can: GearCapability;
		addOptions: AddOptionData[] | readonly AddOptionData[];
	} = $props();

	function getString(type: AddOptionType, value: number) {
		return format[type].replace('{value}', value.toString());
	}

	function getStr(can: GearCapability) {
		if (can === GearCapability.Fixed) {
			return '추가옵션 (추가 강화 불가)';
		} else {
			return '추가옵션';
		}
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
	<div class="flex items-center">
		<UIImage2 image="addOptionNormal" class="mr-[4px]" />
		<NewText color="darkGray" value="추가옵션 : 강화 불가" />
	</div>
{:else if addOptions.length === 0}
	<div class="flex items-center">
		<UIImage2 image="addOptionNormal" class="mr-[4px]" />
		<NewText color="darkGray" value="추가옵션 : 없음" />
	</div>
{:else}
	<div class="flex items-center">
		<UIImage2 image="addOptionEnhanced" class="mr-[4px]" />
		<NewText color="white" value={getStr(can)} />
	</div>
	<div class="grid grid-cols-[147px_1fr] pl-[5px]">
		{#each addOptions as option}
			<div class="flex items-center gap-[4px]">
				<UIImage2 image="bonus_{option.grade}" />
				<NewText value={getString(option.type, option.value)} />
			</div>
		{/each}
	</div>
{/if}
