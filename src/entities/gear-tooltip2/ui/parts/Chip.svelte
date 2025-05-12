<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ClassValue } from 'svelte/elements';
	import Text from './Text.svelte';
	import { UIImage2 } from '$lib/shared/ui';

	let {
		children,
		class: className
	}: {
		children: Snippet;
		class?: ClassValue;
	} = $props();
</script>

<div class="flex">
	<UIImage2 image="categoryLeft" />
	<UIImage2 image="categoryMiddle" class="flex" style="width: min-content;">
		<Text color="gray" style="white-space: nowrap;">
			{@render children()}
		</Text>
	</UIImage2>
	<UIImage2 image="categoryRight" />
</div>
