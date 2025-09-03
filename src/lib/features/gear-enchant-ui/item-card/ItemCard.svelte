<script lang="ts">
	import { Card } from '$lib/components/ui/card';
	import type { Snippet } from 'svelte';
	import ItemCardHeader from './ItemCardHeader.svelte';

	let {
		item,
		clearable,
		onClear,
		placeholder,
		children
	}: {
		item: {
			name: string;
			icon?: string;
		} | null;
		clearable?: boolean;
		onClear?: () => void;
		placeholder?: string;
		children?: Snippet;
	} = $props();
</script>

<Card class="gap-4 py-4">
	<ItemCardHeader selectedItem={item} {clearable} {onClear} {placeholder} />
	{@render children?.()}
</Card>
