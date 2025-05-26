<script lang="ts">
	import { Button } from '$lib/shared/shadcn/components/ui/button';
	import { ArrowLeft } from 'lucide-svelte';
</script>

<header class="bg-background/80 sticky w-full border-b backdrop-blur">
	<div class="mx-auto flex w-full max-w-screen-md flex-col px-2">
		<div class="flex h-12 items-center gap-2">
			<Button variant="ghost" size="icon" href="/">
				<ArrowLeft />
			</Button>
			<span class="mt-px font-semibold">아이템 강화</span>
		</div>
	</div>
</header>
