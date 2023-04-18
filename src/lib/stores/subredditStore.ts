import { writable, get } from 'svelte/store';
import type { SubmissionData } from 'jsrwrap/types';

type SubredditStore = Record<string, SubmissionData[] | undefined>;

function createSubredditStore() {
	const { subscribe, set, update } = writable<SubredditStore>({});

	const setSubredditPosts = (key: string, posts: SubmissionData[]) => {
		update((store) => {
			store[key] = posts;
			return store;
		});
	};

	const removeSubreddit = (key: string) => {
		update((store) => {
			delete store[key];
			return store;
		});
	};

	const clearAllSubreddits = () => {
		update(() => {
			return {};
		});
	};

	return {
		subscribe,
		set,
		update,
		setSubredditPosts,
		removeSubreddit,
		clearAllSubreddits
	};
}

export function getSubredditStore(store: ReturnType<typeof createSubredditStore>, key: string) {
	const subredditStore = get(store);
	return subredditStore[key];
}

export const subredditStore = createSubredditStore();
