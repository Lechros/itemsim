<script lang="ts">
	import { Footer } from '$lib/widgets/footer';
	import '../app.css';
	let { children } = $props();
</script>

<div class="mx-auto flex min-h-screen flex-col">
	<main class="flex-grow p-4">
		{@render children()}
	</main>
	<Footer />
</div>
