<script lang="ts">
	import { GearEnchantPage } from '$lib/pages/gear-enchant';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<GearEnchantPage seq={Number(data.seq)} initialTab={data.initialTab} />
