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
		<FormLabel title="주문서 강화 초기화" />
		<FormControl>
			<Button
				variant="destructive"
				size="sm"
				disabled={!gear.canResetUpgrade ||
					gear.scrollUpgradeableCount === gear.scrollTotalUpgradeableCount}
				onclick={() => gear.resetUpgrade()}
			>
				초기화
			</Button>
		</FormControl>
	</FormItem>
</FormSection>
