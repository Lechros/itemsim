<script lang="ts">
	let { cannotAdditionalPotential }: { cannotAdditionalPotential: boolean } = $props();
</script>

{#if cannotAdditionalPotential}
	<div class="gt--detail gt--white">에디셔널 잠재능력 설정 불가</div>
{/if}
