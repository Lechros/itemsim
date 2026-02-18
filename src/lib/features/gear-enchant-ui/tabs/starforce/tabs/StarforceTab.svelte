<script lang="ts">
	import * as Alert from '$lib/components/ui/alert';
	import { buttonVariants } from '$lib/components/ui/button';
	import * as InputGroup from '$lib/components/ui/input-group';
	import * as Select from '$lib/components/ui/select';
	import { Slider } from '$lib/components/ui/slider';
	import { Switch } from '$lib/components/ui/switch';
	import FormControl from '$lib/features/gear-enchant-ui/form/FormControl.svelte';
	import FormItem from '$lib/features/gear-enchant-ui/form/FormItem.svelte';
	import FormLabel from '$lib/features/gear-enchant-ui/form/FormLabel.svelte';
	import FormSection from '$lib/features/gear-enchant-ui/form/FormSection.svelte';
	import { Gear } from '@malib/gear';
	import { Tabs } from 'bits-ui';
	import { CircleAlert, Minus, Plus } from 'lucide-svelte';
	import {
		addStarforce,
		canAddStarforce,
		canRemoveStarforce,
		getImplicitMaxStar,
		removeStarforce,
		setStarforce
	} from '../model/starforce';

	let {
		gear,
		currentTab = $bindable(),
		ignoreMaxStar = $bindable()
	}: {
		gear: Gear;
		currentTab: string;
		ignoreMaxStar: boolean;
	} = $props();

	const canIgnoreMaxStar = $derived(gear.maxStar < 30);
	let implicitMaxStar = $derived(getImplicitMaxStar(gear, ignoreMaxStar));

	const PRESET_STEPS = [0, 17, 18, 21, 22, 23];

	function getPresets() {
		const presets = [];
		const maxStar = implicitMaxStar;
		for (const step of PRESET_STEPS) {
			if (step > maxStar) break;
			presets.push(step);
		}
		if (!presets.includes(maxStar)) {
			presets.push(maxStar);
		}
		return presets;
	}
</script>

{#if gear.starScroll}
	<FormSection class="border-b-0 px-5 pb-0">
		<FormItem>
			<Alert.Root>
				<CircleAlert />
				<Alert.Title>스타포스가 불가능한 상태에요.</Alert.Title>
				<Alert.Description>
					<p>
						스타포스를 적용하려면 <button
							class="text-foreground hover:text-accent-foreground cursor-pointer underline underline-offset-4 transition-colors"
							onclick={() => (currentTab = 'starScroll')}
						>
							장비 강화
						</button> 탭에서 놀라운 장비 강화를 초기화해주세요.
					</p>
				</Alert.Description>
			</Alert.Root>
		</FormItem>
	</FormSection>
{/if}

<FormSection class="gap-6">
	<FormItem>
		<FormLabel title="스타포스 단계 설정" disabled={gear.starScroll} />
		<FormControl>
			<InputGroup.Root class="sm:w-28">
				<InputGroup.Addon align="inline-start">
					<InputGroup.Button
						size="icon-xs"
						disabled={gear.starScroll || !canRemoveStarforce(gear, 1)}
						onclick={() => {
							removeStarforce(gear, 1, ignoreMaxStar);
						}}
					>
						<Minus />
					</InputGroup.Button>
				</InputGroup.Addon>
				<InputGroup.Input
					type="number"
					min={0}
					max={implicitMaxStar}
					disabled={gear.starScroll}
					bind:value={() => gear.star, (value) => setStarforce(gear, value, ignoreMaxStar)}
					class="text-center [&::-webkit-inner-spin-button]:appearance-none"
				/>
				<InputGroup.Addon align="inline-end">
					<InputGroup.Button
						size="icon-xs"
						disabled={gear.starScroll || !canAddStarforce(gear, 1, ignoreMaxStar)}
						onclick={() => addStarforce(gear, 1, ignoreMaxStar)}
					>
						<Plus />
					</InputGroup.Button>
				</InputGroup.Addon>
			</InputGroup.Root>
		</FormControl>
	</FormItem>
	<FormItem>
		<Slider
			type="single"
			class="mb-1"
			disabled={gear.starScroll}
			bind:value={() => gear.star, (value) => setStarforce(gear, value, ignoreMaxStar)}
			min={0}
			max={implicitMaxStar}
			step={1}
		/>
	</FormItem>
</FormSection>
<FormSection>
	<FormItem class="sm:flex-col sm:items-start">
		<FormLabel title="프리셋" disabled={gear.starScroll} />
		<FormControl>
			<!-- mobile: select -->
			<Select.Root
				type="single"
				value={String(gear.star)}
				onValueChange={(value) => setStarforce(gear, Number(value), ignoreMaxStar)}
			>
				<Select.Trigger class="w-full sm:hidden" disabled={gear.starScroll}>
					{gear.star}성
				</Select.Trigger>
				<Select.Content>
					{#each getPresets() as preset}
						<Select.Item value={String(preset)}>
							{preset}성
						</Select.Item>
					{/each}
				</Select.Content>
			</Select.Root>

			<!-- sm: buttons -->
			<Tabs.Root
				value={String(gear.star)}
				onValueChange={(value) => setStarforce(gear, Number(value), ignoreMaxStar)}
			>
				<Tabs.List class="hidden flex-row gap-1 sm:flex">
					{#each getPresets() as preset}
						<Tabs.Trigger
							class={buttonVariants({
								variant: preset === gear.star ? 'default' : 'ghost',
								size: 'sm'
							})}
							disabled={gear.starScroll}
							value={String(preset)}
						>
							{preset}성
						</Tabs.Trigger>
					{/each}
				</Tabs.List>
			</Tabs.Root>
		</FormControl>
	</FormItem>
</FormSection>
<FormSection>
	<FormItem>
		<FormLabel
			title="최대 강화 단계 초과"
			description={canIgnoreMaxStar
				? `설정하면 ${getImplicitMaxStar(gear, true)}성까지 강화할 수 있어요.`
				: `최대 강화 단계를 더 이상 늘릴 수 없어요.`}
			disabled={!canIgnoreMaxStar || gear.starScroll}
			for="ignoreMaxStar"
		/>
		<FormControl>
			<Switch
				bind:checked={ignoreMaxStar}
				id="ignoreMaxStar"
				disabled={!canIgnoreMaxStar || gear.starScroll}
			/>
		</FormControl>
	</FormItem>
</FormSection>
