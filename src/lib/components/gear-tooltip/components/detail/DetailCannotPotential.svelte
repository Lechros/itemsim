<script lang="ts">
	let { cannotPotential }: { cannotPotential: boolean } = $props();
</script>

{#if cannotPotential}
	<div class="gt--detail gt--white">잠재능력 설정 불가</div>
{/if}
