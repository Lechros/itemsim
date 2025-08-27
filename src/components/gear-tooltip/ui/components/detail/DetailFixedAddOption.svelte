<script lang="ts">
	let { fixedAddOption }: { fixedAddOption: boolean } = $props();
</script>

{#if fixedAddOption}
	<div class="gt--detail gt--white">추가옵션 재설정 불가</div>
{/if}
