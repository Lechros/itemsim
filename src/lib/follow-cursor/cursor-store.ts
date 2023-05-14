import { writable } from 'svelte/store';

export const cursor = writable({ x: 0, y: 0 });
export const boundary = writable({ width: 0, height: 0, top: 0, left: 0 });
export const viewport = writable({ width: 0, height: 0, top: 0, left: 0 });
