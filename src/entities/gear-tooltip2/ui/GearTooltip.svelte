<script lang="ts">
	import { ReadonlyGear } from '@malib/gear';
	import Frame from './parts/Frame.svelte';

	let {
		gear,
		cannot = {},
		incline
	}: {
		gear: ReadonlyGear;
		cannot?: {
			level?: boolean;
			job?: boolean;
		};
		incline: { equipped: true } | { combat: number };
	} = $props();
</script>

<Frame></Frame>
