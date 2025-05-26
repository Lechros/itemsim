<script lang="ts">
	import { getItemRawIconOrigin, getItemRawIconUrl } from '$lib/shared/api';
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
			origin = await getItemRawIconOrigin(icon);
		})();
	});
</script>

<OriginIcon src={getItemRawIconUrl(icon)} alt={icon} {origin} {scale} />
