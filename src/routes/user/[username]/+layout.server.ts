import type { LayoutServerLoad } from './$types';
import { jsrwrap } from '$lib/server/reddit';

export const load = (async ({ params }) => {
	const username = params.username;
	const jsrwrapUser = jsrwrap.getUser(username);

	const about = await jsrwrapUser.getAbout();

	return { about };
}) satisfies LayoutServerLoad;
