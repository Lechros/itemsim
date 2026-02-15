<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import DarkModeButton from './DarkModeButton.svelte';
	import Logo from './logo.png';
	import { Settings } from 'lucide-svelte';
</script>

<header class="bg-background sticky top-0 z-50 h-14 w-full">
	<div class="mx-auto flex h-full w-full px-2">
		<div class="flex items-center gap-2">
			<Button variant="ghost" href="/">
				<img src={Logo} alt="logo" class="size-5" />
				<span class="font-semibold"> 아이템 시뮬레이터 </span>
			</Button>
		</div>
		<div class="ml-auto flex items-center gap-1 px-4">
			<DarkModeButton />
			<Button variant="ghost" size="icon" href="/settings" title="설정">
				<Settings />
				<span class="sr-only">설정</span>
			</Button>
		</div>
	</div>
</header>
