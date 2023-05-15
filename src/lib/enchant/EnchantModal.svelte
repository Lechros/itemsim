<script lang="ts">
	import GearTooltip from '$lib/gear-tooltip/GearTooltip.svelte';
	import type { Gear } from '@malib/gear';
	import {
		ComposedModal,
		ModalBody,
		ModalFooter,
		ModalHeader,
		Tab,
		TabContent,
		Tabs
	} from 'carbon-components-svelte';
	import type { GearMeta } from '../inventory/stores/gear-store';
	import BonusStat from './components/BonusStat.svelte';
	import Enhance from './components/Enhance.svelte';
	import Manage from './components/Manage.svelte';
	import Potentials from './components/Potentials.svelte';
	import SoulEnchant from './components/SoulEnchant.svelte';
	import Upgrade from './components/Upgrade.svelte';

	export let gear: Gear | undefined;
	export let meta: GearMeta | undefined;
	export let deselectGear: () => void;
	export let removeGear: () => void;
	export let resetMeta: () => void;

	export const DELAY = 240;

	// used to persist ui while modal disappears
	let gearCache: Gear | undefined;
	$: {
		if (gear) {
			gearCache = gear;
		}
	}

	function onClose() {
		deselectGear();
		setTimeout(() => {
			gearCache = undefined;
		}, DELAY);
	}

	function onDelete() {
		removeGear();
		setTimeout(() => {
			gearCache = undefined;
		}, DELAY);
	}

	let enchantTooltip: HTMLDivElement;
</script>

<ComposedModal open={gear !== undefined} selectorPrimaryFocus="ul" on:close={onClose}>
	<ModalHeader title="아이템 강화" />
	<ModalBody hasForm hasScrollingContent tabindex={-1}>
		{#if gearCache && gearCache.itemID > 0}
			<div class="enchant">
				<div class="enchant__tooltip">
					<GearTooltip gear={gearCache} bind:ref={enchantTooltip} />
				</div>
				<div>
					<Tabs autoWidth>
						<Tab tabindex="0">추가옵션</Tab>
						<Tab tabindex="0">주문서</Tab>
						<Tab tabindex="0">강화</Tab>
						<Tab tabindex="0">잠재옵션</Tab>
						<Tab tabindex="0">소울</Tab>
						<Tab tabindex="0">관리</Tab>
						<svelte:fragment slot="content">
							<TabContent>
								<BonusStat bind:gear={gearCache} bind:meta bind:resetMeta />
							</TabContent>
							<TabContent>
								<Upgrade bind:gear={gearCache} />
							</TabContent>
							<TabContent>
								<Enhance bind:gear={gearCache} />
							</TabContent>
							<TabContent>
								<Potentials bind:gear={gearCache} />
							</TabContent>
							<TabContent>
								<SoulEnchant bind:gear={gearCache} />
							</TabContent>
							<TabContent>
								<Manage bind:gear={gearCache} bind:meta on:delete={onDelete} />
							</TabContent>
						</svelte:fragment>
					</Tabs>
				</div>
			</div>
		{/if}
	</ModalBody>
	<ModalFooter />
</ComposedModal>

<style>
	.enchant {
		display: grid;
		grid-template-columns: 261px 1fr;
		gap: var(--cds-spacing-05);
	}

	@media (max-width: 50rem) {
		.enchant {
			display: flex;
			flex-direction: column;
		}

		.enchant > .enchant__tooltip {
			align-self: center;
		}
	}
</style>
