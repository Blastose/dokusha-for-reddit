import { persisted } from 'svelte-local-storage-store';

type CommentStoreRecord = Record<string, number>;

export const commentCountStore = persisted<CommentStoreRecord>('commentCounts', {});
