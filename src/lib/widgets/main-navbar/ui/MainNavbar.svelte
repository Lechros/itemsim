<script lang="ts">
	import { Button } from '$lib/shared/shadcn/components/ui/button';
	import DarkModeButton from './DarkModeButton.svelte';
	import Logo from './logo.png';
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
			<DarkModeButton />
		</div>
	</div>
</header>
