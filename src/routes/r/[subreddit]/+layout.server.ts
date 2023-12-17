import type { LayoutServerLoad } from './$types';
import { jsrwrap } from '$lib/server/reddit';

export const load = (async ({ params }) => {
	const subreddit = params.subreddit;
	const jsrWrapsubreddit = jsrwrap.getSubreddit(subreddit);

	const aboutPromise = jsrWrapsubreddit.getAbout();
	const sidebarPromise = jsrWrapsubreddit.getSidebar();

	const [about, sidebar] = await Promise.all([aboutPromise, sidebarPromise]);
	console.log(sidebar);
	return { about, sidebar };
}) satisfies LayoutServerLoad;
