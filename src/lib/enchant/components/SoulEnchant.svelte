<script lang="ts">
	import type { Gear } from '@malib/gear';
	import { resultOrFalse } from '../domains/util';
	import { canSoulEnchant, doSoulDisenchant, doSoulEnchant } from '../domains/soul';
	import { ItemIndex, createSoulFromId, soulJson } from '@malib/create-gear';
	import { Button, Column, ComboBox, Row } from 'carbon-components-svelte';
	import type { ComboBoxItem } from 'carbon-components-svelte/types/ComboBox/ComboBox.svelte';

	export let can = false;

	export let gear: Gear | undefined;

	$: can = resultOrFalse(canSoulEnchant, gear);

	let input: string;

	const index = new ItemIndex(soulJson);

	function enchant() {
		if (!gear) return;
		gear = doSoulEnchant(gear);
	}

	function disenchant() {
		if (!gear) return;
		gear = doSoulDisenchant(gear);
	}

	function shouldFilterItem(item: ComboBoxItem, value: string) {
		if (!value) return true;
		return item.text.toLowerCase().includes(value.toLowerCase());
	}
</script>

<div class="soul">
	{#if can && gear}
		<div class="soul__buttons">
			<Row>
				<Column>
					<Button on:click={enchant}>소울 인챈트</Button>
					<Button kind="danger" on:click={disenchant}>해제</Button>
				</Column>
			</Row>
		</div>
		<div class="soul__search">
			<Row>
				<Column>
					<ComboBox
						light
						titleText="소울 이름"
						items={Object.entries(soulJson).map((e) => ({
							id: Number(e[0]),
							text: e[1].name
						}))}
						{shouldFilterItem}
					/>
				</Column>
			</Row>
		</div>
	{/if}
</div>

<style>
	.soul {
		margin-top: var(--cds-spacing-05);
	}

	.soul__search {
		margin-top: var(--cds-spacing-05);
	}
</style>
