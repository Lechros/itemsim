<script lang="ts">
	import { useFontRenderContext } from '$lib/components/gear-tooltip2/font-render/FontRenderContext';
	import { tokenizeColorString } from '$lib/components/gear-tooltip2/model/parser';
	import { getColorValue } from '$lib/components/gear-tooltip2/model/text';
	import InternalTextRenderer from './InternalTextRenderer.svelte';

	const {
		value,
		class: className,
		maxWidth
	}: {
		value: string;
		class?: string;
		maxWidth?: number;
	} = $props();

	const { itemDetailFontRender: fontRender } = useFontRenderContext();

	const tokens = $derived(
		tokenizeColorString(value, {
			c: 'emphasis',
			$r: 'red',
			$g: 'gray',
			$b: 'bonusStat',
			$u: 'scroll',
			$s: 'starforce'
		})
	);
	const items = $derived(
		tokens.flatMap(({ text, color }) =>
			[...text].map((char) => ({ char, color: getColorValue(color ?? 'white') }))
		)
	);
	const style = $derived(items[0].char.match(/[a-zA-Z]/) ? 'padding-left: 1px;' : '');
</script>

<div class={className} {style}>
	<InternalTextRenderer {items} {fontRender} lineHeight={16} {maxWidth} />
</div>
