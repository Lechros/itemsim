<script lang="ts">
	import { GearTooltipRenderer } from '$lib/features/gear-tooltip-renderer';
	import type { ReadonlyGear } from '@malib/gear';
	import { devicePixelRatio } from 'svelte/reactivity/window';
	import { strategies } from './captureStrategies';
	import './captureStyles.css';

	type Tooltip1Options = {
		cannot?: { level?: boolean; job?: boolean; gender?: boolean };
		incline: { combat: number } | { attack: number } | { attack: number; combat: number };
	};
	type Tooltip2Options = {
		cannot?: { level?: boolean; job?: boolean; gender?: boolean };
		incline: { equipped: true } | { combat: number };
		expand?: boolean;
	};

	let {
		gear,
		tooltipVersion,
		tooltip1Options,
		tooltip2Options,
		dataUrl = $bindable(null as string | null),
		maybeInvalidImage = $bindable(false)
	}: {
		gear: ReadonlyGear;
		tooltipVersion: '1' | '2';
		tooltip1Options: Tooltip1Options;
		tooltip2Options: Tooltip2Options;
		dataUrl?: string | null;
		maybeInvalidImage?: boolean;
	} = $props();

	const widthPx = $derived(tooltipVersion === '1' ? 261 : 324);

	let rootEl: HTMLDivElement | undefined = $state();
	let didCapture = $state(false);

	function runCapture() {
		if (!rootEl) return;
		const captureFn = strategies[tooltipVersion];
		const expectedWidth = widthPx;
		captureFn(rootEl).then((url) => {
			dataUrl = url;
			const img = document.createElement('img');
			img.src = url;
			img.onload = () => {
				maybeInvalidImage =
					img.width !== expectedWidth || devicePixelRatio.current !== 1;
				img.remove();
			};
		});
	}

	$effect(() => {
		if (!rootEl || didCapture) return;
		didCapture = true;
		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				runCapture();
			});
		});
	});

	/**
	 * 루트 요소를 PNG로 변환한 data URL을 반환합니다.
	 * tooltipVersion에 따라 V1(두 패스) / V2(단일 패스) 전략을 사용합니다.
	 */
	export function capture(): Promise<string> {
		if (!rootEl) {
			return Promise.reject(new Error('GearTooltipImageRenderer: root element not ready'));
		}
		return strategies[tooltipVersion](rootEl);
	}
</script>

<div
	bind:this={rootEl}
	class="gt-image-renderer inline-block"
	style="width: {widthPx}px; image-rendering: pixelated;"
	aria-hidden="true"
>
	<GearTooltipRenderer
		{gear}
		{tooltipVersion}
		{tooltip1Options}
		{tooltip2Options}
	/>
</div>
