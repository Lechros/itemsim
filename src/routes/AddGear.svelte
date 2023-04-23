<script lang="ts">
	import { ContentSwitcher, Search, SelectableTile, Switch } from 'carbon-components-svelte';
	import type { GearLike } from '@malib/gear';

	/**
	 * [itemID]: gear name
	 */
	export let selectedIds: Map<number, string>;

	export function resetSearchValue() {
		name = '';
		result = [];
	}

	export function resetJob() {
		job = 0;
	}

	export function resetSelected() {
		selectedIds.clear();
		selectedIds = selectedIds;
	}

	let name = '';
	let job = 0;

	let msg = '검색어를 입력해 주세요.';

	let trimmed = '';
	$: {
		trimmed = trimIncompleteLetter(name.trim());
		if (trimmed.length == 0) {
			msg = '검색어를 입력해 주세요.';
			result = [];
		}
	}

	let result: [number, GearLike][] = [];
	$: {
		getGearData(trimmed);
	}
	$: filtered = job > 0 ? result.filter((data) => canJob(data[1], job)) : result;

	const url = 'https://gears.itemsim.workers.dev/?query=';
	let controller: AbortController; // abort previous API calls when input change
	let emptyAssignTimer: NodeJS.Timeout; // delay showing empty results caused by entering 한글 input

	function getGearData(input: string) {
		if (controller) controller.abort();
		controller = new AbortController();
		if (input.length > 0) {
			if(emptyAssignTimer) {
				clearTimeout(emptyAssignTimer);
			}
			fetch(url + encodeURIComponent(input), { signal: controller.signal })
				.then((data) => data.json())
				.then((json) => {
					if (Array.isArray(json)) {
						if(json.length == 0) {
							msg = '검색된 아이템이 없습니다.';
							emptyAssignTimer = setTimeout(() => {
								result = json;
							}, 300); // delay ms
						}
						else {
							result = json;
						}
					}
				})
				.catch((error) => {
					if (error.name && error.name.includes('AbortError')) {
						// skip aborted
					} else {
						msg = '아이템 서버에 접속할 수 없습니다.';
					}
				});
		}
	}

	function canJob(data: GearLike, jobIndex: number) {
		if (data.r.job) {
			if (jobIndex == 0) {
				return true;
			}
			const job = 1 << (jobIndex - 1);
			return (data.r.job & job) > 0;
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
				selectedIds.set(data[0], data[1].n);
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
					alt={data[1].n}
					style="
						margin-left: {1 - data[1].i.origin[0]}px;
						margin-top: {33 - data[1].i.origin[1]}px;"
				/>
				{data[1].n}
			</div>
		</SelectableTile>
	</div>
{:else}
	<div>{msg}</div>
	<!-- {#if trimmed.length > 0}
		<div>검색된 아이템이 없습니다.</div>
	{:else}
		<div>검색어를 입력해 주세요.</div>
	{/if} -->
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
