<script lang="ts">
	import { Button } from '$lib/shared/shadcn/components/ui/button';
	import { MoonIcon, SunIcon } from 'lucide-svelte';
	import Logo from './logo.png';
	import { toggleMode } from 'mode-watcher';
</script>

<header class="bg-background sticky top-0 z-50 h-14 w-full">
	<div class="mx-auto flex h-full w-full px-2">
		<div class="flex items-center gap-2">
			<Button variant="ghost" href="/">
				<img src={Logo} alt="logo" class="size-5" />
				<span class="font-semibold"> 아이템 시뮬레이터 </span>
			</Button>
		</div>
		<div class="ml-auto flex items-center px-4">
			<Button onclick={toggleMode} variant="ghost" size="icon">
				<SunIcon
					class="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"
				/>
				<MoonIcon
					class="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"
				/>
				<span class="sr-only">Toggle theme</span>
			</Button>
		</div>
	</div>
</header>
