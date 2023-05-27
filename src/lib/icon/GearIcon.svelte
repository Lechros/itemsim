<script lang="ts">
	import FetchedOriginIcon from './FetchedOriginIcon.svelte';

	export let iconId: number;

	export const API_BASEURL = 'https://api.itemsim.com';
</script>

<FetchedOriginIcon
	src="{API_BASEURL}/gears/{iconId}/icon"
	originSrc="{API_BASEURL}/gears/{iconId}/icon/origin"
	{...$$restProps}
/>
