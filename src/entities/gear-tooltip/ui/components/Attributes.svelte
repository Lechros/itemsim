<script lang="ts">
	import { GearAttribute } from '@malib/gear';
	import { getTags } from '../../model/strings';

	type Props = Pick<
		GearAttribute,
		'only' | 'trade' | 'onlyEquip' | 'share' | 'blockGoldenHammer' | 'canPotential'
	>;

	let props: Props = $props();

	let tags = $derived(getTags(props));

	// svelte-ignore non_reactive_update
	let div: HTMLDivElement;

	$effect(() => {
		forEachChildren(
			div,
			(el) => el.classList.add('gt--comma'),
			(el) => el.classList.remove('gt--comma')
		);
		props.only;
		props.trade;
		props.onlyEquip;
		props.share;
		props.blockGoldenHammer;
		props.canPotential;
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
