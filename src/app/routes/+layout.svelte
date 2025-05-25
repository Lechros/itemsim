<script lang="ts">
	import { Toaster } from '$lib/shared/shadcn/components/ui/sonner';
	import '../app.css';
	let { children } = $props();
</script>

<Toaster />

{@render children()}
