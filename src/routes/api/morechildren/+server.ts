import type { RequestHandler } from './$types';
import { jsrwrap } from '$lib/server/reddit';
import type { Sort } from 'jsrwrap/types';
import { json } from '@sveltejs/kit';

export const POST = (async ({ request }) => {
	const { submissionId, children, sort } = (await request.json()) as {
		submissionId: string;
		children: string;
		sort: Sort;
	};

	const childrenData = await jsrwrap.getSubmission(submissionId).getMoreChildren({
		children: children.split(','),
		limit_children: false,
		sort: sort ?? 'confidence'
	});

	return json(childrenData);
}) satisfies RequestHandler;
