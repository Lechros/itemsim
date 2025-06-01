<script lang="ts">
	import { Button } from '$lib/shared/shadcn/components/ui/button';
	import { Input } from '$lib/shared/shadcn/components/ui/input';
	import { ArrowLeft } from 'lucide-svelte';

	let {
		backHref,
		title,
		query = $bindable(''),
		placeholder = $bindable('아이템 이름을 입력해 주세요.')
	}: {
		backHref?: string;
		title: string;
		query?: string;
		placeholder?: string;
	} = $props();
</script>

<header class="bg-background/80 w-full backdrop-blur">
	<div class="mx-auto flex w-full max-w-screen-md flex-col px-2">
		<div class="flex h-10 items-center gap-2 pt-2">
			<Button variant="ghost" size="icon" href={backHref}>
				<ArrowLeft />
			</Button>
			<span class="mt-px font-semibold">{title}</span>
		</div>
	</div>
</header>
<header class="bg-background/80 sticky top-0 z-40 w-full border-b backdrop-blur">
	<div class="mx-auto flex w-full max-w-screen-md flex-col px-2">
		<div class="flex h-12 items-center">
			<Input type="search" {placeholder} class="w-full" bind:value={query} autofocus />
		</div>
	</div>
</header>
