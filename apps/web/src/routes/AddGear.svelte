<script lang="ts">
	import { gearJson, type GearData } from '@malib/create-gear';
	import { ContentSwitcher, Search, SelectableTile, Switch } from 'carbon-components-svelte';
	import { onMount } from 'svelte';

	export let selectedIds: Map<string, string>;

	export function resetSearchValue() {
		name = '';
	}

	export function resetJob() {
		job = 0;
	}

	export function resetIds() {
		selectedIds.clear();
		selectedIds = selectedIds;
	}

	export function buildIds() {}

	let name = '';
	let job = 0;

	let trimmed = '';
	$: {
		trimmed = trimIncompleteLetter(name.trim());
	}

	const datas = Object.entries(gearJson);

	$: result = search(datas, trimmed);
	$: filtered = job > 0 ? result.filter((data) => canJob(data[1], job)) : result;

	function search(datas: [string, GearData][], word: string) {
		if (word.length < 1) {
			return [];
		}
		return datas
			.filter((data) => match(data[1].name, word))
			.sort((a, b) => compare(a[1].name, b[1].name, word));
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

	function compare(name1: string, name2: string, word: string) {
		const includes1 = name1.includes(word);
		const includes2 = name2.includes(word);
		if (includes1 && includes2) return 0;
		if (includes1) return -1;
		if (includes2) return 1;
		return 0;
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

	function trimIncompleteLetter(text: string) {
		return text.replace(/[ㄱ-ㅎㅏ-ㅢ]+$/, '');
	}

	const placeholderItems = [
		'앱솔랩스 나이트헬름',
		'앱솔랩스 메이지크라운',
		'앱솔랩스 아처후드',
		'앱솔랩스 시프캡',
		'앱솔랩스 파이렛페도라',
		'하이네스 워리어헬름',
		'하이네스 던위치햇',
		'하이네스 레인져베레',
		'하이네스 어새신보닛',
		'하이네스 원더러햇',
		'이글아이 워리어아머',
		'이글아이 던위치로브',
		'이글아이 레인져후드',
		'이글아이 어새신셔츠',
		'이글아이 원더러코트',
		'트릭스터 워리어팬츠',
		'트릭스터 던위치팬츠',
		'트릭스터 레인져팬츠',
		'트릭스터 어새신팬츠',
		'트릭스터 원더러팬츠'
	];

	function getRandomItem() {
		return placeholderItems[Math.floor(Math.random() * placeholderItems.length)];
	}
</script>

<Search placeholder="ex) {getRandomItem()}" bind:value={name} />

<ContentSwitcher
	bind:selectedIndex={job}
	style="margin-top: var(--cds-spacing-05); margin-bottom: var(--cds-spacing-05)"
>
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
				selectedIds = selectedIds;
			}}
			on:deselect={() => {
				selectedIds.delete(data[0]);
				selectedIds = selectedIds;
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
	{#if trimmed.length > 0}
		<div>검색된 아이템이 없습니다.</div>
	{:else}
		<div>검색어를 입력해 주세요.</div>
	{/if}
{/each}

<style>
	.add-item {
		display: flex;
		align-items: center;
		gap: var(--cds-spacing-05);
	}

	.row:not(.first) {
		border-top: 1px solid var(--cds-border-subtle);
	}
</style>
