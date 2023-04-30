import type { PageServerLoad } from './$types';
import { jsrwrap } from '$lib/server/reddit';
import type { Sort } from 'jsrwrap/types';

export const load = (async ({ params, isDataRequest, url }) => {
	const submissionId = params.submissionId;
	const commentId = params.commentId;
	const sort = url.searchParams.get('sort') as Sort | undefined;

	const context = Number(url.searchParams.get('context')) as number | undefined;
	const depth = Number(url.searchParams.get('depth')) as number | undefined;

	const options = {
		context,
		depth,
		comment: commentId
	};

	let submission;
	if (sort) {
		submission = jsrwrap.getSubmission(submissionId).fetch({ sort, ...options });
	} else {
		submission = jsrwrap.getSubmission(submissionId).fetch({ ...options });
	}

	return {
		streamed: {
			submission: isDataRequest ? submission : await submission
		}
	};
}) satisfies PageServerLoad;
