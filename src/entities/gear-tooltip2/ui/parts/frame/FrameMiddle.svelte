<script lang="ts">
	import { tooltip2Images } from '$lib/shared/assets';
	import type { Snippet } from 'svelte';

	let {
		children,
		class: className
	}: {
		children?: Snippet;
		class?: string;
	} = $props();
</script>

<div
	class={['frame flex w-[324px] flex-col items-start', className]}
	style="background-image: url({tooltip2Images.frameMiddle});"
>
	{@render children?.()}
</div>

<style>
	.frame {
		background-repeat: repeat-y;
		image-rendering: pixelated;
	}
</style>
