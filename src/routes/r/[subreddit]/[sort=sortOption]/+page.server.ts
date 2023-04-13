import { jsrwrap } from '$lib/server/reddit';
import { error } from '@sveltejs/kit';

type Time = 'hour' | 'day' | 'week' | 'month' | 'year' | 'all';

export const load = async ({ params, setHeaders, url }) => {
	const subreddit = params.subreddit;
	const sort = params.sort as 'top' | 'new' | 'controversial' | 'rising';

	let t = url.searchParams.get('t') as Time | null;
	t = t ?? 'day';

	const jsrWrapsubreddit = jsrwrap.getSubreddit(subreddit);

	const about = await jsrWrapsubreddit.getAbout();

	const posts = await jsrWrapsubreddit.getSubmissions({ sort, params: { t } });

	if (!posts) throw error(500);

	setHeaders({ 'cache-control': 'public, max-age=60' });

	return { posts, about };
};
