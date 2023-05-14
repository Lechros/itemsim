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

<Header company="메이플스토리" platformName="아이템 시뮬레이터">
	<svelte:fragment slot="skip-to-content">
		<SkipToContent />
	</svelte:fragment>
	<HeaderUtilities>
		<HeaderGlobalAction icon={BrightnessContrast} on:click={toggle} />
		<HeaderActionLink icon={LogoDiscord} target="_blank" href="https://discord.gg/Kzzn8zuj2p" />
	</HeaderUtilities>
</Header>

<div>
	<slot />
</div>

<style>
	div {
		padding-top: var(--cds-spacing-09);
	}
</style>
