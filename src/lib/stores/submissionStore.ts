import { writable } from 'svelte/store';
import type { SubmissionData } from 'jsrwrap/types';

export const submissionStore = writable<SubmissionData | null>(null);
