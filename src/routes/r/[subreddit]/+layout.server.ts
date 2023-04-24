import type { LayoutServerLoad } from './$types';
import { jsrwrap } from '$lib/server/reddit';

export const load = (async ({ params }) => {
	const subreddit = params.subreddit;
	const jsrWrapsubreddit = jsrwrap.getSubreddit(subreddit);

	const about = await jsrWrapsubreddit.getAbout();

	return { about };
}) satisfies LayoutServerLoad;
