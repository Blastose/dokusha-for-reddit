import type { PageServerLoad } from './$types';
import { jsrwrap } from '$lib/server/reddit';
import type { Sort } from 'jsrwrap/types';

export const load = (async ({ params, isDataRequest, url }) => {
	const submissionId = params.submissionId;
	const commentId = params.commentId;
	const sort = url.searchParams.get('sort') as Sort | undefined;

	let submission;
	if (sort) {
		submission = jsrwrap.getSubmission(submissionId).fetch({ sort, comment: commentId });
	} else {
		submission = jsrwrap.getSubmission(submissionId).fetch({ comment: commentId });
	}

	return {
		streamed: {
			submission: isDataRequest ? submission : await submission
		}
	};
}) satisfies PageServerLoad;
