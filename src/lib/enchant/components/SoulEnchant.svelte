<script lang="ts">
	import { getSoulOptionString } from '$lib/gear-tooltip/strings';
	import { soulRepository } from '$lib/malib-repository/soul';
	import StringMatch from '$lib/string-match/StringMatch.svelte';
	import { match } from '$lib/string-match/match';
	import { MagnificentSoulOptionType, type Gear } from '@malib/gear';
	import {
		Button,
		Column,
		ComboBox,
		NumberInput,
		Row,
		Select,
		SelectItem
	} from 'carbon-components-svelte';
	import type { ComboBoxItem } from 'carbon-components-svelte/types/ComboBox/ComboBox.svelte';
	import {
		canRemoveSoul,
		canSoul,
		canSoulDisenchant,
		canSoulEnchant,
		doRemoveSoul,
		doSetSoul,
		doSoulDisenchant,
		doSoulEnchant,
		getMagnificentTypes,
		getSoulEntries,
		getSoulInfo,
		isMagnificentSoul
	} from '../domains/soul';
	import { resultOrFalse } from '../domains/util';

	export let can = false;

	export let gear: Gear | undefined;

	$: can = resultOrFalse(canSoul, gear);

	const types = getMagnificentTypes();

	let soulComboBox: ComboBox;
	let value: string;

	let selectedId: number;
	let selectedType: MagnificentSoulOptionType = MagnificentSoulOptionType.PAD;

	let comboBoxFocus = false;
	$: {
		if (!value && comboBoxFocus === false && gear?.soulWeapon.soul) {
			const info = getSoulInfo(gear.soulWeapon.soul);
			if (info) {
				selectedId = info.id;
				selectedType = info.type;
			}
		}
	}

	$: isMagnificent = isMagnificentSoul(selectedId);

	$: canEnchant = resultOrFalse(canSoulEnchant, gear);
	$: canRemove = resultOrFalse(canRemoveSoul, gear);
	$: canDisenchant = resultOrFalse(canSoulDisenchant, gear);

	function enchant() {
		if (!gear) return;
		gear = doSoulEnchant(gear);
	}

	function removeSoul() {
		if (!gear) return;
		gear = doRemoveSoul(gear);
		soulComboBox.clear();
	}

	function disenchant() {
		if (!gear) return;
		gear = doSoulDisenchant(gear);
		soulComboBox.clear();
	}

	function onSelectChange() {
		if (!gear) return;
		gear = doSetSoul(gear, selectedId, selectedType);
	}

	function getSoulOptionText(soulId: number, type: MagnificentSoulOptionType) {
		const soul = soulRepository.createSoulFromId(soulId, type);
		if (soul) {
			return getSoulOptionString(soul.option);
		}
		return '';
	}

	function shouldFilterItem(item: ComboBoxItem, value: string) {
		if (!value) return true;
		return match(item.text, value);
	}
</script>

<div class="soul">
	{#if can && gear}
		<div class="soul__heading">
			<Row>
				<Column>
					<h4>소울</h4>
				</Column>
			</Row>
		</div>
		<div class="soul__search">
			<Row>
				<Column>
					<ComboBox
						light
						titleText="소울 이름"
						disabled={!gear.soulWeapon.enchanted}
						bind:value
						bind:selectedId
						on:select={onSelectChange}
						on:focus={() => (comboBoxFocus = true)}
						on:blur={() => (comboBoxFocus = false)}
						items={getSoulEntries().map((e) => ({
							id: Number(e[0]),
							text: e[1].name
						}))}
						{shouldFilterItem}
						bind:this={soulComboBox}
						let:item
					>
						<StringMatch str={item.text} search={value} />
					</ComboBox>
				</Column>
			</Row>
		</div>
		<div class="soul__option">
			<Row>
				<Column>
					<Select
						labelText="위대한 소울 옵션"
						disabled={!isMagnificent}
						bind:selected={selectedType}
						on:change={onSelectChange}
					>
						{#if isMagnificent}
							{#each types as type}
								<SelectItem value={type} text={getSoulOptionText(selectedId, type)} />
							{/each}
						{:else}
							<SelectItem value={selectedType} text="---" />
						{/if}
					</Select>
				</Column>
			</Row>
		</div>
		<div class="soul__heading">
			<Row>
				<Column>
					<h4>소울 충전량</h4>
				</Column>
			</Row>
		</div>
		<div class="soul__charge">
			<Row>
				<Column>
					<NumberInput
						label="소울 충전량"
						max={1000}
						min={0}
						step={100}
						bind:value={gear.soulWeapon.charge}
					/>
				</Column>
			</Row>
		</div>
		<div class="soul__heading">
			<Row>
				<Column>
					<h4>관리</h4>
				</Column>
			</Row>
		</div>
		<div class="soul__buttons">
			<Row>
				<Column>
					<Button disabled={!canEnchant} on:click={enchant}>소울 인챈트</Button>
					<Button kind="tertiary" disabled={!canRemove} on:click={removeSoul}>소울 해제</Button>
					<Button kind="danger" disabled={!canDisenchant} on:click={disenchant}>초기화</Button>
				</Column>
			</Row>
		</div>
	{:else}
		<div class="soul__cannot">소울 인챈트 불가</div>
	{/if}
</div>

<style>
	.soul {
		margin-top: var(--cds-spacing-05);
	}

	.soul__heading:not(:first-child) {
		margin-top: var(--cds-spacing-07);
	}

	.soul__buttons {
		margin-top: var(--cds-spacing-03);
	}

	.soul__search {
		margin-top: var(--cds-spacing-03);
	}

	.soul__option {
		margin-top: var(--cds-spacing-05);
	}

	.soul__charge {
		margin-top: var(--cds-spacing-03);
	}
</style>
