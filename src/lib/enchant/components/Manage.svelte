<script lang="ts">
	import type { GearMeta } from '$lib/inventory/stores/gear-store';
	import type { Gear } from '@malib/gear';
	import { Button, Column, Row } from 'carbon-components-svelte';
	import { Copy, Download } from 'carbon-icons-svelte';
	import { createEventDispatcher } from 'svelte';
	import {
		getFilename,
		getGearBase64String,
		getGearString,
		getGearURIComponent
	} from '../domains/manage';

	export let gear: Gear | undefined;
	export let meta: GearMeta | undefined;

	const dispatch = createEventDispatcher();

	$: gearString = gear && meta ? getGearString(gear, meta) : '';
	$: gearURIComponent = getGearURIComponent(gearString);
	$: filename = gear ? getFilename(gear) : 'item.sim';

	function copyGearToClipboard() {
		navigator.clipboard.writeText(getGearBase64String(gearString));
	}

	function getGearURIHref() {
		return `data:text/plain;charset=utf-8,${gearURIComponent}`;
	}

	function dispatchDeleteEvent() {
		dispatch('delete');
	}
</script>

<div class="manage">
	{#if gear}
		<div class="manage__heading">
			<Row>
				<Column>
					<h4>아이템 정보</h4>
				</Column>
			</Row>
		</div>
		<div class="manage__buttons">
			<Row>
				<Column>
					<Button icon={Copy} on:click={copyGearToClipboard}>복사</Button>
					<Button icon={Download} href={getGearURIHref()} download={filename}>다운로드</Button>
				</Column>
			</Row>
		</div>
		<div class="manage__heading">
			<Row>
				<Column>
					<h4>아이템 이미지</h4>
				</Column>
			</Row>
		</div>
		<div class="manage__buttons">
			<Row>
				<Column>
					<Button disabled on:click={() => {}}>열기</Button>
					<p>준비 중입니다</p>
				</Column>
			</Row>
		</div>
		<div class="manage__heading">
			<Row>
				<Column>
					<h4>아이템 삭제</h4>
				</Column>
			</Row>
		</div>
		<div class="manage__buttons">
			<Row>
				<Column>
					<Button kind="danger" on:click={dispatchDeleteEvent}>삭제</Button>
				</Column>
			</Row>
		</div>
	{/if}
</div>

<style>
	.manage {
		margin-top: var(--cds-spacing-05);
	}

	.manage__heading:not(:first-child) {
		margin-top: var(--cds-spacing-07);
	}

	.manage__buttons {
		margin-top: var(--cds-spacing-03);
	}
</style>
