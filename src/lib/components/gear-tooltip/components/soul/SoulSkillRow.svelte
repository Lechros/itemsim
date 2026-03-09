<script lang="ts">
	let { skill }: { skill?: string } = $props();
</script>

{#if skill}
	<div class="gt--soul gt--orange3">소울 충전 시 '{skill}' 사용가능</div>
{:else}
	<div class="gt--soul gt--gray">소울 충전 시 '---' 사용가능</div>
{/if}
