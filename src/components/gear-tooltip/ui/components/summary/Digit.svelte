<script lang="ts">
	import { UIImage } from '$lib/shared/ui';

	let {
		digit,
		variant,
		allowGap = false
	}: {
		digit: string;
		variant: 'Disabled' | 'Can' | 'Cannot' | 'Yellow' | 'Lookahead';
		allowGap?: boolean;
	} = $props();
</script>

<UIImage
	image={`number${variant}${digit}` as 'numberCan0'}
	style={digit === '1' && allowGap ? 'margin-left: 1px' : undefined}
/>
