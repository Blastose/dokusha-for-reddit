import type { PageServerLoad } from './$types';
import { jsrwrap } from '$lib/server/reddit';

export const load = (async ({ params, setHeaders }) => {
	const subreddit = params.subreddit;

	const jsrWrapsubreddit = jsrwrap.getSubreddit(subreddit);

	const about = await jsrWrapsubreddit.getAbout();
	const posts = await jsrWrapsubreddit.getSubmissions({ sort: 'hot', params: {} });

	setHeaders({ 'cache-control': 'public, max-age=60' });

	return { posts, about };
}) satisfies PageServerLoad;
