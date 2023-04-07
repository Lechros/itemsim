<script lang="ts">
	import { Gear, validateParseGear } from '@malib/gear';
	import { FileUploader, TextArea } from 'carbon-components-svelte';
	import lzs from 'lz-string';

	export let strGear: Gear | null;

	export let fileGears: Map<string, Gear>;
	fileGears = new Map();

	export function reset() {
		value = '';
		uploader.clearFiles();
	}

	export function loadFiles() {
		const reader = new FileReader();
		let proms = files.map((file) => file.text().then());
		Promise.all(proms);
	}

	let uploader: FileUploader;
	let complete = false;
	let value = '';
	let files: File[] = [];

	$: {
		strGear = validateParseGear(lzs.decompressFromBase64(value));
	}
	$: invalid = value.trim().length > 0 && !strGear;
</script>

<div class="upload">
	{#if files.length === 0}
		<TextArea
			labelText="아이템 정보"
			placeholder="아이템 정보를 붙여넣기해 주세요."
			helperText={strGear?.name}
			{invalid}
			invalidText="잘못된 값입니다."
			bind:value
		/>
	{/if}
	<FileUploader
		labelDescription={files.length === 0 ? '또는 파일 업로드' : '파일 업로드'}
		buttonLabel="파일 선택"
		accept={['.sim']}
		status={complete ? 'complete' : 'uploading'}
		bind:files
		on:change={(e) => {
			if (fileGears.size > 0) {
				fileGears.clear();
			}
			complete = false;
			const file = e.detail[0];
			file
				.text()
				.then((value) => {
					const gear = validateParseGear(lzs.decompressFromEncodedURIComponent(value));
					if (gear) {
						fileGears.set(file.name, gear);
						fileGears = fileGears;
						complete = true;
					}
				})
				.catch();
		}}
		bind:this={uploader}
	/>
</div>

<style>
	.upload {
		display: flex;
		flex-direction: column;
		gap: var(--cds-spacing-05);
	}
</style>
