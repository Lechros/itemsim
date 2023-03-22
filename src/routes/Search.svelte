<script lang="ts">
	import { gearJson, type GearData } from '@malib/create-gear';
	import { createEventDispatcher } from 'svelte';

	export let onMouseEnter: (v: (typeof datas)[0]) => any = () => {};
	export let onMouseLeave: (v: (typeof datas)[0]) => any = () => {};

	let name: string = '';

	const dispatch = createEventDispatcher();

	function createGear(id: string) {
		dispatch('click', id);
	}

	const datas = Object.entries(gearJson);

	function search(word: string) {
		if (word.length < 2) {
			return [];
		}
		return datas.filter((data) => match(data[1].name, word));
	}

	function match(haystack: string, word: string) {
		let j = 0;
		for (let i = 0; i < haystack.length && j < word.length; i++) {
			if (haystack[i] === word[j]) {
				j++;
			}
		}
		return j === word.length;
	}
</script>

<label>검색 <input type="text" bind:value={name} /></label>
<ul>
	{#each search(name) as data}
		<li>
			<button
				on:click={() => createGear(data[0])}
				on:mouseenter={() => onMouseEnter(data)}
				on:mouseleave={() => onMouseLeave(data)}
			>
				<div class="icon-wrapper">
					<img
						src="https://maplestory.io/api/KMS/367/item/{data[1].icon}/icon"
						alt={data[1].name}
						style="
                        margin-left: {3 + (1 - data[1].origin[0])}px;
                        margin-top: {3 + (33 - data[1].origin[1])}px;"
					/>
				</div>
				{data[1].name}
			</button>
		</li>
	{:else}
		검색 결과 없음
	{/each}
</ul>

<style>
	ul {
		list-style-type: none;
		padding: 0.5rem;
		width: 16rem;
		max-height: 80vh;
		overflow-y: auto;
	}

	button {
		display: flex;
		align-items: center;
		column-gap: 0.5rem;
		width: 15rem;
	}

	input {
		padding: 0.25rem;
	}

	.icon-wrapper {
		height: 3rem;
	}
</style>
