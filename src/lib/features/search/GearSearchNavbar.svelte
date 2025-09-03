<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { cn } from '$lib/utils';
	import { ArrowLeft, Search, X } from 'lucide-svelte';

	let {
		backHref,
		title,
		query = $bindable(''),
		placeholder = $bindable(),
		scrollTop = 0
	}: {
		backHref?: string;
		title: string;
		query?: string;
		placeholder?: string;
		scrollTop?: number;
	} = $props();

	const SCROLL_TOP_THRESHOLD = 46;
</script>

<header class="bg-background -mb-2.5 h-14 w-full">
	<div class="mx-auto flex h-full w-full max-w-screen-md px-2">
		<div class="flex items-center gap-2">
			<Button variant="ghost" size="icon" href={backHref}>
				<ArrowLeft />
			</Button>
			<span class="mt-px font-semibold">{title}</span>
		</div>
	</div>
</header>
<header class="bg-background/95 sticky top-0 z-50 h-14 w-full backdrop-blur">
	<div
		class={cn(
			'mx-auto flex h-full w-full max-w-screen-md px-4',
			scrollTop > SCROLL_TOP_THRESHOLD && 'pl-2'
		)}
	>
		<div class="flex w-full items-center gap-2">
			{#if scrollTop > SCROLL_TOP_THRESHOLD}
				<Button variant="ghost" size="icon" href={backHref}>
					<ArrowLeft />
				</Button>
			{/if}
			<div class="relative w-full">
				<Input class="pr-8.5 pl-9" {placeholder} bind:value={query} autofocus />
				<Search
					class={cn(
						'text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2'
					)}
				/>
				{#if query}
					<Button
						class="absolute top-px right-px bottom-px size-[34px]"
						variant="ghost"
						size="icon"
						onclick={() => (query = '')}
					>
						<X class="text-muted-foreground" />
					</Button>
				{/if}
			</div>
		</div>
	</div>
</header>
