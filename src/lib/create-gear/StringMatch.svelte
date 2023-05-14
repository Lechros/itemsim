<script lang="ts">
	export let str: string;
	export let search: string;

	const cls = 'string-match--highlight';
	const openTag = `<span class="${cls}">`;
	const closeTag = '</span>';

	function build(str: string, search: string) {
		let res = '';
		let open = false;
		for (let i = 0, j = 0; i < str.length; i++) {
			if (str[i] === search[j]) {
				if (!open) {
					open = true;
					res += openTag;
				}
				j++;
			} else {
				if (open) {
					open = false;
					res += closeTag;
				}
			}
			res += str[i];
		}
		if (open) {
			res += closeTag;
		}
		return res;
	}
</script>

<div>
	{@html build(str, search)}
</div>
