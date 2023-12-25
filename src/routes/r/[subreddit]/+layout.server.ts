import type { LayoutServerLoad } from './$types';
import { jsrwrap } from '$lib/server/reddit';
import { redirect } from '@sveltejs/kit';

export const load = (async ({ params, url }) => {
	const subreddit = params.subreddit;
	const jsrWrapsubreddit = jsrwrap.getSubreddit(subreddit);

	const aboutPromise = jsrWrapsubreddit.getAbout();
	const sidebarPromise = jsrWrapsubreddit.getSidebar();

	const [about, sidebar] = await Promise.all([aboutPromise, sidebarPromise]);

	if (about.display_name !== subreddit) {
		const oldUrl = url.pathname + url.search;
		const newUrl = oldUrl.replace(/^(\/r\/)([A-Za-z0-9_-]*)(\/?.*)/, `$1${about.display_name}$3`);
		redirect(301, newUrl);
	}

	return { about, sidebar };
}) satisfies LayoutServerLoad;
