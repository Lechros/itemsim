<script lang="ts">
	import { gearMetaFromBase64, gearMetaFromEncodedURIComponent } from '$lib/import';
	import type { GearSlot } from '$lib/inventory/stores/gear-store';
	import { FileUploaderButton, FileUploaderItem, Modal, TextArea } from 'carbon-components-svelte';

	export let open = false;

	export let addGear: (gear: GearSlot) => void;

	export let DELAY = 240;

	let inputString = '';
	$: inputGear = gearMetaFromBase64(inputString);
	$: inputInvalid = inputString.trim().length > 0 && inputGear === null;

	let files: File[] = [];
	let fileStates: Map<string, 'complete' | 'error'> = new Map();
	let fileGears: Map<string, GearSlot> = new Map();

	$: canImport = inputGear || fileGears.size > 0;

	function addGears() {
		if (inputGear) {
			addGear(inputGear);
		} else if (fileGears.size > 0) {
			for (const gear of fileGears.values()) {
				addGear(gear);
			}
		}
		closeAndReset();
	}

	function onFileChange(event: CustomEvent<readonly File[]>) {
		if (fileGears.size > 0) {
			fileGears.clear();
		}
		for (const file of event.detail) {
			file
				.text()
				.then((value) => {
					const gear = gearMetaFromEncodedURIComponent(value);
					if (gear) {
						fileGears.set(file.name, gear);
						fileGears = fileGears;
						fileStates.set(file.name, 'complete');
					} else {
						fileStates.set(file.name, 'error');
					}
					fileStates = fileStates;
				})
				.catch();
		}
	}

	function closeAndReset() {
		open = false;
		setTimeout(resetAll, DELAY);
	}

	function resetAll() {
		inputString = '';
		files = [];
		fileGears.clear();
		fileGears = fileGears;
	}

	function getSubmitText(inputGear: GearSlot | null, fileGears: Map<string, GearSlot>) {
		if (inputGear) {
			return `'${inputGear.gear.name}' 추가`;
		} else if (fileGears.size > 0) {
			if (fileGears.size > 1) {
				return `아이템 ${fileGears.size}개 추가`;
			} else {
				return `'${fileGears.values().next().value.gear.name}' 추가`;
			}
		} else {
			return `아이템이 없습니다`;
		}
	}

	function getFileInvalid(file: File, states: typeof fileStates) {
		return states.get(file.name) === 'error';
	}

	function getFileStatus(file: File, states: typeof fileStates) {
		switch (states.get(file.name)) {
			case 'complete':
				return 'complete';
			case 'error':
				return 'edit';
			default:
				return 'uploading';
		}
	}
</script>

<Modal
	size="sm"
	bind:open
	modalHeading="가져오기"
	primaryButtonText={getSubmitText(inputGear, fileGears)}
	primaryButtonDisabled={!canImport}
	on:submit={addGears}
	on:close={closeAndReset}
>
	<div class="import">
		<div class="import__string">
			{#if files.length === 0}
				<TextArea
					labelText="아이템 정보"
					placeholder="아이템 정보를 붙여넣기해 주세요."
					invalid={inputInvalid}
					invalidText="잘못된 값입니다."
					bind:value={inputString}
				/>
				<div class="import__string-preview">
					{#if inputGear}
						<h6>{inputGear.gear.name}</h6>
					{/if}
				</div>
			{/if}
		</div>
		<div class="import__upload">
			<p class:bx--label-description={true}>
				{files.length === 0 ? '또는 파일 업로드' : '파일 업로드'}
			</p>
			<FileUploaderButton
				labelText="파일 선택"
				accept={['.sim']}
				multiple
				bind:files
				on:change={onFileChange}
			/>
			<div class:bx--file-container={true}>
				{#each files as file, i}
					<FileUploaderItem
						name={file.name}
						invalid={getFileInvalid(file, fileStates)}
						status={getFileStatus(file, fileStates)}
						on:delete={() => (files = files.filter((_, index) => index !== i))}
					/>
				{/each}
			</div>
		</div>
	</div>
</Modal>

<style>
	.import__string-preview {
		margin-top: var(--cds-spacing-03);
	}

	.import__upload {
		margin-top: var(--cds-spacing-05);
	}
</style>
