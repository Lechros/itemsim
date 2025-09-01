<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { cn } from '$lib/utils';
	import { Search, X } from 'lucide-svelte';

	let {
		value = $bindable('')
	}: {
		value?: string;
	} = $props();
</script>

<div class="relative">
	<Input class="pr-8.5 pl-9" placeholder="아이템 이름" bind:value />
	<Search
		class={cn(
			'text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2'
		)}
	/>
	{#if value}
		<Button
			class="absolute top-px right-px bottom-px size-[34px]"
			variant="ghost"
			size="icon"
			onclick={() => (value = '')}
		>
			<X class="text-muted-foreground" />
		</Button>
	{/if}
</div>
