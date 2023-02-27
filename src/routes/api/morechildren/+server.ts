import type { RequestHandler } from './$types';
import { jsrwrap } from '$lib/server/reddit';
import { json } from '@sveltejs/kit';

export const GET = (async ({ url }) => {
	const subredditId = String(url.searchParams.get('subredditId'));
	const children = String(url.searchParams.get('children'));

	const childrenData = await jsrwrap.getSubmission(subredditId).getMoreChildren({
		children: children.split(','),
		limit_children: false,
		sort: 'confidence'
	});

	return json(childrenData);
}) satisfies RequestHandler;
