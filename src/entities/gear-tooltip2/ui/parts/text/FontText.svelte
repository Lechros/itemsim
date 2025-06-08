<script lang="ts">
	import { cn } from '$lib/shared/shadcn/utils';
	import FontTextChar from './FontTextChar.svelte';
	import FontTextLine from './FontTextLine.svelte';

	let {
		value,
		colorCode,
		class: className,
		style,
		tag,
		alignFirstLetter = true,
		wrap = false
	}: {
		value?: string;
		colorCode: string;
		class?: string;
		style?: string;
		tag?: string;
		alignFirstLetter?: boolean;
		wrap?: boolean;
	} = $props();

	const isFirstLetterAlphabet = $derived(value?.[0]?.match(/[a-zA-Z]/));
</script>

{#if wrap}
	<svelte:element
		this={tag}
		class={cn(
			'text flex flex-wrap',
			alignFirstLetter && isFirstLetterAlphabet && 'pl-[1px]',
			className
		)}
		{style}
	>
		{#if value}
			{#each value as char}
				<FontTextChar charCode={char.charCodeAt(0)} {colorCode} />
			{/each}
		{/if}
	</svelte:element>
{:else}
	<svelte:element
		this={tag}
		class={cn('text', alignFirstLetter && isFirstLetterAlphabet && 'pl-[1px]', className)}
		{style}
	>
		{#if value}
			<FontTextLine {value} {colorCode} />
		{/if}
	</svelte:element>
{/if}
