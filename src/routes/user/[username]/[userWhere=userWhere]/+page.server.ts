import type { PageServerLoad } from './$types';
import { jsrwrap } from '$lib/server/reddit';
import type { UserSortOptions, UserTOptions } from 'jsrwrap';
import type { SubmissionData, Comment } from 'jsrwrap/types';

export const load = (async ({ params, url, isDataRequest }) => {
	const username = params.username;
	const where = params.userWhere;
	const jsrwrapUser = jsrwrap.getUser(username);
	const sort = url.searchParams.get('sort') as UserSortOptions | undefined;
	const t = url.searchParams.get('t') as UserTOptions | undefined;

	const options = { sort, t };

	let creations;
	if (where === 'comments') {
		creations = jsrwrapUser.getComments(options);
	} else if (where === 'submitted') {
		creations = jsrwrapUser.getSubmitted(options);
	} else if (where === 'gilded') {
		creations = jsrwrapUser.getGilded();
	} else {
		creations = jsrwrapUser.getOverview(options);
	}

	creations = creations as Promise<
		(
			| (SubmissionData & {
					type: 'post';
			  })
			| (Comment & {
					type: 'comment';
			  })
		)[]
	>;

	return { streamed: { creations: isDataRequest ? creations : await creations } };
}) satisfies PageServerLoad;
