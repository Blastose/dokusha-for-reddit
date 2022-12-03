import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type Snoowrap from 'snoowrap';
import reddit from '$lib/reddit';

export const load: PageServerLoad = async ({ params, setHeaders }) => {
	const posts = await reddit.getSubreddit(`${params.subreddit}`).getHot();

	if (posts) {
		setHeaders({
			'cache-control': 'public, max-age=60'
		});
		return {
			posts: JSON.parse(JSON.stringify(posts)) as Snoowrap.Submission[]
		};
	}

	throw error(404, 'Not found');
};
