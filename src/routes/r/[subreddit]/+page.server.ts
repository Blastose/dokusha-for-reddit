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

	const posts = await r.getSubreddit(`${params.subreddit}`).getHot();

	if (posts) {
		console.log(JSON.parse(JSON.stringify(posts[0])));
		return {
			posts: JSON.parse(JSON.stringify(posts)) as Snoowrap.Submission[]
		};
	}

	throw error(404, 'Not found');
};
