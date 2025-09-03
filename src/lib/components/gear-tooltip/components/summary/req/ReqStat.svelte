<script lang="ts">
	import Digit from '../Digit.svelte';
	import UIImage from '../../UIImage.svelte';

	let {
		type,
		value,
		can
	}: {
		type: 'str' | 'dex' | 'int' | 'luk';
		value: number;
		can: boolean;
	} = $props();

	const typePascalCase = $derived(getTypePascalCase(type));
	const variant: 'Disabled' | 'Can' | 'Cannot' = $derived(getVariant(value, can));
	const digits = $derived(value.toString().padStart(3, '0'));

	function getVariant(value: number, can: boolean) {
		if (value === 0) {
			return 'Disabled';
		}
		return can ? 'Can' : 'Cannot';
	}

	function getTypePascalCase(type: 'str' | 'dex' | 'int' | 'luk') {
		switch (type) {
			case 'str':
				return 'Str';
			case 'dex':
				return 'Dex';
			case 'int':
				return 'Int';
			case 'luk':
				return 'Luk';
			default:
				throw new Error(`Invalid type: ${type}`);
		}
	}
</script>

<div class="flex items-start gap-px">
	<UIImage image={`number${variant}Req${typePascalCase}` as 'numberCanReqStr'} class="mr-[3px]" />
	{#each digits.split('') as digit}
		<Digit {digit} {variant} />
	{/each}
</div>
