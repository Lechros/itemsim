<script lang="ts">
	import OriginIcon from "./OriginIcon.svelte";

	export let iconId: number;

    export let alt: string;

    export const API_BASEURL = "https://api.itemsim.com/";

	let origin: [number, number];
	fetch(API_BASEURL + `gears/${iconId}/icon/origin`)
		.then((value) => value.json())
		.then(o => origin = o)
        .catch((e) => console.log(e));
</script>

<OriginIcon src="{API_BASEURL}gears/{iconId}/icon" {alt} origin={origin} {...$$restProps} />