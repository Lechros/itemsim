<script lang="ts">
	let { width = 0, height = 0 }: { width?: number; height?: number } = $props();
</script>

<span class="block" style="width: {width}px; height: {height}px;" aria-hidden="true"></span>
