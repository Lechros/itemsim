<script lang="ts">
	let { tags }: { tags: string[] } = $props();

	// svelte-ignore non_reactive_update
	let div: HTMLDivElement;

	$effect(() => {
		forEachChildren(
			div,
			(el) => el.classList.add('gt--comma'),
			(el) => el.classList.remove('gt--comma')
		);
		tags;
	});

	function forEachChildren(
		parent: Element,
		onNotLastInLine: (el: Element) => void,
		onLastInLine: (el: Element) => void
	) {
		const children = parent.children;
		for (let i = 0; i < children.length - 1; i++) {
			const cur = children[i];
			const next = children[i + 1];
			if (cur.getBoundingClientRect().y < next.getBoundingClientRect().y) {
				onLastInLine(cur);
			} else {
				onNotLastInLine(cur);
			}
		}
		onLastInLine(children[children.length - 1]);
	}
</script>

{#if tags.length > 0}
	<div class="flex flex-wrap justify-center pr-[20px] pl-[19px]" bind:this={div}>
		{#each tags as tag}
			<span class="gt--detail gt--orange gt--comma whitespace-pre">{tag}</span>
		{/each}
	</div>
{/if}

<style>
	.gt--comma:not(:last-child)::after {
		content: ', ';
	}
</style>
