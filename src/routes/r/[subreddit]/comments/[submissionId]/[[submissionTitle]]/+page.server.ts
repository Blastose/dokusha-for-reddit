import type { PageServerLoad } from './$types';
import { jsrwrap } from '$lib/server/reddit';

export const load = (async ({ params, isDataRequest }) => {
	const submissionId = params.submissionId;

	const submission = jsrwrap.getSubmission(submissionId).fetch();

	return {
		streamed: {
			submission: isDataRequest ? submission : await submission
		}
	};
}) satisfies PageServerLoad;
