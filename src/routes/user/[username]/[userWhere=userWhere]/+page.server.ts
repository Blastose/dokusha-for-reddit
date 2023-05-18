import type { PageServerLoad } from './$types';
import { jsrwrap } from '$lib/server/reddit';
import type { UserSortOptions, UserTOptions } from 'jsrwrap';
import type { SubmissionData, Comment } from 'jsrwrap/types';

export const load = (async ({ params, url, isDataRequest, setHeaders }) => {
	const username = params.username;
	const where = params.userWhere;
	const jsrwrapUser = jsrwrap.getUser(username);
	const sort = url.searchParams.get('sort') as UserSortOptions | undefined;
	const t = url.searchParams.get('t') as UserTOptions | undefined;
	const before = url.searchParams.get('before') as string | undefined;
	const after = url.searchParams.get('after') as string | undefined;

	const options = { sort, t, before, after };

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

	setHeaders({
		'cache-control': 'max-age=120'
	});

	return { streamed: { creations: isDataRequest ? creations : await creations } };
}) satisfies PageServerLoad;
