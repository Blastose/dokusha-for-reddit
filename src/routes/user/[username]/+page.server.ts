import type { PageServerLoad } from './$types';
import { jsrwrap } from '$lib/server/reddit';

export const load = (async ({ params }) => {
	const username = params.username;
	const jsrwrapUser = jsrwrap.getUser(username);

	const overview = await jsrwrapUser.getOverview();

	return { overview };
}) satisfies PageServerLoad;
