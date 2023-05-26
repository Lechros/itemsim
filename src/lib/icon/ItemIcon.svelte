<script lang="ts">
	import OriginIcon from "./OriginIcon.svelte";

	export let itemId: number;

    export const API_BASEURL = "https://api.itemsim.com/";

	let origin: [number, number];
	fetch(API_BASEURL + `items/${itemId}/iconRaw/origin`)
		.then((value) => value.json())
		.then(o => origin = o)
        .catch((e) => console.log(e));
</script>

<OriginIcon src="{API_BASEURL}items/{itemId}/iconRaw" origin={origin} {...$$restProps} />