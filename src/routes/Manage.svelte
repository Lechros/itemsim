<script lang="ts">
	import { stringifyGear } from '@malib/gear';
	import { Button, Column, Row } from 'carbon-components-svelte';
	import { Copy, Download } from 'carbon-icons-svelte';
	import lzs from 'lz-string';
	import { gear } from './gear-store';
	import { createEventDispatcher } from 'svelte';

	export let tooltipRef: HTMLDivElement;
	export let display: HTMLDivElement;

	let bindany: HTMLImageElement;

	const dispatch = createEventDispatcher();

	$: gearStr = stringifyGear($gear);
	$: gear64 = lzs.compressToBase64(gearStr);
	$: gearURI = lzs.compressToEncodedURIComponent(gearStr);
	$: filename = $gear.name;

	// function createImage() {
	// 	if (tooltipRef) {
	// 		toCanvas(tooltipRef).then((canvas) => {
	// 			display.textContent = '';
	// 			display.appendChild(canvas);
	// 		});
	// 	}
	// }
</script>

{#if $gear}
	<div class="manage">
		<Row>
			<Column>
				<h4>아이템 정보</h4>
			</Column>
		</Row>
		<Row>
			<Column>
				<Button icon={Copy} on:click={() => navigator.clipboard.writeText(gear64)}>복사</Button>
				<Button
					icon={Download}
					href="data:text/plain;charset=utf-8,{gearURI}"
					download="{filename}.sim"
				>
					다운로드
				</Button>
			</Column>
		</Row>
		<Row>
			<Column>
				<h4>아이템 이미지</h4>
			</Column>
		</Row>
		<Row>
			<Column>
				<Button
					disabled
					on:click={() => {
					}}>열기</Button
				>
				<p>준비 중입니다</p>
			</Column>
		</Row>
		<Row>
			<Column>
				<h4>아이템 삭제</h4>
			</Column>
		</Row>
		<Row>
			<Column>
				<Button
					kind="danger"
					on:click={() => {
						dispatch('delete')
					}}>삭제</Button
				>
			</Column>
		</Row>
	</div>
{/if}

<style>
	.manage {
		display: flex;
		flex-direction: column;
		margin-top: calc(var(--cds-spacing-05) * -1);
	}

	h4 {
		margin-top: var(--cds-spacing-07);
		margin-bottom: var(--cds-spacing-03);
	}
</style>
