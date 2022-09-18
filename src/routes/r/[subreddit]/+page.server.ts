import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type Snoowrap from 'snoowrap';
import reddit from '$lib/reddit';

export const load: PageServerLoad = async ({ params }) => {
	const posts = await reddit.getSubreddit(`${params.subreddit}`).getHot();

	if (posts) {
		return {
			posts: JSON.parse(JSON.stringify(posts)) as Snoowrap.Submission[]
		};
	}

	throw error(404, 'Not found');
};
