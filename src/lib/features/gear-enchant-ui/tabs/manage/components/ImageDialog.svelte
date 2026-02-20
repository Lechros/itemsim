<script lang="ts">
	import { buttonVariants } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { ReadonlyGear } from '@malib/gear';
	import { ImageIcon } from 'lucide-svelte';
	import ImageDialogContent from './ImageDialogContent.svelte';

	let { gear }: { gear: ReadonlyGear } = $props();

	let open = $state(false);
</script>

<Dialog.Root bind:open>
	<Dialog.Trigger class={buttonVariants({ variant: 'outline', size: 'sm' })}>
		<ImageIcon />
		열기
	</Dialog.Trigger>
	<Dialog.Content class="w-fit">
		<ImageDialogContent {gear} />
	</Dialog.Content>
</Dialog.Root>
