import type { LayoutServerLoad } from './$types';
import { jsrwrap } from '$lib/server/reddit';
import type { Sort } from 'jsrwrap/types';

export const load = (async ({ params, isDataRequest, url }) => {
	const submissionId = params.submissionId;
	const sort = url.searchParams.get('sort') as Sort | undefined;

	let submission;
	if (sort) {
		submission = jsrwrap.getSubmission(submissionId).fetch({ sort });
	} else {
		submission = jsrwrap.getSubmission(submissionId).fetch();
	}

	return {
		streamed: {
			submission: isDataRequest ? submission : await submission
		},
		isDataRequestSubmissionId: isDataRequest
	};
}) satisfies LayoutServerLoad;
