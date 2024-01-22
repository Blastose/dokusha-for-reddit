import { jsrwrap } from '$lib/server/reddit';
import { json } from '@sveltejs/kit';

export const GET = async ({ params }) => {
	const subreddit = params.subreddit;

	const res = await jsrwrap.getSubreddit(subreddit).getSidebar();

	return json(res, {
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Credentials': 'true',
			'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
			'Access-Control-Allow-Headers':
				'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
		}
	});
};
