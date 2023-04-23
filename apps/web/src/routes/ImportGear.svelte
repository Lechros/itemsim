<script lang="ts">
	import { Gear, validateParseGear } from '@malib/gear';
	import {
		FileUploader,
		FileUploaderButton,
		FileUploaderItem,
		FormItem,
		FormLabel,
		TextArea
	} from 'carbon-components-svelte';
	import { decompressFromBase64, decompressFromEncodedURIComponent } from 'lz-string';
	import { gearMetaFromEncodedURIComponent, parseGearMeta } from './export';
	import type { GearSlot } from './gear-store';

	export let strGear: GearSlot | null;

	export let fileSlots: Map<string, GearSlot> = new Map();

	export function reset() {
		value = '';
		files = [];
		fileStates.clear();
	}

	// copy paste
	let value = '';
	$: {
		strGear = parseGearMeta(value);
	}
	$: invalid = value.trim().length > 0 && !strGear;

	// upload files
	let files: File[] = [];
	let fileStates: Map<string, 'complete' | 'error'> = new Map();

	function getInvalid(file: File, states: Map<string, 'complete' | 'error'>) {
		return states.get(file.name) === 'error';
	}

	function getFileStatus(file: File, states: Map<string, 'complete' | 'error'>) {
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

<div class="upload">
	{#if files.length === 0}
		<TextArea
			labelText="아이템 정보"
			placeholder="아이템 정보를 붙여넣기해 주세요."
			helperText={strGear?.gear.name}
			{invalid}
			invalidText="잘못된 값입니다."
			bind:value
		/>
	{/if}
	<div>
		<p class:bx--label-description={true}>
			{files.length === 0 ? '또는 파일 업로드' : '파일 업로드'}
		</p>
		<FileUploaderButton
			labelText="파일 선택"
			accept={['.sim']}
			multiple
			bind:files
			on:change={(e) => {
				if (fileSlots.size > 0) {
					fileSlots.clear();
				}
				for (const file of e.detail) {
					file
						.text()
						.then((value) => {
							const slot = gearMetaFromEncodedURIComponent(value);
							console.log(slot);
							if (slot) {
								fileSlots.set(file.name, slot);
								fileSlots = fileSlots;
								fileStates.set(file.name, 'complete');
								fileStates = fileStates;
							} else {
								fileStates.set(file.name, 'error');
								fileStates = fileStates;
							}
						})
						.catch();
				}
			}}
		/>
		<div class:bx--file-container={true}>
			{#each files as file, i}
				<FileUploaderItem
					name={file.name}
					invalid={getInvalid(file, fileStates)}
					status={getFileStatus(file, fileStates)}
					on:delete={() => (files = files.filter((_, index) => index !== i))}
				/>
			{/each}
		</div>
	</div>
</div>

<style>
	.upload {
		display: flex;
		flex-direction: column;
		gap: var(--cds-spacing-05);
	}
</style>
