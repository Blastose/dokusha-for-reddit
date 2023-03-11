import type { Submission } from 'jsrwrap';

export type SubmissionReturnType = Awaited<ReturnType<Submission['fetch']>>;
