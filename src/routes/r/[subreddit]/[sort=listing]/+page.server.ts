import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { CLIENT_ID } from '$env/static/private';
import { CLIENT_SECRET } from '$env/static/private';
import snoowrap from 'snoowrap';
import type Snoowrap from 'snoowrap';

export const load: PageServerLoad = async ({ params }) => {
	const r = await snoowrap.fromApplicationOnlyAuth({
		userAgent: 'Cygnet',
		clientId: CLIENT_ID,
		clientSecret: CLIENT_SECRET,
		grantType: 'client_credentials'
	});

	let posts = undefined;

	if (params.sort === 'new') {
		posts = await r.getSubreddit(`${params.subreddit}`).getNew();
	} else if (params.sort === 'rising') {
		posts = await r.getSubreddit(`${params.subreddit}`).getRising();
	} else if (params.sort === 'controversial') {
		posts = await r.getSubreddit(`${params.subreddit}`).getControversial();
	} else if (params.sort === 'top') {
		posts = await r.getSubreddit(`${params.subreddit}`).getTop();
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
