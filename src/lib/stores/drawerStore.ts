import { writable } from 'svelte/store'; 

export const drawerStore = writable<boolean>(false);
