<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Gear } from '@malib/gear';
	import FormControl from '../../../form/FormControl.svelte';
	import FormItem from '../../../form/FormItem.svelte';
	import FormLabel from '../../../form/FormLabel.svelte';
	import FormSection from '../../../form/FormSection.svelte';

	let { gear }: { gear: Gear } = $props();
</script>

<FormSection>
	<FormItem>
		<FormLabel title="실패 횟수 설정" />
		<FormControl>
			<Button
				variant="outline"
				size="sm"
				disabled={!gear.canApplyResileScroll}
				onclick={() => gear.applyResileScroll()}
			>
				주문서 복구
			</Button>
			<Button
				variant="danger"
				size="sm"
				disabled={!gear.canApplyScrollFail}
				onclick={() => gear.applyScrollFail()}
			>
				주문서 실패
			</Button>
		</FormControl>
	</FormItem>
</FormSection>
