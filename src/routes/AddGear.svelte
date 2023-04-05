<script lang="ts">
	import { gearJson, type GearData } from '@malib/create-gear';
	import {
		ContentSwitcher,
		Search,
		SelectableTile,
		Switch
	} from 'carbon-components-svelte';

	export let selectedIds: Map<string, string>;
	export let count: number;

	export function resetSearchValue() {
		name = '';
	}

	export function resetJob() {
		job = 0;
	}

	export function resetIds() {
		selectedIds.clear();
		count = 0;
	}

	export function buildIds() {}

	let name = '';
	let job = 0;

	const datas = Object.entries(gearJson);

	$: result = search(datas, name.trim());
	$: filtered = result.filter((data) => canJob(data[1], job));

	function search(datas: [string, GearData][], word: string) {
		if (word.length < 1) {
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

	function canJob(data: GearData, jobIndex: number) {
		if (data.req?.job) {
			if (jobIndex == 0) {
				return true;
			}
			const job = 1 << (jobIndex - 1);
			return (data.req.job & job) > 0;
		}
		return jobIndex === 0;
	}
</script>

<Search placeholder="아이템 검색" bind:value={name} />

<ContentSwitcher bind:selectedIndex={job} style="margin-top: 1rem; margin-bottom: 1rem">
	<Switch text="전체" />
	<Switch text="전사" />
	<Switch text="마법사" />
	<Switch text="궁수" />
	<Switch text="도적" />
	<Switch text="해적" />
</ContentSwitcher>

{#each filtered as data, i}
	<div class="row" class:first={i === 0}>
		<SelectableTile
			selected={selectedIds.has(data[0])}
			on:select={() => {
				selectedIds.set(data[0], data[1].name);
				count = selectedIds.size;
			}}
			on:deselect={() => {
				selectedIds.delete(data[0]);
				count = selectedIds.size;
			}}
		>
			<div class="add-item">
				<img
					src="https://maplestory.io/api/KMS/367/item/{data[0]}/icon"
					alt={data[1].name}
					style="
						margin-left: {1 - data[1].origin[0]}px;
						margin-top: {33 - data[1].origin[1]}px;"
				/>
				{data[1].name}
			</div>
		</SelectableTile>
	</div>
{:else}
	{#if name.length > 0}
		검색된 아이템이 없습니다.
	{:else}
		검색어를 입력해 주세요.
	{/if}
{/each}

<style>
	.add-item {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.row:not(.first) {
		border-top: 1px solid #E0E0E0;
	}
</style>
