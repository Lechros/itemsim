<script lang="ts">
	import {
		Header,
		HeaderActionLink,
		HeaderGlobalAction,
		HeaderUtilities,
		SkipToContent
	} from 'carbon-components-svelte';
	import { BrightnessContrast, LogoDiscord } from 'carbon-icons-svelte';
	import { onMount } from 'svelte';

	/* theme */
	onMount(() => {
		if (typeof window !== 'undefined' && typeof document !== 'undefined') {
			if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
				document.documentElement.setAttribute('theme', 'g80');
			} else {
				document.documentElement.setAttribute('theme', 'g10');
			}
		}
	});

	function toggle() {
		const theme = document.documentElement.getAttribute('theme');
		if (theme === 'g10') {
			document.documentElement.setAttribute('theme', 'g80');
		} else {
			document.documentElement.setAttribute('theme', 'g10');
		}
	}
</script>

<Header company="메이플스토리" platformName="아이템 시뮬레이터">
	<svelte:fragment slot="skip-to-content">
		<SkipToContent />
	</svelte:fragment>
	<HeaderUtilities>
		<HeaderGlobalAction icon={BrightnessContrast} on:click={toggle} />
		<HeaderActionLink icon={LogoDiscord} target="_blank" href="https://discord.gg/Kzzn8zuj2p" />
	</HeaderUtilities>
</Header>

<slot />
