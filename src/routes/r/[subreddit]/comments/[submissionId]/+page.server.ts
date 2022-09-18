import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import reddit from '$lib/reddit';
import type Snoowrap from 'snoowrap';

export const load: PageServerLoad = async ({ params }) => {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const submission = await reddit.getSubmission(params.submissionId).expandReplies({
		limit: 1
	});

	if (submission) {
		return {
			submission: JSON.parse(JSON.stringify(submission)) as Snoowrap.Submission
		};
	}

	throw error(404, 'Not found');
};
