import type { PageServerLoad } from './$types';
import { jsrwrap } from '$lib/server/reddit';

export const load = (async ({ params }) => {
	const username = params.username;
	const jsrwrapUser = jsrwrap.getUser(username);

	let comments = await jsrwrapUser.getComments();
	comments = comments.map((v) => {
		return { ...v, type: 'comment' };
	});

	return { comments };
}) satisfies PageServerLoad;
