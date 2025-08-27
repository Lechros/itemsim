<script lang="ts">
	import { UIImage2 } from '$lib/shared/ui';
	import DetailText from './text/DetailText.svelte';

	let { value }: { value: string } = $props();
</script>

<div class="flex">
	<UIImage2 image="categoryLeft" />
	<UIImage2 image="categoryMiddle" class="flex" style="width: min-content;">
		<DetailText color="gray" class="-mt-px h-[16px] flex-nowrap" {value} />
	</UIImage2>
	<UIImage2 image="categoryRight" />
</div>
