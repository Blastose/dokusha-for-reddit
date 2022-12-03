import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import reddit from '$lib/reddit';
import type Snoowrap from 'snoowrap';
import type { Timespan } from 'snoowrap/dist/objects/Subreddit';

export const load: PageServerLoad = async ({ params, url, setHeaders }) => {
	const times = ['all', 'day', 'hour', 'month', 'week', 'year'];
	let time = url.searchParams.get('t');

	if (time === null) {
		time = 'day';
	}

	if (!times.includes(time)) {
		throw error(400, 'Invalid time parameter');
	}

	let posts = undefined;

	if (params.sort === 'new') {
		posts = await reddit.getSubreddit(`${params.subreddit}`).getNew();
	} else if (params.sort === 'rising') {
		posts = await reddit.getSubreddit(`${params.subreddit}`).getRising();
	} else if (params.sort === 'controversial') {
		posts = await reddit
			.getSubreddit(`${params.subreddit}`)
			.getControversial({ time: time as Timespan });
	} else if (params.sort === 'top') {
		posts = await reddit.getSubreddit(`${params.subreddit}`).getTop({ time: time as Timespan });
	} else {
		throw error(404, 'Not found');
	}

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
