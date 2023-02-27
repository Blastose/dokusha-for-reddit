import type { PageServerLoad } from './$types';
import { jsrwrap } from '$lib/server/reddit';

export const load = (async ({ params, setHeaders }) => {
	const subreddit = params.subreddit;

	const posts = await jsrwrap.getSubreddit(subreddit).getSubmissions({ sort: 'hot', params: {} });

	setHeaders({ 'cache-control': 'public, max-age=60' });

	return { posts: posts };
}) satisfies PageServerLoad;
