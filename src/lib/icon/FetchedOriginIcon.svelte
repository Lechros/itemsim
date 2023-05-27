<script lang="ts">
	import OriginIcon from './OriginIcon.svelte';

	export let src: string;
	export let originSrc: string;

	const DEFAULT_ORIGIN: [number, number] = [0, 32];

	let origin: [number, number] | undefined;
	$: updateOrigin(originSrc);

	let controller: AbortController | undefined;
	function updateOrigin(originSrc: string) {
		origin = undefined;
		if (controller) controller.abort();
		controller = new AbortController();

		fetch(originSrc, { signal: controller.signal })
			.then((data) => data.json())
			.then((o) => (origin = o))
			.catch((error) => {
				if (error.name && error.name.includes('AbortError')) {
					// skip aborted
				} else {
					console.log(error);
				}
			});
	}
</script>

<OriginIcon
	{src}
	origin={origin ?? DEFAULT_ORIGIN}
	visible={origin !== undefined}
	{...$$restProps}
/>
