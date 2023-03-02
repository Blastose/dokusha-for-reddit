import type { RequestHandler } from './$types';
import { jsrwrap } from '$lib/server/reddit';
import { json } from '@sveltejs/kit';

export const GET = (async ({ url }) => {
	const submissionId = String(url.searchParams.get('submissionId'));
	const children = String(url.searchParams.get('children'));

	const childrenData = await jsrwrap.getSubmission(submissionId).getMoreChildren({
		children: children.split(','),
		limit_children: false,
		sort: 'confidence'
	});

	return json(childrenData);
}) satisfies RequestHandler;
