import type { PageServerLoad } from './$types';
import { jsrwrap } from '$lib/server/reddit';
import type { UserSortOptions, UserTOptions } from 'jsrwrap';

export const load = (async ({ params, url }) => {
	const username = params.username;
	const jsrwrapUser = jsrwrap.getUser(username);
	const sort = url.searchParams.get('sort') as UserSortOptions | undefined;
	const t = url.searchParams.get('t') as UserTOptions | undefined;

	const options = { sort, t };

	const overview = await jsrwrapUser.getOverview(options);

	return { overview };
}) satisfies PageServerLoad;
