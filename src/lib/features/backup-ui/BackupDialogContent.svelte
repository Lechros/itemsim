<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Item from '$lib/components/ui/item';
	import { Label } from '$lib/components/ui/label';
	import { Spinner } from '$lib/components/ui/spinner';
	import { Switch } from '$lib/components/ui/switch';
	import { createGearCountLiveQuery } from '$lib/features/gear-inventory/header';
	import { backupInventory, restoreInventory } from '$lib/gear/export-helper';
	import { buildDownloadFilename } from '$lib/utils';
	import { parseExportPayload } from '$lib/gear/export/parse';
	import type { ExportPayload } from '$lib/gear/export/types';
	import { DownloadIcon, FolderDownIcon, FolderUpIcon, UploadIcon } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';

	let {
		open = $bindable(false)
	}: {
		open: boolean;
	} = $props();

	let downloadRef = $state<HTMLAnchorElement | null>(null);
	let fileInputRef = $state<HTMLInputElement | null>(null);

	let isBackuping = $state(false);
	let downloadPayload = $state<Uint8Array<ArrayBuffer> | null>(null);
	let downloadBlobUrl = $state<string | null>(null);
	let downloadFilename = $state<string | null>(null);
	let downloadCount = $state(0);

	function setDownloadResult(payload: Uint8Array<ArrayBuffer> | null, filename: string | null, count: number) {
		if (downloadBlobUrl) {
			URL.revokeObjectURL(downloadBlobUrl);
			downloadBlobUrl = null;
		}
		downloadPayload = payload;
		downloadFilename = filename;
		downloadCount = count;
		if (payload) {
			downloadBlobUrl = URL.createObjectURL(new Blob([payload], { type: 'application/octet-stream' }));
		}
	}

	let overwrite = $state(false);
	let restoreFilename = $state<string | null>(null);
	let restorePayload = $state.raw<ExportPayload | null>(null);
	let isRestoring = $state(false);
	let restoreAlertOpen = $state(false);

	const gearCountQuery = createGearCountLiveQuery();
</script>

<!-- Backup Dialog -->
<Dialog.Root
	bind:open
	onOpenChangeComplete={(open) => {
		if (!open) {
			setDownloadResult(null, null, 0);
			overwrite = false;
			restoreFilename = null;
			restorePayload = null;
			restoreAlertOpen = false;
		}
	}}
>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>아이템 백업</Dialog.Title>
			<Dialog.Description>인벤토리의 모든 아이템을 백업하거나 복구할 수 있어요.</Dialog.Description>
		</Dialog.Header>

		<Item.Root variant="outline">
			<Item.Content>
				<Item.Title>백업</Item.Title>
				<Item.Description>인벤토리의 모든 아이템을 백업 파일로 만들고 다운로드해요.</Item.Description>
				<div class="mt-2 flex flex-col gap-4">
					{#if downloadPayload && downloadFilename}
						<Item.Root variant="muted">
							<Item.Media>
								<FolderDownIcon/>
							</Item.Media>
							<Item.Content>
								<Item.Title>{downloadFilename}</Item.Title>
								<Item.Description>
									아이템 {downloadCount}개
								</Item.Description>
							</Item.Content>
							<Item.Actions>
								<Button variant="outline" onclick={() => downloadRef?.click()}>
									<DownloadIcon />
									다운로드
								</Button>
							</Item.Actions>
						</Item.Root>
					{/if}
					<Button
						onclick={async () => {
							isBackuping = true;
							try {
								const payload = await backupInventory();
								const count = gearCountQuery.value ?? 0;
								const filename = await buildDownloadFilename(payload, 'simbackup');
								setDownloadResult(payload, filename, count);
								toast.success('백업 파일 생성을 완료했어요.', {
									position: 'top-center',
									duration: 2000
								});
							} catch (error) {
								toast.error('백업 파일 생성에 실패했어요.', {
									description: error instanceof Error ? error.message : String(error),
									position: 'top-center',
									duration: 2000
								});
							} finally {
								isBackuping = false;
							}
						}}
					>
						{#if isBackuping}
							<Spinner />
						{/if}
						백업 파일 생성
					</Button>
				</div>
			</Item.Content>
		</Item.Root>

		<Item.Root variant="outline">
			<Item.Content>
				<Item.Title>복구</Item.Title>
				<Item.Description>백업 파일을 불러와 인벤토리에 추가해요.</Item.Description>
				<div class="mt-2 flex flex-col gap-4">
					{#if restorePayload && restoreFilename}
						<div class="flex items-center gap-2">
							<Switch id="import-overwrite" bind:checked={overwrite} />
							<Label for="import-overwrite">기존 아이템 모두 삭제하기</Label>
						</div>
						<Item.Root variant="muted">
							<Item.Media>
								<FolderUpIcon />
							</Item.Media>
							<Item.Content>
								<Item.Title>{restoreFilename}</Item.Title>
								<Item.Description>
									아이템 {restorePayload.items.length}개
								</Item.Description>
							</Item.Content>
							<Item.Actions>
								<AlertDialog.Root bind:open={restoreAlertOpen}>
									<AlertDialog.Trigger
										class={buttonVariants({ variant: overwrite ? 'destructive' : 'outline' })}
									>
										{overwrite ? '덮어쓰기' : '추가하기'}
									</AlertDialog.Trigger>
									<AlertDialog.Content>
										<AlertDialog.Header>
											<AlertDialog.Title>
												{overwrite
													? '모든 아이템을 삭제할까요?'
													: `아이템 ${restorePayload.items.length}개를 추가할까요?`}
											</AlertDialog.Title>
											{#if overwrite}
												<AlertDialog.Description>
													인벤토리의 모든 아이템이 삭제되고 백업 파일의 아이템으로 변경되어요. 이
													작업은 되돌릴 수 없어요.
												</AlertDialog.Description>
											{/if}
										</AlertDialog.Header>
										<AlertDialog.Footer>
											<AlertDialog.Cancel>취소</AlertDialog.Cancel>
											<AlertDialog.Action
												disabled={isRestoring}
												onclick={async () => {
													isRestoring = true;
													try {
														if (restorePayload) {
															await restoreInventory(restorePayload, overwrite);
															toast.success('백업 파일 불러오기가 완료되었어요.', {
																position: 'top-center'
															});
															restoreAlertOpen = false;
														}
													} catch (error) {
														toast.error('백업 파일 불러오기에 실패했어요.', {
															description: error instanceof Error ? error.message : String(error),
															position: 'top-center'
														});
													} finally {
														isRestoring = false;
													}
												}}
											>
												{#if isRestoring}
													<Spinner />
												{/if}
												{overwrite ? '삭제 후 추가' : '추가하기'}
											</AlertDialog.Action>
										</AlertDialog.Footer>
									</AlertDialog.Content>
								</AlertDialog.Root>
							</Item.Actions>
						</Item.Root>
					{/if}
					<Button variant="outline" onclick={() => fileInputRef?.click()}>
						<UploadIcon />
						백업 파일 불러오기
					</Button>
				</div>
			</Item.Content>
		</Item.Root>
		<Dialog.Footer>
			<Dialog.Close class={buttonVariants({ variant: 'outline' })}>닫기</Dialog.Close>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>

<a
	bind:this={downloadRef}
	href={downloadBlobUrl ?? undefined}
	download={downloadFilename ?? undefined}
	target="_blank"
	class="hidden"
	title="hidden download"
></a>
<input
	bind:this={fileInputRef}
	type="file"
	accept=".simbackup"
	class="hidden"
	onchange={async (event) => {
		const input = event.target as HTMLInputElement;
		const file = input.files?.[0];
		if (!file) return;

		try {
			const arrayBuffer = await file.arrayBuffer();
			const uint8 = new Uint8Array(arrayBuffer);
			restorePayload = parseExportPayload(uint8);
			restoreFilename = file.name;
		} catch (error) {
			restorePayload = null;
			restoreFilename = null;
			toast.error('백업 파일 불러오기에 실패했어요.', {
				description: error instanceof Error ? error.message : String(error),
				position: 'top-center'
			});
		} finally {
			input.value = '';
		}
	}}
/>
