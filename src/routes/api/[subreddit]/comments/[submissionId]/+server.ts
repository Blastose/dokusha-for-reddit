import { jsrwrap } from '$lib/server/reddit';
import { json } from '@sveltejs/kit';
import type { Sort } from 'jsrwrap/types';
import type { SubmissionReturnType } from '$lib/types/types';

export const GET = async ({ url, params }) => {
	const submissionId = params.submissionId;
	const sort = url.searchParams.get('sort') as Sort | undefined;

	let submission: SubmissionReturnType;
	if (sort) {
		submission = await jsrwrap.getSubmission(submissionId).fetch({ sort });
	} else {
		submission = await jsrwrap.getSubmission(submissionId).fetch();
	}

	return json(submission);
};
