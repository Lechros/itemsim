<script lang="ts">
	import {
		Header,
		HeaderActionLink,
		HeaderGlobalAction,
		HeaderUtilities,
		SkipToContent
	} from 'carbon-components-svelte';
	import 'carbon-components-svelte/css/all.css';
	import { BrightnessContrast, LogoDiscord } from 'carbon-icons-svelte';
	import '../app.css';

	function toggle() {
		const theme = document.documentElement.getAttribute('theme');
		if (theme === 'g10') {
			setTheme('g80');
		} else {
			setTheme('g10');
		}
	}

	function setTheme(theme: 'g10' | 'g80') {
		document.documentElement.setAttribute('theme', theme);
		localStorage.setItem('theme', theme);
	}

	let isBannerClosed = false;
</script>

<svelte:head>
	<script lang="js">
		if (typeof window !== 'undefined' && typeof document !== 'undefined') {
			const theme = window.localStorage.getItem('theme');
			if (theme !== null) {
				document.documentElement.setAttribute('theme', theme);
			} else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
				document.documentElement.setAttribute('theme', 'g80');
			} else {
				document.documentElement.setAttribute('theme', 'g10');
			}
		}
	</script>
</svelte:head>

<header class="next-banner" class:hidden={isBannerClosed}>
	<div class="next-banner-text">
		<span>🚀 새로운 아이템 시뮬레이터를 사용해보세요!</span>
		<a href="https://next.itemsim.com/">https://next.itemsim.com/</a>
	</div>
	<button class="next-banner-close" on:click={() => isBannerClosed = true}>
        <svg class="close-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
		  </svg>
	</button>
</header>

<Header company="메이플스토리" platformName="아이템 시뮬레이터">
	<svelte:fragment slot="skip-to-content">
		<SkipToContent />
	</svelte:fragment>
	<HeaderUtilities>
		<HeaderGlobalAction icon={BrightnessContrast} on:click={toggle} />
		<HeaderActionLink icon={LogoDiscord} target="_blank" href="https://discord.gg/Kzzn8zuj2p" />
	</HeaderUtilities>
</Header>

<div class="wrapper">
	<slot />
</div>

<style>
	.wrapper {
		padding-top: var(--cds-spacing-09);
	}

	:global(.bx--header) {
		position: sticky;
	}

	.next-banner {
		position: sticky;
		top: 0;
		height: 40px;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 16px;
		background: linear-gradient(to right, #10b981, #84cc16);
		color: #ffffff;
		font-family: sans-serif;
	}

	.next-banner a {
		color: #ffffff;
		font-weight: 600;
		transition: opacity 0.2s ease;
	}

	.next-banner a:hover {
		opacity: 0.8;
	}

	.next-banner-close {
		all: unset;
		position: absolute;
		right: 8px;
		height: 24px;
		width: 24px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 8px;
		padding: 0;
		background: transparent;
		border: none;
		color: white;
		transition: background-color 0.2s ease;
		cursor: pointer;
	}

	.next-banner-close:hover {
		background-color: rgba(255, 255, 255, 0.2);
	}

	.next-banner-close svg {
		width: 16px;
		height: 16px;
	}

	@media (max-width: 30rem) {
		.next-banner {
			height: 48px;
		}
	}

	.next-banner-text {
		text-align: center;
		display: flex;
		gap: 8px;
	}

	.hidden {
		display: none;
	}
</style>
