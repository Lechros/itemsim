<script lang="ts">
	import { Card } from '$lib/shared/shadcn/components/ui/card';
	import type { Snippet } from 'svelte';
	import SelectedItemCardHeader from './SelectedItemCardHeader.svelte';

	let {
		selectedItem,
		clearable,
		onClear,
		placeholder,
		children
	}: {
		selectedItem: {
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
	<SelectedItemCardHeader {selectedItem} {clearable} {onClear} {placeholder} />
	{@render children?.()}
</Card>
