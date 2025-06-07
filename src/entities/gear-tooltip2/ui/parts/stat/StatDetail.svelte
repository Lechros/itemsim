<script lang="ts">
	import TemplateText from '../TemplateText.svelte';

	let {
		rate = false,
		base,
		add,
		upgrade,
		starforce
	}: {
		rate?: boolean;
		base: number;
		add: number;
		upgrade: number;
		starforce: number;
	} = $props();

	const r = rate ? '%' : '';

	function getHtmlString(base: number, add: number, upgrade: number, starforce: number) {
		let str = `(${base}`;
		if (starforce !== 0) {
			str += ` #$s+${starforce}${r}#`;
		}
		if (upgrade > 0) {
			str += ` #$u+${upgrade}${r}#`;
		} else if (upgrade < 0) {
			str += ` #$r${upgrade}${r}#`;
		}
		if (add !== 0) {
			str += ` #$b+${add}${r}#`;
		}
		str += ')';
		return str;
	}
</script>

<TemplateText raw={getHtmlString(base, add, upgrade, starforce)} />
