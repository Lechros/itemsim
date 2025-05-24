<script lang="ts">
	import { getGearIconOrigin, getGearIconUrl } from '$lib/shared/api';
	import { OriginIcon } from '$lib/shared/ui';

	let {
		icon,
		scale = 1
	}: {
		icon: string;
		scale?: number;
	} = $props();

	let origin = $state<[number, number] | undefined>(undefined);

	$effect(() => {
		(async () => {
			origin = await getGearIconOrigin(icon);
		})();
	});
</script>

<OriginIcon src={getGearIconUrl(icon)} alt={icon} {origin} {scale} />
