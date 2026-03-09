<script lang="ts">
	import { tooltip2Images } from '$lib/assets/tooltip2-images';
	import type { Snippet } from 'svelte';

	let { children }: { children?: Snippet } = $props();
</script>

<div
	class="frame w-[324px]"
	style="background-image: url({tooltip2Images.frameTop}), url({tooltip2Images.frameMiddle});"
>
	<div class="frame-content flex flex-col items-start">
		{@render children?.()}
	</div>
</div>

<style>
	.frame {
		background-position: top, top;
		background-repeat: no-repeat, repeat-y;
		background-clip: border-box, content-box;
		image-rendering: pixelated;
		padding-top: 30px;
	}

	.frame-content {
		margin-top: -30px;
	}
</style>
