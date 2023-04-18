import { jsrwrap } from '$lib/server/reddit';
import { json } from '@sveltejs/kit';

// TODO export theses from jsrwrap
type SubredditSort = 'top' | 'new' | 'controversial' | 'hot' | 'best' | 'rising';
type Time = 'hour' | 'day' | 'week' | 'month' | 'year' | 'all';

export const GET = async ({ url, params }) => {
	const subreddit = params.subreddit;
	const sort = String(url.searchParams.get('sort')) as SubredditSort;
	const before = String(url.searchParams.get('before'));
	const after = String(url.searchParams.get('after'));
	const t = String(url.searchParams.get('t')) as Time;
	const count = Number(url.searchParams.get('count')) || undefined;

	const jsrWrapsubreddit = jsrwrap.getSubreddit(subreddit);
	const data = await jsrWrapsubreddit.getSubmissions({
		sort,
		params: {
			after,
			before,
			t,
			count
		}
	});

	return json(data);
};
