<script lang="ts">
	import { stringifyGear } from '@malib/gear';
	import { Button, Column, Row } from 'carbon-components-svelte';
	import { Download } from 'carbon-icons-svelte';
	import lzs from 'lz-string';
	import { gear } from './gear-store';

	$: gearStr = stringifyGear($gear);
	$: gearURI = lzs.compressToEncodedURIComponent(gearStr);
	$: filename = $gear.name;
</script>

{#if $gear}
<Row style="margin-top: var(--cds-spacing-05);">
	<Column>
		<Button icon={Download} href="data:text/plain;charset=utf-8,{gearURI}" download="{filename}.txt">
			다운로드
		</Button>
	</Column>
</Row>
{/if}

<style>
</style>
