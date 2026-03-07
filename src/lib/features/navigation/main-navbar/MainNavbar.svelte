<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Settings } from 'lucide-svelte';
	import DarkModeButton from './DarkModeButton.svelte';
	import DiscordIcon from './DiscordIcon.svelte';
	import Logo from './logo.png';
</script>

<header class="bg-background sticky top-0 z-50 h-14 w-full border-b">
	<div class="mx-auto flex h-full w-full px-2">
		<div class="flex items-center gap-2">
			<Button variant="ghost" href="/">
				<div class="flex size-5 items-center justify-center">
					<img src={Logo} alt="logo" class="size-8" />
				</div>

				아이템 시뮬레이터
			</Button>
		</div>
		<div class="ml-auto flex items-center gap-1 px-4">
			<Button
				variant="ghost"
				size="icon"
				href="https://discord.gg/Kzzn8zuj2p"
				target="_blank"
				rel="noopener noreferrer"
				title="공식 디스코드"
				class="hover:text-[#5865F2]"
			>
				<DiscordIcon class="size-4" />
			</Button>
			<DarkModeButton />
			<Button variant="ghost" size="icon" href="/settings" title="설정">
				<Settings />
				<span class="sr-only">설정</span>
			</Button>
		</div>
	</div>
</header>

<style>
	img {
		max-width: none;
		pointer-events: none;
	}
</style>
