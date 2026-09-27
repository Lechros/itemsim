<script lang="ts">
	import * as Alert from '$lib/components/ui/alert';
	import * as InputGroup from '$lib/components/ui/input-group';
	import { Slider } from '$lib/components/ui/slider';
	import { Gear, PotentialGrade, type PotentialData } from '@malib/gear';
	import GearPotentialUiBase from '../../potential/components/GearPotentialUIBase.svelte';
	import { getGradeSoulPotentialDatas } from '../../potential/model/potential';
	import { CircleAlert, Minus, Plus } from 'lucide-svelte';
	import FormControl from '../../../form/FormControl.svelte';
	import FormItem from '../../../form/FormItem.svelte';
	import FormLabel from '../../../form/FormLabel.svelte';
	import FormSection from '../../../form/FormSection.svelte';
	import { setSoulAmplification } from '../model/soul-amplification';

	let { gear, currentTab = $bindable() }: { gear: Gear; currentTab: string } = $props();
</script>

{#if !gear.supportsSoulAmplification}
	<FormSection class="border-b-0 px-5 pb-0">
		<FormItem>
			<Alert.Root>
				<CircleAlert />
				{#if gear.req.level < 200}
					<Alert.Title>소울 증폭이 불가능한 아이템이에요.</Alert.Title>
					<Alert.Description>
						<p>요구 레벨 200 이상인 무기만 소울을 증폭할 수 있어요.</p>
					</Alert.Description>
				{:else if !gear.soulEnchanted && gear.data.soulWeapon?.soul?.magnificent}
					<Alert.Title>소울 증폭이 불가능한 상태에요.</Alert.Title>
					<Alert.Description>
						<p>
							소울을 증폭하려면 <button
								class="text-foreground hover:text-accent-foreground cursor-pointer underline underline-offset-4 transition-colors"
								onclick={() => (currentTab = 'soulEnchant')}
							>
								소울 부여
							</button> 탭에서 소울 인챈트를 진행해주세요.
						</p>
					</Alert.Description>
				{:else}
					<Alert.Title>소울 증폭이 불가능한 상태에요.</Alert.Title>
					<Alert.Description>
						<p>
							소울을 증폭하려면 <button
								class="text-foreground hover:text-accent-foreground cursor-pointer underline underline-offset-4 transition-colors"
								onclick={() => (currentTab = 'soulEnchant')}
							>
								소울 부여
							</button> 탭에서 위대한 소울을 부여해주세요.
						</p>
					</Alert.Description>
				{/if}
			</Alert.Root>
		</FormItem>
	</FormSection>
{/if}

<FormSection class="gap-6">
	<FormItem>
		<FormLabel title="소울 증폭 단계 설정" disabled={!gear.supportsSoulAmplification} />
		<FormControl>
			<InputGroup.Root class="sm:w-28">
				<InputGroup.Addon align="inline-start">
					<InputGroup.Button
						size="icon-xs"
						aria-label="소울 증폭 단계 감소"
						disabled={!gear.soulAmplificationActive}
						onclick={() => setSoulAmplification(gear, gear.soulAmplificationLevel - 1)}
					>
						<Minus />
					</InputGroup.Button>
				</InputGroup.Addon>
				<InputGroup.Input
					type="number"
					min={0}
					max={4}
					step={1}
					aria-label="소울 증폭 단계"
					disabled={!gear.supportsSoulAmplification}
					bind:value={
						() => gear.soulAmplificationLevel, (value) => setSoulAmplification(gear, value)
					}
					class="text-center [&::-webkit-inner-spin-button]:appearance-none"
				/>
				<InputGroup.Addon align="inline-end">
					<InputGroup.Button
						size="icon-xs"
						aria-label="소울 증폭 단계 증가"
						disabled={!gear.canApplySoulAmplification}
						onclick={() => setSoulAmplification(gear, gear.soulAmplificationLevel + 1)}
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
			aria-label="소울 증폭 단계"
			disabled={!gear.supportsSoulAmplification}
			bind:value={() => gear.soulAmplificationLevel, (value) => setSoulAmplification(gear, value)}
			min={0}
			max={4}
			step={1}
		/>
	</FormItem>
</FormSection>

{#key `${gear.soulAmplificationLevel}:${gear.soulAmplificationActive}`}
	<GearPotentialUiBase
		initialGrade={gear.soulPotentialGrade || PotentialGrade.Rare}
		initialPotentials={gear.soulPotentials as PotentialData[]}
		getGradePotentials={(grade) => getGradeSoulPotentialDatas(gear, grade)}
		minimumGrade={PotentialGrade.Rare}
		gradeLabel="소울 잠재능력 등급"
		optionLabel="소울 잠재능력 옵션"
		disabled={!gear.soulAmplificationActive}
		allowEmpty={false}
		onChange={(grade, potentials) => {
			if (gear.soulAmplificationActive && potentials.length === 3) {
				gear.setSoulPotential(grade, potentials);
			}
		}}
	/>
{/key}
