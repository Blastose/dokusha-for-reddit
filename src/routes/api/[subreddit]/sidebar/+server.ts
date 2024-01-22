import { jsrwrap } from '$lib/server/reddit';
import { json } from '@sveltejs/kit';

export const GET = async ({ params }) => {
	const subreddit = params.subreddit;

	const res = await jsrwrap.getSubreddit(subreddit).getSidebar();

	return json(res);
};
