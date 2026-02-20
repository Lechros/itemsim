<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { buttonVariants } from '$lib/components/ui/button';
	import { toast } from 'svelte-sonner';
	import type { Deleter } from '../model/Selector.svelte.js';
Selector
	let {
		deleter,
		postDeleteSelector{
		deleter: Deleter;
		postDelete?: () => void;
	} = $props();

	let open = $state(false);

	function handleDelete() {
		deleter
			.deleteAll()
			.then((count) => {
				toast.success(`아이템 ${count}개가 삭제되었어요.`, {
					position: 'top-center'
				});
				postDelete?.();
			})
			.catch((e) => {
				toast.error('아이템 삭제에 실패했어요.', {
					description: e instanceof Error ? e.message : String(e),
					position: 'top-center'
				});
			})
			.finally(() => {
				open = false;
			});
	}
</script>

<AlertDialog.Root bind:open>
	<AlertDialog.Trigger class={buttonVariants({ variant: 'destructive' })} disabled={deleter.isEmpty}>
		삭제하기
	</AlertDialog.Trigger>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>아이템 {deleter.count}개 삭제하기</AlertDialog.Title>
			<AlertDialog.Description>삭제한 아이템은 복구할 수 없어요.</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>취소</AlertDialog.Cancel>
			<AlertDialog.Action onclick={handleDelete}>삭제하기</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
