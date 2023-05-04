import type { PageServerLoad } from './$types';
import { jsrwrap } from '$lib/server/reddit';
import type { UserSortOptions, UserTOptions } from 'jsrwrap';

export const load = (async ({ params, url, isDataRequest }) => {
	const username = params.username;
	const jsrwrapUser = jsrwrap.getUser(username);
	const sort = url.searchParams.get('sort') as UserSortOptions | undefined;
	const t = url.searchParams.get('t') as UserTOptions | undefined;

	const options = { sort, t };

	const overview = jsrwrapUser.getOverview(options);

	return { streamed: { overview: isDataRequest ? overview : await overview } };
}) satisfies PageServerLoad;
