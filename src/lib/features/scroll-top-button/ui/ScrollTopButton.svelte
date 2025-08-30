<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { ArrowUp } from 'lucide-svelte';

	let {
		scrollRef
	}: {
		scrollRef?: HTMLElement;
	} = $props();
</script>

<div class="fixed right-0 bottom-0 z-50 p-8">
	<Button
		variant="outline"
		size="icon"
		class="shadow-lg"
		onclick={() => {
			scrollRef?.scrollTo({ top: 0, behavior: 'smooth' });
		}}
	>
		<ArrowUp />
	</Button>
</div>
