<script lang="ts">
	import {
		AlertDialog,
		AlertDialogAction,
		AlertDialogCancel,
		AlertDialogContent,
		AlertDialogDescription,
		AlertDialogFooter,
		AlertDialogHeader,
		AlertDialogTitle,
		AlertDialogTrigger
	} from '$lib/shared/shadcn/components/ui/alert-dialog';
	import { buttonVariants } from '$lib/shared/shadcn/components/ui/button';
	import { toast } from 'svelte-sonner';
	import type { Deleter } from '../model/Deleter.svelte.js';

	let {
		deleter,
		postDelete
	}: {
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

<AlertDialog bind:open>
	<AlertDialogTrigger class={buttonVariants({ variant: 'destructive' })} disabled={deleter.isEmpty}>
		아이템 삭제
	</AlertDialogTrigger>
	<AlertDialogContent>
		<AlertDialogHeader>
			<AlertDialogTitle>아이템 {deleter.count}개 삭제하기</AlertDialogTitle>
			<AlertDialogDescription>삭제한 아이템은 복구할 수 없어요.</AlertDialogDescription>
		</AlertDialogHeader>
		<AlertDialogFooter>
			<AlertDialogCancel>취소</AlertDialogCancel>
			<AlertDialogAction onclick={handleDelete}>삭제하기</AlertDialogAction>
		</AlertDialogFooter>
	</AlertDialogContent>
</AlertDialog>
