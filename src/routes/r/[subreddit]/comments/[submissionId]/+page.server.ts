import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import reddit from '$lib/reddit';
import type Snoowrap from 'snoowrap';

export const load: PageServerLoad = async ({ params, setHeaders }) => {
	// Type error from snoowrap
	// See https://github.com/not-an-aardvark/snoowrap/issues/221
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const submission = await reddit.getSubmission(params.submissionId).expandReplies({
		limit: 1
	});

	if (submission) {
		setHeaders({
			'cache-control': 'public, max-age=60'
		});
		return {
			submission: JSON.parse(JSON.stringify(submission)) as Snoowrap.Submission
		};
	}

	throw error(404, 'Not found');
};
