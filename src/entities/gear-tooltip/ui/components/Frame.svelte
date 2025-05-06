<script lang="ts">
	import { UIImage } from '$lib/shared/ui';
	import type { Snippet } from 'svelte';

	let { children, class: className }: { children?: Snippet; class?: string } = $props();
</script>

<div class={['relative w-[324px]', className]} style="image-rendering: pixelated;">
	<UIImage image="frameTop" />
	<UIImage image="frameLine" class="flex flex-col items-center" style="height: unset;">
		{@render children?.()}
	</UIImage>
	<UIImage image="frameBottom" />
	<UIImage image="frameCover" class="absolute top-0 left-0" />
</div>
