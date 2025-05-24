<script lang="ts">
	let {
		text,
		highlight
	}: {
		text: string;
		highlight: string;
	} = $props();

	type Segment = {
		text: string;
		highlighted: boolean;
	};

	const segments = $derived(getSegments(text, highlight));

	function getSegments(text: string, highlight: string): Segment[] {
		const result: Segment[] = [];
		let startIndex = 0;
		let highlighted = false;

		for (let i = 0; i < text.length; i++) {
			const isHighlight = highlight[i] === '1';

			if (isHighlight !== highlighted) {
				if (i > startIndex) {
					result.push({ text: text.slice(startIndex, i), highlighted });
				}
				startIndex = i;
				highlighted = isHighlight;
			}
		}
		if (startIndex < text.length) {
			result.push({ text: text.slice(startIndex), highlighted });
		}

		return result;
	}
</script>

{#each segments as segment}
	{#if segment.highlighted}
		<span class="bg-ring">{segment.text}</span>
	{:else}
		{segment.text}
	{/if}
{/each}
