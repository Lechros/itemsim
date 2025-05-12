<script lang="ts">
	import Text from '../Text.svelte';

	let {
		value,
		plus = false,
		suffix
	}: {
		value: number;
		plus?: boolean;
		suffix?: string;
	} = $props();
</script>

<Text>{plus ? '+' : ''}{value}{suffix ?? ''}</Text>
