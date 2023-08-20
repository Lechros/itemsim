<script lang="ts">
	import GearTooltipCanvas from '$lib/gear-tooltip/img/GearTooltipCanvas.svelte';
	import { Loading, Modal } from 'carbon-components-svelte';

	export let open = false;
	export let tooltipDiv: HTMLDivElement;

	let rendered: boolean;
	let tooltipImg: GearTooltipCanvas;

	$: height = tooltipDiv?.getBoundingClientRect().height ?? 500;
	$: if (open) {
		tooltipImg.build();
	}
</script>

<Modal bind:open size="sm" passiveModal modalHeading="아이템 이미지">
	<div class="center">
		<div class:hidden={rendered} class="placeholder" style={`height: ${height}px`}>
			<Loading small withOverlay={false} />
		</div>
		<div class:hidden={!rendered}>
			<GearTooltipCanvas tooltip={tooltipDiv} bind:rendered bind:this={tooltipImg} />
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
