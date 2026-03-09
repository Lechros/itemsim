<script lang="ts">
	let { superior }: { superior: boolean } = $props();
</script>

{#if superior}
	<div class="gt--detail gt--green">아이템 강화 성공시 더욱 높은 효과를 받을 수 있습니다.</div>
{/if}
