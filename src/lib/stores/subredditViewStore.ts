import { writable } from 'svelte/store';

export const subredditViewStore = writable<'card' | 'classic'>('card');
