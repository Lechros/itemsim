<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { ArrowLeft } from 'lucide-svelte';

	let { backHref, title }: { backHref?: string; title: string } = $props();
</script>

<header class="bg-background sticky top-0 z-50 h-14 w-full">
	<div class="mx-auto flex h-full w-full max-w-screen-md px-2">
		<div class="flex items-center gap-2">
			{#if backHref}
				<Button variant="ghost" size="icon" href={backHref}>
					<ArrowLeft />
				</Button>
			{/if}
			<span class="mt-px font-semibold">{title}</span>
		</div>
	</div>
</header>
