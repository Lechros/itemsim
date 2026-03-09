<script lang="ts">
	import { GearIcon } from '$lib/components/icons';
	import { UIImage2 } from '$lib/components/ui-image';

	let { icon }: { icon: string } = $props();
</script>

<div class="relative">
	<UIImage2 image="iconBase">
		<UIImage2 image="iconShade">
			<div class="flex h-20 w-20 items-center justify-center">
				<GearIcon {icon} scale={2} />
			</div>
		</UIImage2>
	</UIImage2>
</div>
