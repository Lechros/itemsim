<script lang="ts">
	import { Button } from '$lib/shared/shadcn/components/ui/button';
	import { Input } from '$lib/shared/shadcn/components/ui/input';
	import { cn } from '$lib/shared/shadcn/utils';
	import { ArrowLeft } from 'lucide-svelte';

	let {
		backHref,
		title,
		scrollY,
		query = $bindable(''),
		placeholder = $bindable('아이템 이름을 입력해 주세요.')
	}: {
		backHref?: string;
		title: string;
		scrollY: number;
		query?: string;
		placeholder?: string;
	} = $props();

	const fixed = $derived(scrollY >= 32);
</script>

<header class={cn('bg-background/80 w-full border-b backdrop-blur', fixed && 'fixed z-40')}>
	<div class="mx-auto flex w-full max-w-screen-md flex-col px-2">
		{#if !fixed}
			<div class="flex h-10 items-center gap-2 pt-2">
				<Button variant="ghost" size="icon" href={backHref}>
					<ArrowLeft />
				</Button>
				<span class="mt-px font-semibold">{title}</span>
			</div>
		{/if}
		<div class="flex h-12 items-center">
			<Input type="search" {placeholder} class="w-full" bind:value={query} autofocus />
		</div>
	</div>
</header>

{#if fixed}
	<div class="h-[97px]"></div>
{/if}
