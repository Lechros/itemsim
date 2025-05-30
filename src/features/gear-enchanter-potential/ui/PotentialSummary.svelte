<script lang="ts">
	import { PotentialGrade, type PotentialData } from '@malib/gear';
	import PotentialTitle from './PotentialTitle.svelte';

	let { potential }: { potential: PotentialData } = $props();
</script>

<div class="flex items-center gap-x-2">
	<PotentialTitle grade={Math.max(potential.grade, PotentialGrade.Rare)} />
	{potential.summary}
</div>
