import type { PageServerLoad } from './$types';
import { jsrwrap } from '$lib/server/reddit';
import type { SubmissionData, SubredditData } from 'jsrwrap/types';

export const load = (async ({ cookies, params, setHeaders }) => {
	// TODO move this into its own function since the logic is shared
	// by /r/[subredit]/[sort] routes
	// or maybe move it this and the [sort] routes into a layout group

	const subreddit = params.subreddit;

	const jsrWrapsubreddit = jsrwrap.getSubreddit(subreddit);

	const about = await jsrWrapsubreddit.getAbout();

	setHeaders({ 'cache-control': 'public, max-age=60' });

	if (cookies.get('name') === 'skip') {
		cookies.set('name', '', {
			path: '/',
			expires: new Date('Thu, 01 Jan 1970 00:00:00 GMT;'),
			httpOnly: false,
			sameSite: 'none'
		});
		return { posts: [], about } as unknown as { posts: SubmissionData[]; about: SubredditData };
	}

	const posts = await jsrWrapsubreddit.getSubmissions({ sort: 'hot', params: {} });
	return { posts, about };
}) satisfies PageServerLoad;
