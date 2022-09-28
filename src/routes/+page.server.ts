import type { PageServerLoad } from './$types';
import reddit from '$lib/reddit';
import type Snoowrap from 'snoowrap';

export const load: PageServerLoad = async () => {
	const posts = await reddit.getHot();

	return {
		posts: JSON.parse(JSON.stringify(posts)) as Snoowrap.Submission[]
	};
};
