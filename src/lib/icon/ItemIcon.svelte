<script lang="ts">
	import FetchedOriginIcon from './FetchedOriginIcon.svelte';

	export let iconId: number;

	export const API_BASEURL = 'https://api.itemsim.com';
	export const IMAGE_BASEURL = 'https://image.itemsim.com';
</script>

<FetchedOriginIcon
	src="{IMAGE_BASEURL}/items/iconRaw/{iconId}.png"
	originSrc="{API_BASEURL}/items/{iconId}/iconRaw/origin"
	{...$$restProps}
/>
