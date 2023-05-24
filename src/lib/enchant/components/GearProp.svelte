<script lang="ts">
	import { GearPropType, type Gear } from '@malib/gear';
	import { Button, Column, NumberInput, RadioTile, Row, TileGroup } from 'carbon-components-svelte';

	export let can = false;

	export let gear: Gear | undefined;

	$: can = gear !== undefined;

	$: canKarma = gear;
	$: canRemoveKarma = gear?.karma !== undefined;

	let selectedTrade: string;
	$: selectedTrade = gear ? getTradeIndex(gear) : '0';

	const expTypes = [
		[GearPropType.charismaEXP, '카리스마'],
		[GearPropType.insightEXP, '통찰력'],
		[GearPropType.willEXP, '의지'],
		[GearPropType.craftEXP, '손재주'],
		[GearPropType.senseEXP, '감성'],
		[GearPropType.charmEXP, '매력']
	] as const;

	function getTradeIndex(gear: Gear) {
		if (gear.getPropValue(GearPropType.tradeBlock)) {
			return '2';
		} else if (gear.getPropValue(GearPropType.equipTradeBlock)) {
			return '1';
		} else {
			return '0';
		}
	}

	function onTradeSelect(event: CustomEvent<string>) {
		if (!gear) return;

		switch (event.detail) {
			case '0':
				gear.props.set(GearPropType.tradeBlock, 0);
				gear.props.set(GearPropType.equipTradeBlock, 0);
				break;
			case '1':
				gear.props.set(GearPropType.tradeBlock, 0);
				gear.props.set(GearPropType.equipTradeBlock, 1);
				break;
			case '2':
				gear.props.set(GearPropType.tradeBlock, 1);
				break;
		}
	}

	function onKarmaChange(event: CustomEvent<null | number>) {
		if (!gear) return;

		if (event.detail === null) {
			return;
		} else {
			gear.karma = event.detail;
		}
	}

	function removeKarma() {
		if (!gear) return;

		gear.karma = undefined;
	}

	function onExpChange(type: GearPropType) {
		return (event: CustomEvent<null | number>) => {
			if (!gear) return;

			gear.props.set(type, event.detail ?? 0);
			gear = gear;
		};
	}
</script>

<div class="attribute">
	{#if can && gear}
		<div class="attribute__heading">
			<Row>
				<Column>
					<h4>교환 관련 속성</h4>
				</Column>
			</Row>
		</div>
		<div class="attribute__radio-buttons">
			<Row>
				<Column>
					<TileGroup bind:selected={selectedTrade} on:select={onTradeSelect}>
						<RadioTile light value="0">교환 가능</RadioTile>
						<RadioTile light value="1">장착 시 교환 불가</RadioTile>
						<RadioTile light value="2">교환 불가</RadioTile>
					</TileGroup>
				</Column>
			</Row>
		</div>
		<div class="attribute__heading">
			<Row>
				<Column>
					<h4>카르마의 가위</h4>
				</Column>
			</Row>
		</div>
		<div class="attribute__karma">
			<Row>
				<Column>
					<NumberInput
						label="가위 사용 가능 횟수"
						disabled={!canKarma}
						allowEmpty
						min={0}
						max={20}
						value={gear.karma}
						on:change={onKarmaChange}
					/>
				</Column>
			</Row>
		</div>
		<div class="attribute__karma-button">
			<Row>
				<Column>
					<Button kind="danger" disabled={!canRemoveKarma} on:click={removeKarma}>제거</Button>
				</Column>
			</Row>
		</div>
		<div class="attribute__heading">
			<Row>
				<Column>
					<h4>장착 시 성향</h4>
				</Column>
			</Row>
		</div>
		<div class="attribute__exp">
			<Row style="row-gap: var(--cds-spacing-05);">
				{#each expTypes as [type, name]}
					<Column>
						<NumberInput
							label={name}
							allowEmpty
							min={0}
							step={50}
							value={gear.getPropValue(type)}
							on:change={onExpChange(type)}
						/>
					</Column>
				{/each}
			</Row>
		</div>
	{/if}
</div>

<style>
	.attribute {
		margin-top: var(--cds-spacing-05);
	}

	.attribute__heading:not(:first-child) {
		margin-top: var(--cds-spacing-07);
	}

	.attribute__radio-buttons {
		margin-top: var(--cds-spacing-03);
	}

	.attribute__karma {
		margin-top: var(--cds-spacing-03);
	}

	.attribute__karma-button {
		margin-top: var(--cds-spacing-05);
	}

	.attribute__exp {
		margin-top: var(--cds-spacing-03);
	}
</style>
