import { readable } from 'svelte/store';
import { browser } from '$app/environment';

function createNowStore() {
	if (!browser) return null;

	const startingTime = new Date();

	return readable(startingTime, (set) => {
		const minuteInMs = 60000;

		const interval = setInterval(() => {
			set(new Date());
		}, minuteInMs);

		return () => {
			clearInterval(interval);
		};
	});
}

export const nowStore = createNowStore();
