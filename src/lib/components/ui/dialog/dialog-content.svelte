<script lang="ts">
	import { cn, type WithoutChildrenOrChild } from '$lib/utils';
	import XIcon from '@lucide/svelte/icons/x';
	import { Dialog as DialogPrimitive } from 'bits-ui';
	import type { Snippet } from 'svelte';
	import * as Dialog from './index.js';

	let {
		ref = $bindable(null),
		class: className,
		portalProps,
		children,
		...restProps
	}: WithoutChildrenOrChild<DialogPrimitive.ContentProps> & {
		portalProps?: DialogPrimitive.PortalProps;
		children: Snippet;
	} = $props();
</script>

<Dialog.Portal {...portalProps}>
	<Dialog.Overlay />
	<div
		data-slot="dialog-content-wrapper"
		class="pointer-events-none fixed inset-0 z-50 flex min-h-full flex-col items-center overflow-y-auto p-4 *:pointer-events-auto"
	>
		<DialogPrimitive.Content
			bind:ref
			data-slot="dialog-content"
			class={cn(
				'bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 my-auto grid w-full max-w-full gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg',
				className
			)}
			{...restProps}
		>
			{@render children?.()}
			<DialogPrimitive.Close
				class="ring-offset-background focus:ring-ring absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
			>
				<XIcon />
				<span class="sr-only">Close</span>
			</DialogPrimitive.Close>
		</DialogPrimitive.Content>
	</div>
</Dialog.Portal>
