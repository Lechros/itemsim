<script lang="ts">
	import { tooltip2Images } from '$lib/shared/assets';
	import type { Snippet } from 'svelte';

	let { children }: { children?: Snippet } = $props();
</script>

<div
	class={'frame w-[324px]'}
	style="background-image: url({tooltip2Images.frameTop}), url({tooltip2Images.frameMiddle}), url({tooltip2Images.frameBottom});"
>
	<div class={'frame-content'}>
		{@render children?.()}
	</div>
</div>

<style>
	.frame {
		background-position: top, top, bottom;
		background-repeat: no-repeat, repeat-y, no-repeat;
		background-clip: border-box, content-box, border-box;
		image-rendering: pixelated;
		padding-top: 30px;
		padding-bottom: 12px;
	}

	.frame-content {
		margin-top: -30px;
		margin-bottom: -12px;
	}
</style>
