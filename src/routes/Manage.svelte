<script lang="ts">
	import { Button, Column, Row } from 'carbon-components-svelte';
	import { Copy, Download } from 'carbon-icons-svelte';
	import { compressToBase64, compressToEncodedURIComponent } from 'lz-string';
	import { createEventDispatcher } from 'svelte';
	import { gear, meta } from './gear-store';
	import { stringifyGearMeta } from './export';

	const dispatch = createEventDispatcher();

	$: gearStr = $gear && $meta ? stringifyGearMeta($gear, $meta) : '';
	$: gear64 = compressToBase64(gearStr);
	$: gearURI = compressToEncodedURIComponent(gearStr);
	$: filename = $gear?.name ?? 'item';
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
				<Button disabled on:click={() => {}}>열기</Button>
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
						dispatch('delete');
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
