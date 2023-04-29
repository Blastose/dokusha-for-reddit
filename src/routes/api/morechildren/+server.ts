import type { RequestHandler } from './$types';
import { jsrwrap } from '$lib/server/reddit';
import type { Sort } from 'jsrwrap/types';
import { json } from '@sveltejs/kit';

// TODO change to post since too many children in header can cause 431 error
export const GET = (async ({ url }) => {
	const submissionId = String(url.searchParams.get('submissionId'));
	const children = String(url.searchParams.get('children'));
	const sort = url.searchParams.get('sort') as Sort | null;

	const childrenData = await jsrwrap.getSubmission(submissionId).getMoreChildren({
		children: children.split(','),
		limit_children: false,
		sort: sort ?? 'confidence'
	});

	return json(childrenData);
}) satisfies RequestHandler;
