<script lang="ts">
	import { Button } from '$lib/components/ui/button';

	let {
		handleSubmit,
		disabledSubmit = false
	}: {
		handleSubmit: () => Promise<void>;
		disabledSubmit?: boolean;
	} = $props();
</script>

<div class="flex justify-end gap-2">
	<Button variant="outline" class="flex-1/3 sm:flex-none" href="/">돌아가기</Button>
	<Button class="flex-2/3 sm:flex-none" disabled={disabledSubmit} onclick={handleSubmit}>
		아이템 추가
	</Button>
</div>
