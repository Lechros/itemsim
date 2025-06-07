<script lang="ts">
	import { cn } from '$lib/shared/shadcn/utils';
	import { parseColorString } from '../../model/parser';

	let { raw, class: className }: { raw: string; class?: string } = $props();
</script>

<div class={cn('text', className)}>
	{@html parseColorString(raw, {
		c: 'emphasis',
		$r: 'red',
		$g: 'gray',
		$b: 'bonusStat',
		$u: 'scroll',
		$s: 'starforce'
	})}
</div>

<style>
	.text {
		white-space: pre-wrap;
		font-family: 'Morris';
		font-size: 12px;
		line-height: 16px;
		color: #ffffff;
	}
	.text :global(.emphasis) {
		color: #ffcc00;
	}
	.text :global(.red) {
		color: #ff6633;
	}
	.text :global(.gray) {
		color: #b7bfc5;
	}
	.text :global(.starforce) {
		color: #ffcc00;
	}
	.text :global(.scroll) {
		color: #afadff;
	}
	.text :global(.bonusStat) {
		color: #0ae3ad;
	}
</style>
