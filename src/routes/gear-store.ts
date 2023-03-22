import type { Gear } from '@malib/gear';
import { writable } from 'svelte/store';

export const gear = writable(undefined as Gear | undefined);
