import type { LayoutServerLoad } from './$types';

export const load = (async (event) => {
	return {
		pathname: event.url.pathname
	};
}) satisfies LayoutServerLoad;