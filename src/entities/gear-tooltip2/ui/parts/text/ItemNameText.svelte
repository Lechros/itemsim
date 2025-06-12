<script lang="ts">
	import { getColorValue, type NamedColor } from '$lib/entities/gear-tooltip2/model/text';

	const {
		value,
		color = 'white',
		class: className
	}: {
		value: string;
		color?: NamedColor;
		class?: string;
	} = $props();

	const colorValue = $derived(getColorValue(color));
</script>

<div class={['itemName', className]} style="color: {colorValue}">{value}</div>

<style>
	.itemName {
		font-family: 'Dotum', '돋움';
		font-size: 14px;
		line-height: 19px;
		font-weight: bold;
		white-space: pre-wrap;
	}
</style>
