import type { PageServerLoad } from './$types';
import reddit from '$lib/reddit';
import type Snoowrap from 'snoowrap';

export const load: PageServerLoad = async ({ setHeaders }) => {
	const posts = await reddit.getHot();
	setHeaders({
		'cache-control': 'public, max-age=60'
	});
	return {
		posts: JSON.parse(JSON.stringify(posts)) as Snoowrap.Submission[]
	};
};
