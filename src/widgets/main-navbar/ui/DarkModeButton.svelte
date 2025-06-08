<script>
	import { Button } from '$lib/shared/shadcn/components/ui/button';
	import { cn } from '$lib/shared/shadcn/utils';
	import { MoonIcon, SunIcon } from 'lucide-svelte';
	import { toggleMode, mode } from 'mode-watcher';

	const dark = $derived(mode.current === 'dark');
</script>

<Button onclick={toggleMode} variant="ghost" size="icon">
	<SunIcon
		class={cn(
			'h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all',
			dark && 'scale-0 -rotate-90'
		)}
	/>
	<MoonIcon
		class={cn(
			'absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all',
			dark && 'scale-100 rotate-0'
		)}
	/>
	<span class="sr-only">Toggle theme</span>
</Button>
