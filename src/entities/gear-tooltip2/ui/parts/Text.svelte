<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ClassValue } from 'svelte/elements';

	let {
		children,
		variant = 'default',
		color = 'white',
		class: className,
		style,
		tag = 'div'
	}: {
		children: Snippet;
		variant?: 'default' | 'itemName' | 'normal';
		color?:
			| 'white'
			| 'gray'
			| 'darkGray'
			| 'red'
			| 'emphasis'
			| 'starforce'
			| 'scroll'
			| 'bonusStat'
			| 'potentialNormal'
			| 'potentialRare'
			| 'potentialEpic'
			| 'potentialUnique'
			| 'potentialLegendary'
			| 'exceptional';
		class?: ClassValue;
		style?: string;
		tag?: string;
	} = $props();
</script>

<svelte:element this={tag} class={['text', variant, color, className]} {style}>
	{@render children()}
</svelte:element>

<style>
	.text {
		white-space: pre-wrap;
	}
	.text.default {
		font-family: 'Morris';
		font-size: 12px;
		line-height: 16px;
	}
	.text.itemName {
		font-family: 'Dotum', '돋움';
		font-size: 14px;
		line-height: 19px;
		font-weight: bold;
	}
	.text.normal {
		font-family: 'Dotum', '돋움';
		font-size: 11px;
		line-height: 15px;
	}
	.text.white {
		color: #ffffff;
	}
	.text.gray {
		color: #b7bfc5;
	}
	.text.darkGray {
		color: #85919f;
	}
	.text.red {
		color: #ff6633;
	}
	.text.emphasis {
		color: #ffcc00;
	}
	.text.starforce {
		color: #ffcc00;
	}
	.text.scroll {
		color: #afadff;
	}
	.text.bonusStat {
		color: #0ae3ad;
	}
	.text.potentialNormal {
		color: #85919f;
	}
	.text.potentialRare {
		color: #66ffff;
	}
	.text.potentialEpic {
		color: #bb77ff;
	}
	.text.potentialUnique {
		color: #ffcc00;
	}
	.text.potentialLegendary {
		color: #ccff00;
	}
	.text.exceptional {
		color: #ff3333;
	}

	.text.sm {
		font-size: 10px;
		line-height: 14px;
	}
	.text.md {
		font-size: 11px;
		line-height: 15px;
	}
	.text.lg {
		font-size: 12px;
		line-height: 16px;
	}
	.text.white {
		color: rgb(255, 255, 255);
	}
	.text.gray3 {
		color: rgb(183, 191, 197);
	}
</style>
