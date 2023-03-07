import type { PageServerLoad } from './$types';
import { jsrwrap } from '$lib/server/reddit';

export const load = (async ({ params, isDataRequest, setHeaders }) => {
	const submissionId = params.submissionId;

	const submission = jsrwrap.getSubmission(submissionId).fetch();

	setHeaders({ 'cache-control': 'public, max-age=60' });

	return {
		streamed: {
			submission: isDataRequest ? submission : await submission
		}
	};
}) satisfies PageServerLoad;
