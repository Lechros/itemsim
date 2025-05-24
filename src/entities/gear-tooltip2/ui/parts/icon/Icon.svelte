<script lang="ts">
	import { GearIcon } from '$lib/entities/gear-icon';
	import { UIImage2 } from '$lib/shared/ui';

	let { icon }: { icon: string } = $props();
</script>

<div class="relative">
	<UIImage2 image="iconBase">
		<div class="flex h-20 w-20 items-center justify-center">
			<GearIcon {icon} scale={2} />
		</div>
	</UIImage2>
</div>
