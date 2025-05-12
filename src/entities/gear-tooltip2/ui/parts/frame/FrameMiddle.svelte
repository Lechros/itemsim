<script lang="ts">
	import { tooltip2Images } from '$lib/shared/assets';
	import type { Snippet } from 'svelte';

	let { children }: { children?: Snippet } = $props();
</script>

<div
	class="frame flex w-[324px] flex-col items-start"
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
