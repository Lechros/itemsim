<script lang="ts">
	import { ItemRawIcon } from '$lib/components/icons';
	import { Button } from '$lib/components/ui/button';
	import { BalancedGrid } from '$lib/features/gear-enchant-ui/balanced-grid';
	import { getGearOptionGroupedStrings } from '$lib/utils';
	import { Gear } from '@malib/gear';
	import FormControl from '../../form/FormControl.svelte';
	import FormItem from '../../form/FormItem.svelte';
	import FormLabel from '../../form/FormLabel.svelte';
	import FormSection from '../../form/FormSection.svelte';
	import { getExceptionalHammer } from './model/exceptional';

	let { gear }: { gear: Gear } = $props();

	const exceptionalHammer = $derived(getExceptionalHammer(gear));
</script>

{#if exceptionalHammer}
	{@const optionStrings = getGearOptionGroupedStrings(exceptionalHammer.option)}
	<FormSection>
		<div class="flex flex-col gap-5">
			<!-- Title -->
			<div class="flex h-9 items-center gap-2">
				{#if exceptionalHammer.icon}
					<ItemRawIcon icon={exceptionalHammer.icon} />
				{/if}
				<div class="text-sm font-medium">{exceptionalHammer.name}</div>
			</div>

			<BalancedGrid
				items={optionStrings}
				size={6}
				class="gap-x-8 gap-y-0.5"
				classes={{ column: 'gap-y-0.5' }}
			>
				{#snippet itemRenderer(strings: [string, string])}
					<div class="text-sm">
						<span>{strings[0]}</span>
						<span class="font-semibold">{strings[1]}</span>
					</div>
				{/snippet}
			</BalancedGrid>

			<div class="flex flex-col justify-end gap-2 sm:flex-row">
				<Button
					size="sm"
					onclick={() => gear.applyExceptional(exceptionalHammer)}
					disabled={!gear.canApplyExceptional}
				>
					{exceptionalHammer.name} 사용하기
				</Button>
				<Button
					variant="outline"
					size="sm"
					onclick={() => {
						const count = gear.exceptionalUpgradeableCount;
						for (let i = 0; i < count; i++) {
							gear.applyExceptional(exceptionalHammer);
						}
					}}
					disabled={!gear.canApplyExceptional}
				>
					{gear.exceptionalUpgradeableCount}회 사용
				</Button>
			</div>
		</div>
	</FormSection>
{:else}
	<FormSection class="bg-muted/40">
		<FormItem>
			<p class="text-muted-foreground text-sm font-medium">
				사용할 수 있는 익셉셔널 해머가 없어요.
			</p>
		</FormItem>
	</FormSection>
{/if}

<FormSection>
	<FormItem>
		<FormLabel title="익셉셔널 강화 초기화" />
		<FormControl>
			<Button
				variant="destructive"
				size="sm"
				onclick={() => gear.resetExceptional()}
				disabled={!gear.canResetExceptional}
			>
				초기화
			</Button>
		</FormControl>
	</FormItem>
</FormSection>
