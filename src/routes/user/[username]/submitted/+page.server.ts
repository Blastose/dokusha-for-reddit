import type { PageServerLoad } from './$types';
import { jsrwrap } from '$lib/server/reddit';

export const load = (async ({ params }) => {
	const username = params.username;
	const jsrwrapUser = jsrwrap.getUser(username);

	let submitted = await jsrwrapUser.getSubmitted();
	submitted = submitted.map((v) => {
		return { ...v, type: 'post' };
	});

	return { submitted };
}) satisfies PageServerLoad;
