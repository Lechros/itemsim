<script lang="ts">
	import Text from '../Text.svelte';

	let { label }: { label: string } = $props();
</script>

<Text>{label}</Text>
