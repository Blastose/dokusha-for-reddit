import type { PageServerLoad } from './$types';
import { jsrwrap } from '$lib/server/reddit';
import type { UserSortOptions, UserTOptions } from 'jsrwrap';
import type { SubmissionData, Comment } from 'jsrwrap/types';

export const load = (async ({ params, url }) => {
	const username = params.username;
	const where = params.userWhere;
	const jsrwrapUser = jsrwrap.getUser(username);
	const sort = url.searchParams.get('sort') as UserSortOptions | undefined;
	const t = url.searchParams.get('t') as UserTOptions | undefined;

	const options = { sort, t };

	let creations;
	if (where === 'comments') {
		creations = await jsrwrapUser.getComments(options);
		creations = creations.map((v) => {
			return { ...v, type: 'comment' };
		});
	} else if (where === 'submitted') {
		creations = await jsrwrapUser.getSubmitted(options);
		creations = creations.map((v) => {
			return { ...v, type: 'post' };
		});
	} else if (where === 'gilded') {
		creations = await jsrwrapUser.getGilded();
	} else {
		creations = await jsrwrapUser.getOverview(options);
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
