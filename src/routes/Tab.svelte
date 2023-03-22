<script>
	import { getContext } from 'svelte';
	import { TABS } from './Tabs.svelte';

	const tab = {};
	const { registerTab, selectTab, selectedTab } = getContext(TABS);

	registerTab(tab);
</script>

<li>
	<button class:selected={$selectedTab === tab} on:click={() => selectTab(tab)}>
		<slot />
	</button>
</li>

<style>
	li {
		margin-bottom: -1px;
	}

	button {
        background-color: white;
		border: 1px solid transparent;
        border-bottom: 1px solid gray;
		border-top-left-radius: 0.25rem;
		border-top-right-radius: 0.25rem;
		display: block;
		padding: 0.5rem 1rem;
	}

	button:hover:not(.selected) {
        border-color: lightgray;
	}

	.selected {
        background-color: #fff;
        border-color: gray gray #fff;
	}
</style>
