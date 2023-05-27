<script lang="ts">
	import FetchedOriginIcon from './FetchedOriginIcon.svelte';

	export let iconId: number;

	export const API_BASEURL = 'https://api.itemsim.com';
</script>

<FetchedOriginIcon
	src="{API_BASEURL}/items/{iconId}/iconRaw"
	originSrc="{API_BASEURL}/items/{iconId}/iconRaw/origin"
	{...$$restProps}
/>
