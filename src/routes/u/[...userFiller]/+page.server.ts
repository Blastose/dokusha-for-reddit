import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ url }) => {
	const newUrl = url.pathname.replace(/^\/u\//, '/user/');

	throw redirect(301, newUrl);
}) satisfies PageServerLoad;
