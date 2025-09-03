<script lang="ts">
	import UIImage from '../UIImage.svelte';

	let { label }: { label: string } = $props();
</script>

<div class="-ml-1 flex">
	<UIImage image="exceptionalIcon" class="mr-[5px]" />
	<span class="gt--detail gt--red2">{label}</span>
</div>
