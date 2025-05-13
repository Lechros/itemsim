<script lang="ts">
	import { getGearIconOrigin, getGearIconUrl } from '$lib/shared/api';
	import { OriginIcon, UIImage2 } from '$lib/shared/ui';

	let { icon, newBonus }: { icon: string; newBonus?: boolean } = $props();

	let origin = $state<[number, number]>();

	$effect(() => {
		getGearIconOrigin(icon).then((data) => (origin = data));
	});
</script>

<div class="relative">
	<UIImage2 image="iconBase">
		<div class="flex h-20 w-20 items-center justify-center">
			<OriginIcon src={getGearIconUrl(icon)} alt="아이콘" {origin} scale={2} />
		</div>
	</UIImage2>
</div>
