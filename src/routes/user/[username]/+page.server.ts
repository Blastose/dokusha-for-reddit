import type { PageServerLoad } from './$types';
import { jsrwrap } from '$lib/server/reddit';
import type { UserSortOptions, UserTOptions } from 'jsrwrap';

export const load = (async ({ params, url, isDataRequest, setHeaders }) => {
	const username = params.username;
	const jsrwrapUser = jsrwrap.getUser(username);
	const sort = url.searchParams.get('sort') as UserSortOptions | undefined;
	const t = url.searchParams.get('t') as UserTOptions | undefined;
	const before = url.searchParams.get('before') as string | undefined;
	const after = url.searchParams.get('after') as string | undefined;

	const options = { sort, t, before, after };

	const overview = jsrwrapUser.getOverview(options);

	setHeaders({
		'cache-control': 'max-age=120'
	});
	return { streamed: { overview: isDataRequest ? overview : await overview } };
}) satisfies PageServerLoad;
