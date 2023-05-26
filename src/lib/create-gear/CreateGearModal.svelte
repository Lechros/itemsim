<script lang="ts">
	import { plainToGear, type Gear, type GearLike } from '@malib/gear';
	import {
		ContentSwitcher,
		Link,
		Modal,
		Search,
		SelectableTile,
		Switch,
		Tile
	} from 'carbon-components-svelte';
	import { throttle } from '../../routes/util';
	import StringMatch from '../string-match/StringMatch.svelte';
	import GearIcon from '$lib/icon/GearIcon.svelte';

	export let open = false;

	export let addGear: (gear: Gear) => void;

	export let DEFAULT_SHOW = 20;
	export let SHOW_STEP = 20;

	export const DELAY = 240;

	const SEARCH_EMPTY_MSG = '검색어를 입력해 주세요.';
	const SEARCH_NO_ITEM_MSG = '검색된 아이템이 없습니다.';
	const SEARCH_SERVER_ERROR_MSG = '아이템 서버에 접속할 수 없습니다.';

	let name = '';
	let job = 0;

	let msg = SEARCH_EMPTY_MSG;

	$: trimmed = trimIncompleteLetter(name.trim());
	$: {
		if (trimmed.length == 0) {
			msg = SEARCH_EMPTY_MSG;
			response = [];
		}
	}

	/**
	 * [itemID]: serialized Gear
	 */
	let selectedIds: Map<number, GearLike> = new Map();

	function reset() {
		name = '';
		job = 0;
		selectedIds.clear();
		selectedIds = selectedIds;
	}

	let currentShow = DEFAULT_SHOW;

	let response: GearLike[] = [];
	const throttleGet = throttle(() => getGearData(trimmed), 200);
	$: {
		if (trimmed.length > 0) {
			throttleGet();
		}
	}
	$: filtered = job > 0 ? response.filter((data) => canJob(data, job)) : response;

	const url = 'https://api.itemsim.com/gears/search?query=';
	let controller: AbortController; // abort previous API calls when input change
	let emptyAssignTimer: NodeJS.Timeout; // delay showing empty results caused by entering 한글 input

	function getGearData(input: string) {
		// abort previous request
		if (controller) controller.abort();
		controller = new AbortController();

		if (input.length > 0) {
			fetch(url + encodeURIComponent(input), { signal: controller.signal })
				.then((data) => data.json())
				.then((json) => {
					if (Array.isArray(json)) {
						if (json.length == 0) {
							msg = SEARCH_NO_ITEM_MSG;
							emptyAssignTimer = setTimeout(() => {
								response = json;
							}, 200);
						} else {
							clearTimeout(emptyAssignTimer);
							response = json;
							currentShow = DEFAULT_SHOW;
						}
					}
				})
				.catch((error) => {
					if (error.name && error.name.includes('AbortError')) {
						// skip aborted
					} else {
						msg = SEARCH_SERVER_ERROR_MSG;
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

	function getAddMessage(ids: Map<number, GearLike>) {
		if (ids.size > 1) {
			return `선택한 아이템 ${ids.size}개 추가`;
		} else if (ids.size === 1) {
			return `'${ids.values().next().value.n}' 추가`;
		} else {
			return '선택한 아이템이 없습니다';
		}
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

<Modal
	bind:open
	size="sm"
	selectorPrimaryFocus="input"
	modalHeading="아이템 추가"
	hasForm
	hasScrollingContent
	primaryButtonText={getAddMessage(selectedIds)}
	primaryButtonDisabled={selectedIds.size === 0}
	secondaryButtonText="취소"
	on:submit={() => {
		for (const [, gearLike] of selectedIds) {
			addGear(plainToGear(gearLike));
		}
		// TODO: open enchant if single gear was added
		open = false;
		setTimeout(() => {
			reset();
		}, DELAY);
	}}
	on:click:button--secondary={() => {
		open = false;
		setTimeout(() => {
			reset();
		}, DELAY);
	}}
	on:close={() => {
		open = false;
		setTimeout(() => {
			reset();
		}, DELAY);
	}}
>
	<div class="create-gear">
		<div class="create-gear__search">
			<Search
				placeholder="ex) {getRandomItem()}"
				bind:value={name}
				on:keydown={(e) => {
					if (e.code === 'Escape' && name.length > 0) {
						e.stopPropagation();
					}
				}}
			/>
		</div>

		<div class="create-gear__jobs">
			<ContentSwitcher bind:selectedIndex={job}>
				<Switch text="전체" />
				<Switch text="전사" />
				<Switch text="마법사" />
				<Switch text="궁수" />
				<Switch text="도적" />
				<Switch text="해적" />
			</ContentSwitcher>
		</div>

		<div class="create-gear__gears">
			{#each filtered.slice(0, currentShow) as data}
				<div class="create-gear__gear">
					<SelectableTile
						selected={selectedIds.has(data.id)}
						on:select={() => {
							selectedIds.set(data.id, data);
							selectedIds = selectedIds;
						}}
						on:deselect={() => {
							selectedIds.delete(data.id);
							selectedIds = selectedIds;
						}}
					>
						<div class="create-gear__gear-content">
							<GearIcon iconId={data.i.id} />
							<StringMatch str={data.n} search={trimmed} />
						</div>
					</SelectableTile>
				</div>
			{/each}
		</div>

		{#if filtered.length > currentShow}
			<Tile>
				{filtered.length - currentShow}개의 아이템을 생략했습니다.
				<Link href="/" on:click={() => (currentShow += SHOW_STEP)}>검색 결과 더 보기</Link>
			</Tile>
		{:else if filtered.length == 0}
			<Tile>{msg}</Tile>
		{/if}
	</div>
</Modal>

<style>
	.create-gear__jobs {
		margin-top: var(--cds-spacing-05);
	}

	.create-gear__gears {
		margin-top: var(--cds-spacing-05);
	}

	.create-gear__gear:not(:first-child) {
		border-top: 1px solid var(--cds-border-subtle);
	}
	.create-gear__gear-content {
		display: flex;
		align-items: center;
		gap: var(--cds-spacing-05);
	}
</style>
