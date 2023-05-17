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
	import Exceptional from './components/Exceptional.svelte';

	export let gear: Gear | undefined;
	export let meta: GearMeta | undefined;
	export let deselectGear: () => void;
	export let removeGear: () => void;
	export let resetMeta: () => void;

	export const DELAY = 240;

	let tabs = ['관리', '추가옵션', '주문서', '강화', '잠재옵션', '익셉셔널', '소울'];
	let cans = tabs.map(() => true);

	// used to persist ui while modal disappears
	let gearCache: Gear | undefined;
	$: {
		if (gear) {
			gearCache = gear;
		}
	}
	let metaCache: GearMeta | undefined;
	$: {
		if (meta) {
			metaCache = meta;
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
						{#each tabs as name, i}
							<div class:tab__item--hidden={!cans[i]}>
								<Tab tabindex="0">{name}</Tab>
							</div>
						{/each}
						<svelte:fragment slot="content">
						<TabContent>
							<Manage bind:gear={gearCache} bind:meta={metaCache} on:delete={onDelete} />
						</TabContent>
							<TabContent>
								<BonusStat
									bind:can={cans[1]}
									bind:gear={gearCache}
									bind:meta={metaCache}
									bind:resetMeta
								/>
							</TabContent>
							<TabContent>
								<Upgrade bind:can={cans[2]} bind:gear={gearCache} />
							</TabContent>
							<TabContent>
								<Enhance bind:can={cans[3]} bind:gear={gearCache} />
							</TabContent>
							<TabContent>
								<Potentials bind:can={cans[4]} bind:gear={gearCache} />
							</TabContent>
							<TabContent>
								<Exceptional bind:can={cans[5]} bind:gear={gearCache} />
							</TabContent>
							<TabContent>
								<SoulEnchant bind:can={cans[6]} bind:gear={gearCache} />
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

	.tab__item--hidden {
		display: none;
	}
</style>
