<script lang="ts">
	import { tooltip2Images } from '$lib/shared/assets';
	import type { Snippet } from 'svelte';
	import type { ClassValue } from 'svelte/elements';

	let {
		image,
		children,
		class: className,
		style,
		tag = 'div'
	}: {
		image: keyof typeof tooltip2Images;
		children?: Snippet;
		class?: ClassValue;
		style?: string;
		tag?: string;
	} = $props();
</script>

{#if children}
	<svelte:element
		this={tag}
		class={[image, className]}
		style="background-image: url({tooltip2Images[image]}); {style}"
	>
		{@render children()}
	</svelte:element>
{:else}
	<svelte:element
		this={tag}
		class={[image, className]}
		style="background-image: url({tooltip2Images[image]}); {style}"
	/>
{/if}

<style>
	div {
		background-image: var(--url);
	}
	.frameTop {
		width: 324px;
		height: 30px;
	}
	.frameMid {
		width: 324px;
		height: 1px;
	}
	.frameLine {
		width: 324px;
		height: 3px;
	}
	.frameBottom {
		width: 324px;
		height: 12px;
	}

	.star {
		width: 11px;
		height: 10px;
	}

	.blueStar {
		width: 11px;
		height: 10px;
	}

	.emptyStar {
		width: 11px;
		height: 10px;
	}

	.particleStar {
		width: 325px;
		height: 50px;
		background-repeat: no-repeat;
		animation: particleStar 720ms steps(6) infinite;
	}

	.iconBase {
		width: 82px;
		height: 82px;
	}

	.iconShade {
		width: 82px;
		height: 82px;
	}

	@keyframes particleStar {
		from {
			background-position: 0 0;
		}
		to {
			background-position: -1950px 0;
		}
	}
</style>
