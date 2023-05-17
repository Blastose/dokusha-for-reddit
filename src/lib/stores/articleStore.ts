import { writable } from 'svelte/store';
import type { SubmissionReturnType } from '$lib/types/types';

export const articleStore = writable<{
	url: string;
	article: SubmissionReturnType;
	loadFromStore: boolean;
} | null>(null);
