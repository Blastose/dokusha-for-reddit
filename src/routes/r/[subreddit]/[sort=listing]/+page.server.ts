import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import reddit from '$lib/reddit';
import type Snoowrap from 'snoowrap';

export const load: PageServerLoad = async ({ params }) => {
	let posts = undefined;

	if (params.sort === 'new') {
		posts = await reddit.getSubreddit(`${params.subreddit}`).getNew();
	} else if (params.sort === 'rising') {
		posts = await reddit.getSubreddit(`${params.subreddit}`).getRising();
	} else if (params.sort === 'controversial') {
		posts = await reddit.getSubreddit(`${params.subreddit}`).getControversial();
	} else if (params.sort === 'top') {
		posts = await reddit.getSubreddit(`${params.subreddit}`).getTop();
	} else {
		throw error(404, 'Not found');
	}

	if (posts) {
		return {
			posts: JSON.parse(JSON.stringify(posts)) as Snoowrap.Submission[]
		};
	}

	throw error(404, 'Not found');
};
