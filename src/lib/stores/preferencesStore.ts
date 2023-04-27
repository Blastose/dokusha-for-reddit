import { persisted } from 'svelte-local-storage-store';

export const preferencesStore = persisted<{
	savedSubreddits: { subreddit: string; displayedName: string }[];
}>('preferences', { savedSubreddits: [] });
