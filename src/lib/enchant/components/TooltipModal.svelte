<script lang="ts">
	import GearTooltipCanvas from '$lib/gear-tooltip/img/GearTooltipCanvas.svelte';
	import { gear } from '$lib/inventory/stores/gear-store';
	import { Loading, Modal } from 'carbon-components-svelte';
	import { Download } from 'carbon-icons-svelte';
	import { getPngName } from '../domains/image';

	export let open = false;
	export let tooltipDiv: HTMLDivElement;

	let rendered: boolean;
	let tooltipImg: GearTooltipCanvas;
	let tooltipCanvas: HTMLCanvasElement;

	const downloadLink = typeof document !== 'undefined' ? document.createElement('a') : undefined;
	$: downloadLink?.setAttribute('download', $gear ? getPngName($gear) : 'item.png');

	$: height = tooltipDiv?.getBoundingClientRect().height ?? 500;
	$: if (open) {
		tooltipImg.build();
	}

	function downloadCanvas() {
		if (!tooltipCanvas) return;
		if (!downloadLink) return;
		const url = tooltipCanvas.toDataURL('image/png');
		downloadLink.setAttribute('href', url);
		downloadLink.click();
	}
</script>

<Modal
	bind:open
	size="sm"
	modalHeading="아이템 이미지"
	primaryButtonText="다운로드"
	primaryButtonIcon={Download}
	primaryButtonDisabled={!rendered}
	on:click:button--primary={downloadCanvas}
>
	<div class="center">
		<div class:hidden={rendered} class="placeholder" style={`height: ${height}px`}>
			<Loading small withOverlay={false} />
		</div>
		<div class:hidden={!rendered}>
			<GearTooltipCanvas
				tooltip={tooltipDiv}
				bind:rendered
				bind:this={tooltipImg}
				bind:canvas={tooltipCanvas}
			/>
		</div>
	</div>
</Modal>

<style>
	.center {
		width: 100%;
		display: flex;
		justify-content: center;
	}

	.placeholder {
		width: 261px;
		display: flex;
		align-items: center;
		justify-content: center;
		justify-items: center;
		background-color: var(--cds-hover-light-ui);
		border-radius: 8px;
	}

	.hidden {
		display: none;
	}
</style>
