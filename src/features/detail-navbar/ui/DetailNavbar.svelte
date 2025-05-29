<script lang="ts">
	import { Button } from '$lib/shared/shadcn/components/ui/button';
	import { ArrowLeft } from 'lucide-svelte';

	let { backHref, title }: { backHref?: string; title: string } = $props();
</script>

<header class="bg-background/80 sticky w-full border-b backdrop-blur">
	<div class="mx-auto flex w-full max-w-screen-md flex-col px-2">
		<div class="flex h-12 items-center gap-2">
			{#if backHref}
				<Button variant="ghost" size="icon" href={backHref}>
					<ArrowLeft />
				</Button>
			{/if}
			<span class="mt-px font-semibold">{title}</span>
		</div>
	</div>
</header>
