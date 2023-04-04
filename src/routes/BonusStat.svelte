<script lang="ts">
	import {
		addBonusStat,
		BonusStatType,
		Gear,
		GearPropType,
		GearType,
		getBonusStatValue,
		resetBonusStat,
		type BonusStatGrade
	} from '@malib/gear';
	import { Button, Column, Row, Select, SelectItem } from 'carbon-components-svelte';
	import { gear, meta } from './gear-store';
	import { getName } from './strings';

	$: bossReward = $gear.getBooleanValue(GearPropType.bossReward);
	$: types = getTypes($gear);

	function onChange() {
		resetBonusStat($gear);
		for (const bonus of $meta.bonus) {
			if (bonus.grade > 0) {
				addBonusStat($gear, bonus.type, bonus.grade as BonusStatGrade);
			}
		}
		gear.set($gear);
	}

	function reset() {
		$meta.bonus = [
			{ type: -1, grade: 0 },
			{ type: -1, grade: 0 },
			{ type: -1, grade: 0 },
			{ type: -1, grade: 0 }
		];
		resetBonusStat($gear);
		gear.set($gear);
	}

	function canBonus() {
		if (Gear.isArmor($gear.type)) {
			if (Gear.isShield($gear.type)) {
				return false;
			}
			return true;
		}
		if (Gear.isAccessory($gear.type)) {
			if ($gear.type === GearType.ring) {
				return false;
			}
			if ($gear.type === GearType.shoulder) {
				if ($gear.itemID === 1152155) return true;
				return false;
			}
			return true;
		}
		if (Gear.isWeapon($gear.type)) {
			return true;
		}
		return false;
	}

	function getTypes(gear: Gear) {
		let types = [
			BonusStatType.STR,
			BonusStatType.DEX,
			BonusStatType.INT,
			BonusStatType.LUK,
			BonusStatType.STR_DEX,
			BonusStatType.STR_INT,
			BonusStatType.STR_LUK,
			BonusStatType.DEX_INT,
			BonusStatType.DEX_LUK,
			BonusStatType.INT_LUK,
			BonusStatType.MHP,
			BonusStatType.MMP
		];
		if (Gear.isWeapon(gear.type)) {
			types.push(BonusStatType.PAD, BonusStatType.MAD);
		} else {
			if (gear.req.level >= 60) {
				types.push(BonusStatType.PAD, BonusStatType.MAD);
			}
		}
		types.push(BonusStatType.PDD);
		if (Gear.isWeapon(gear.type)) {
			types.push(BonusStatType.damR);
			if (gear.req.level >= 90) types.push(BonusStatType.bdR);
		} else {
			types.push(BonusStatType.speed, BonusStatType.jump);
		}
		if (gear.req.level >= 70) {
			types.push(BonusStatType.allStatR);
		}

		types.push(BonusStatType.reduceReq);
		return types;
	}

	function getGrades(bossReward: boolean) {
		if (bossReward) {
			return [3, 4, 5, 6, 7] as const;
		} else {
			return [1, 2, 3, 4, 5, 6, 7] as const;
		}
	}

	function getGradeRepr(type: BonusStatType, grade: BonusStatGrade) {
		const plus = type === BonusStatType.reduceReq ? '-' : '+';
		let percent = '';
		switch (type) {
			case BonusStatType.damR:
			case BonusStatType.bdR:
			case BonusStatType.allStatR:
				percent = '%';
				break;
		}
		return `${plus}${getBonusStatValue($gear, type, grade)}${percent} (${grade}등급)`;
	}
</script>

{#if $gear && canBonus()}
	<Row>
		<Column>
			<Button kind="danger" class="reset" on:click={reset}>초기화</Button>
		</Column>
	</Row>
	<div class="bonus">
		{#each $meta.bonus as bonus}
			<Row>
				<Column noGutterRight>
					<Select
						bind:selected={bonus.type}
						on:change={() => {
							bonus.grade = 0;
							onChange();
						}}
					>
						<SelectItem value={-1} text="---" />
						{#each types as type}
							<SelectItem value={type} text={getName(type)} />
						{/each}
					</Select>
				</Column>
				<Column>
					<Select bind:selected={bonus.grade} on:change={onChange} disabled={bonus.type === -1}>
						<SelectItem value={0} text="---" />
						{#each getGrades(bossReward) as grade}
							<SelectItem value={grade} text={getGradeRepr(bonus.type, grade)} />
						{/each}
					</Select>
				</Column>
			</Row>
		{/each}
	</div>
{:else}
	추가옵션 설정 불가
{/if}
