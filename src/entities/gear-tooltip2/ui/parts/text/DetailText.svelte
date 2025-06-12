<script lang="ts">
	import { useFontRenderContext } from '$lib/entities/gear-tooltip2/lib/FontRenderContext';
	import { getColorValue, type NamedColor } from '$lib/entities/gear-tooltip2/model/text';
	import InternalTextRenderer from './InternalTextRenderer.svelte';

	const {
		value,
		color = 'white',
		class: className,
		maxWidth
	}: {
		value?: string;
		color?: NamedColor;
		class?: string;
		maxWidth?: number;
	} = $props();

	const { itemDetailFontRender: fontRender } = useFontRenderContext();

	const colorValue = $derived(getColorValue(color));
	const items = $derived(value ? [...value].map((char) => ({ char, color: colorValue })) : []);
</script>

<div class={className}>
	<InternalTextRenderer {items} {fontRender} lineHeight={16} {maxWidth} />
</div>
