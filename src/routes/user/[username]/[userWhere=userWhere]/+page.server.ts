import type { PageServerLoad } from './$types';
import { jsrwrap } from '$lib/server/reddit';
import type { SubmissionData, Comment } from 'jsrwrap/types';

export const load = (async ({ params }) => {
	const username = params.username;
	const where = params.userWhere;
	const jsrwrapUser = jsrwrap.getUser(username);

	let creations;
	if (where === 'comments') {
		creations = await jsrwrapUser.getComments();
		creations = creations.map((v) => {
			return { ...v, type: 'comment' };
		});
	} else if (where === 'submitted') {
		creations = await jsrwrapUser.getSubmitted();
		creations = creations.map((v) => {
			return { ...v, type: 'post' };
		});
	} else if (where === 'gilded') {
		creations = await jsrwrapUser.getGilded();
	} else {
		creations = await jsrwrapUser.getOverview();
	}

	creations = creations as (
		| (SubmissionData & {
				type: 'post';
		  })
		| (Comment & {
				type: 'comment';
		  })
	)[];
	return { creations };
}) satisfies PageServerLoad;
