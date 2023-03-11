import { writable } from 'svelte/store';
import type { SubmissionData } from 'jsrwrap';

export const submissionStore = writable<SubmissionData | null>(null);
